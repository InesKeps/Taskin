import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
