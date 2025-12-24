import { Navigate } from 'react-router';
import { useAuth } from '../store/auth-context';
import type React from 'react';

export default function AuthGuard({ children, allowedRoles }: { children: React.JSX.Element, allowedRoles?: string[] }) {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role ?? '')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}