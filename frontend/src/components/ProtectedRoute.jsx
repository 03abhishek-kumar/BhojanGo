import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profileData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#F4521E]/30 border-t-[#F4521E] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && profileData && !allowedRoles.includes(profileData.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
