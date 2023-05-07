import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../Auth';

const PrivateRoute = () => {
    
    let loggedIn = isLoggedIn();
    if (loggedIn) return <Outlet />
    else return <Navigate to={"/login"} />
}

export default PrivateRoute