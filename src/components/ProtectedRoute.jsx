import React from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  
  const session = useSession();

  if (!session) {
  
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute