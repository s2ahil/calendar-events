import React from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  FilterIcon, 
  CheckCircleIcon 
} from 'lucide-react';

function Home() {
  const session = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
     
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
            Calendar Events  <span className="text-blue-600">Sync</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your scheduling with seamless Google Calendar integration. 
            Manage, filter, and organize your events effortlessly.
          </p>
        </div>

     
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <CalendarIcon className="w-12 h-12 text-blue-600" />,
              title: "View Events",
              description: "Instantly see all your upcoming events from Google Calendar."
            },
            {
              icon: <FilterIcon className="w-12 h-12 text-green-600" />,
              title: "Date Filtering",
              description: "Easily filter and find events on specific dates."
            },
            {
              icon: <CheckCircleIcon className="w-12 h-12 text-purple-600" />,
              title: "Seamless Integration",
              description: "Direct connection with your Google Calendar account."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

   
        {!session ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Get Started
            </h2>
            <p className="text-gray-600 mb-6">
              Connect your Google Account to unlock powerful calendar management.
            </p>
      
            <div className="mt-6 text-sm text-gray-500">
              Sync, manage, and organize your events with ease
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-md">
              <div className="flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-green-800">
                    Successfully Signed In
                  </h3>
                  <p className="text-green-700">
                    Welcome, {session.user.email}! You can now access your dashboard.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/dashboard" 
                  className="w-full block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;