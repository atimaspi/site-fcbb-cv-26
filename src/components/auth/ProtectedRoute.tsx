
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import AuthForm from './AuthForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  // TODO: Implementar verificação de admin quando necessário
  // if (requireAdmin && !isAdmin) {
  //   return <div>Acesso negado. Apenas administradores.</div>;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
