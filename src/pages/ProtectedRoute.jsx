import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('recruiterLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/recruiter/login" />;
}
