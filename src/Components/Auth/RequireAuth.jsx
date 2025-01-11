
import useAuth from './hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = ({children}) => {
    const {auth} = useAuth();
    const location = useLocation()
  return (
    auth?.user
    ? children
    : <Navigate to='/login' state={{ from:location }} replace />
  )
}

export default RequireAuth
