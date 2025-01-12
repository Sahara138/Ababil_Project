import useAuth from './hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = ({allowedRoles,children}) => {
    const {auth} = useAuth();
    const location = useLocation()
    const userRoles = Array.isArray(auth?.roles) ? auth.roles : [auth?.roles];
    console.log('Auth:', auth, 'Allowed Roles:', allowedRoles);
    console.log(userRoles)
    


    return (
        userRoles?.find(role => allowedRoles?.includes(role))
            ? children
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default RequireAuth
