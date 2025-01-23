import React, { useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      fetchCalendarEvents();
    }
  }, [session]);

  async function fetchCalendarEvents() {
    if (!session || !session.provider_token) {
      setError('No active session. Please sign in again.');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const token = session.provider_token;
      const now = new Date();
      const twoYearsFromNow = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate());
  
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?' + 
        new URLSearchParams({
          timeMin: now.toISOString(),
          timeMax: twoYearsFromNow.toISOString(),
          maxResults: 500,
          singleEvents: true,
          orderBy: 'startTime'
        }),
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      const processedEvents = data.items
        .filter(event => event.start && event.start.dateTime)
        .sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));
  
      setEvents(processedEvents);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      setError('Could not retrieve calendar events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const filteredEvents = events.filter(event => {
    if (!filterDate) return true;
    
    const eventDate = new Date(event.start.dateTime).toLocaleDateString();
    const filterDateString = new Date(filterDate).toLocaleDateString();
    
    return eventDate === filterDateString;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Calendar Events</h1>

    
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Filter Events by Date
        </label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>


      {isLoading && (
        <div className="text-center text-gray-500">
          Loading events...
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

 
      {!isLoading && !error && (
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Event</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border p-2">{event.summary || 'Untitled Event'}</td>
                  <td className="border p-2">
                    {new Date(event.start.dateTime).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(event.start.dateTime).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;