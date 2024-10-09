// src/router/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Import Zustand store

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Zustand authentication state

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
