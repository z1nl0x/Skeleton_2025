import { Navigate } from 'react-router';
import { useAuth } from '../store/auth-context';
import type React from 'react';

export default function AuthGuard({ children }: { children: React.JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}