import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import './App.css'
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ProtectedRoute from './Components/ProtectedRoute';
import Profile from './Pages/Profile';
import Employees from './Pages/Employees';
import AdminRoute from './Components/AdminRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin  />} />
        <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
        <Route path='/employees' element={<Employees />} />
        </Route>
        <Route path='/profile' element={<Profile />} />
        <Route path='/forgotpw' element={<ForgotPassword />} />
        <Route path='/resetpw/:id/:token' element={<ResetPassword />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;