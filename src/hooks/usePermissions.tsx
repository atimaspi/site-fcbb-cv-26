
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'user' | 'moderator' | 'editor';

export interface Permission {
  resource: string;
  action: string;
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'delete' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'delete' },
    { resource: 'events', action: 'view' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'edit' },
    { resource: 'users', action: 'delete' },
    { resource: 'users', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'settings', action: 'edit' },
  ],
  editor: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  moderator: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  user: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
  ],
};

export const usePermissions = () => {
  const { user, isAdmin } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const fetchUserRole = useCallback(async () => {
    if (!user || isLoading || hasAttempted) {
      return;
    }

    setIsLoading(true);
    
    try {
      // First check if user email is admin (fast check)
      if (user.email === 'admin@fcbb.cv') {
        console.log('Usuário identificado como admin pelo email');
        setUserRole('admin');
        setHasAttempted(true);
        return;
      }

      // Try to fetch role from database
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!error && data && data.role) {
        console.log('Role do usuário obtida da base de dados:', data.role);
        setUserRole(data.role as UserRole);
      } else {
        console.log('Erro ao obter role ou perfil não encontrado:', error);
        setUserRole('user');
      }
    } catch (error: any) {
      console.log('Erro ao verificar role, usando fallbacks:', error.message);
      
      // Fallback strategies
      if (user.email === 'admin@fcbb.cv' || isAdmin) {
        setUserRole('admin');
      } else {
        setUserRole('user');
      }
    } finally {
      setIsLoading(false);
      setHasAttempted(true);
    }
  }, [user, isAdmin, isLoading, hasAttempted]);

  useEffect(() => {
    if (user && !hasAttempted) {
      // Add a small delay to prevent rapid repeated calls
      const timeout = setTimeout(() => {
        fetchUserRole();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [user, fetchUserRole, hasAttempted]);

  // Reset when user changes
  useEffect(() => {
    setHasAttempted(false);
    setIsLoading(false);
    if (!user) {
      setUserRole('user');
    }
  }, [user?.id]);

  const getUserRole = (): UserRole => {
    // Use multiple fallback strategies
    if (user?.email === 'admin@fcbb.cv' || isAdmin || userRole === 'admin') {
      return 'admin';
    }
    return userRole;
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    const currentRole = getUserRole();
    console.log('Verificando permissão:', { resource, action, currentRole, userEmail: user.email });
    
    const permissions = ROLE_PERMISSIONS[currentRole] || [];
    
    const hasAccess = permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
    
    console.log('Permissão concedida:', hasAccess);
    return hasAccess;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => 
      hasPermission(permission.resource, permission.action)
    );
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => 
      hasPermission(permission.resource, permission.action)
    );
  };

  const canAccessAdminArea = (): boolean => {
    const canAccess = hasPermission('dashboard', 'view');
    console.log('Pode aceder à área admin:', canAccess);
    return canAccess;
  };

  const canManageUsers = (): boolean => {
    return hasPermission('users', 'create');
  };

  const canManageNews = (): boolean => {
    return hasPermission('news', 'create');
  };

  const canManageEvents = (): boolean => {
    return hasPermission('events', 'create');
  };

  return {
    user,
    userRole: getUserRole(),
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdminArea,
    canManageUsers,
    canManageNews,
    canManageEvents,
  };
};
