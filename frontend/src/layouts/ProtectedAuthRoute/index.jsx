import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

const ProtectedAuthRoute = () => {
    return isAuthenticated() ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default ProtectedAuthRoute;
