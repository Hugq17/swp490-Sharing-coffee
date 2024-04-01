import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    let isAuthenticated = localStorage.getItem("token") !== null;
    return isAuthenticated ? element : <Navigate to="/auth/sign-in" replace />;
}

export default PrivateRoute;
