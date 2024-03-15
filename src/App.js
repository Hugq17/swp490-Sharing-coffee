import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from "./layouts/auth"
import AdminLayout from "./layouts/admin"
import { useState } from 'react';
import PrivateRoute from './utils/PrivateRoute';
import SignIn from './views/auth/SignIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth/*' element={<AuthLayout />} />
        <Route path='admin/*' element={isLoggedIn ? <AdminLayout /> : <Navigate to="/auth/sign-in" />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        {/* <Route element={<PrivateRoute />}>
          <Route element={<AuthLayout />} path='auth/' />
          <Route element={<AdminLayout />} path='admin/' />
        </Route>
        <Route element={<SignIn />} path='/auth/sign-in' /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
