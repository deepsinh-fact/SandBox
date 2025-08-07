import React from 'react';
import { Navigate } from 'react-router-dom';
import Service from '../Service/Service';

const ProtectedRoute = ({ children }) => {
    const token = Service.getAuthToken();
    const userData = Service.getUserdata();
    
    // Check if user is authenticated
    if (!token || !userData) {
        return <Navigate to="/auth/sign-in" replace />;
    }
    
    return children;
};

export default ProtectedRoute;