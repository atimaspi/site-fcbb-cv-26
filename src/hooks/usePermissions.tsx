
import { useAuth } from '@/contexts/AuthContext';

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

  const getUserRole = (): UserRole => {
    if (isAdmin) return 'admin';
    // Por agora, todos os não-admins são 'user'
    // Isso pode ser expandido para verificar roles específicos do banco de dados
    return 'user';
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    const userRole = getUserRole();
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    
    return permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
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
    return hasPermission('dashboard', 'view');
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
