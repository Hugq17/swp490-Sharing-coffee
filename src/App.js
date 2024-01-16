import AuthLogin from './pages/common/auth-login/Auth-login'
import AuthSignup from './pages/common/auth-signup/Auth-signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/login' element={<AuthLogin />}></Route>
        <Route path='/signup' element={<AuthSignup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
