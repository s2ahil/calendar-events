import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { 
  Home, 
  LayoutDashboard, 
  LogOut, 
  LogIn, 
  Menu, 
  X 
} from 'lucide-react';


function Navbar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  async function googleSignIn() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          scopes: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events' ,
          redirectTo: 'https://calendar-events-ten.vercel.app',
        },
      });
      
      if (error) throw error;
 
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Error logging in: ' + error.message);
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Error signing out: ' + error.message);
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
 
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          <span className="text-blue-600">Calendar</span>Sync
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-600 flex items-center space-x-1 transition-colors"
          >
            <Home className="w-5 h-5 mr-1" />
            Home
          </Link>

          {session && (
            <Link 
              to="/dashboard" 
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-1" />
              Dashboard
            </Link>
          )}

          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">
                {session.user.email}
              </span>
              <button 
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center space-x-2 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={googleSignIn}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-blue-600 py-2 flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {session && (
              <Link 
                to="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 py-2 flex items-center space-x-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            )}

            {session ? (
              <div className="space-y-2">
                <div className="text-gray-500 text-sm py-2">
                  {session.user.email}
                </div>
                <button 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  googleSignIn();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
