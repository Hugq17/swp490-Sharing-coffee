import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
    let auth = { 'token': '' }
    return (
        auth.token ? <Outlet /> : <Navigate to="/admin/default" />
    )
}

export default PrivateRoute
