import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';

export const ProtectedRoute = () => {

  return <Outlet />;
};
