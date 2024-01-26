import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from "./layouts/auth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth/*' element={<AuthLayout />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
