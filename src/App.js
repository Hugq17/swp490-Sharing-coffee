import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from "./layouts/auth"
import AdminLayout from "./layouts/admin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth/*' element={<AuthLayout />} />
        <Route path='admin/*' element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
