import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoute = () => {
    const {currentUser} = useSelector((state)=>state.employee)
    return (
        currentUser && currentUser.role==="Admin" ? <Outlet /> : <Navigate to="/dashboard" />
    );
};

export default AdminRoute;