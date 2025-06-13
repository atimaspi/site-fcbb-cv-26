
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole('user');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          console.log('Role do usuário obtida:', data.role);
          setUserRole(data.role as UserRole);
        } else {
          console.log('Erro ao obter role ou perfil não encontrado:', error);
          setUserRole('user');
        }
      } catch (error) {
        console.log('Erro ao verificar role do usuário:', error);
        setUserRole('user');
      }
    };

    fetchUserRole();
  }, [user]);

  const getUserRole = (): UserRole => {
    // Usar o estado local primeiro, depois o isAdmin como fallback
    if (userRole === 'admin' || isAdmin) {
      return 'admin';
    }
    return userRole;
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    const currentRole = getUserRole();
    console.log('Verificando permissão:', { resource, action, currentRole });
    
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
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdminArea,
    canManageUsers,
    canManageNews,
    canManageEvents,
  };
};
