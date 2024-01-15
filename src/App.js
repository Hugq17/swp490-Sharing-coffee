import AuthLogin from './pages/common/auth-login/page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/login' element={<AuthLogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
