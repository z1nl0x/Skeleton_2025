import { Navigate } from 'react-router';
import { useAuth } from '../store/auth-context';
import type React from 'react';
import {
  LoadingOutlined
} from '@ant-design/icons';

export default function AuthGuard({ children, allowedRoles }: { children: React.JSX.Element, allowedRoles?: string[] }) {
  const { user, role, loading, roleLoading } = useAuth();

  if (loading || roleLoading) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      ><LoadingOutlined style={{ fontSize: 48 }} /></div>;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}