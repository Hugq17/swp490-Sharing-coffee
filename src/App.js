import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from "./layouts/auth"
import AdminLayout from "./layouts/admin"
import PrivateRoute from './views/auth/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth/*' element={<AuthLayout />} />
        <Route path='admin/*' element={<PrivateRoute element={<AdminLayout />} />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
