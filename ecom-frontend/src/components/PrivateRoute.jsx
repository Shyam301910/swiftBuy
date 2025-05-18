import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false }) => {
    const { user } = useSelector((state) => state.auth);

    // if user is authenticated and page is public, then redirect to products 
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }
    // if user is not authenticated and page is not public, then redirect to login page
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute