
import { useState } from 'react';
import PageLayout from '@/pages/PageLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PermissionGuard from '@/components/auth/PermissionGuard';
import UserProfile from '@/components/auth/UserProfile';
import AdminUserRegistration from '@/components/auth/AdminUserRegistration';
import Dashboard from '@/components/admin/Dashboard';
import NewsManagementAdvanced from '@/components/admin/NewsManagementAdvanced';
import EventsManagement from '@/components/admin/EventsManagement';
import ClubsManagement from '@/components/admin/ClubsManagement';
import CompetitionsManagementAdvanced from '@/components/admin/CompetitionsManagementAdvanced';
import GalleryManagement from '@/components/admin/GalleryManagement';
import StatisticsManagement from '@/components/admin/StatisticsManagement';
import RefereesManagement from '@/components/admin/RefereesManagement';
import SystemSettings from '@/components/admin/SystemSettings';
import { usePermissions } from '@/hooks/usePermissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard,
  FileText, 
  Calendar, 
  Trophy, 
  Users, 
  Settings,
  BarChart3,
  Shield,
  Upload,
  User
} from 'lucide-react';

const AreaReservadaPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { canAccessAdminArea } = usePermissions();

  // Filtrar itens do menu baseado nas permissões
  const getAvailableMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'profile', label: 'Perfil', icon: User, permission: null }, // Sempre disponível para usuários logados
    ];

    const adminItems = [
      { id: 'news', label: 'Notícias', icon: FileText, permission: { resource: 'news', action: 'create' } },
      { id: 'events', label: 'Eventos', icon: Calendar, permission: { resource: 'events', action: 'create' } },
      { id: 'competitions', label: 'Competições', icon: Trophy, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'clubs', label: 'Clubes', icon: Users, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'gallery', label: 'Galeria', icon: Upload, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'stats', label: 'Estatísticas', icon: BarChart3, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'referees', label: 'Arbitragem', icon: Shield, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'settings', label: 'Configurações', icon: Settings, permission: { resource: 'settings', action: 'edit' } },
    ];

    // Filtrar itens baseado nas permissões
    const filteredItems = [...baseItems];
    
    adminItems.forEach(item => {
      if (!item.permission || canAccessAdminArea()) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  };

  const menuItems = getAvailableMenuItems();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <Dashboard />
          </PermissionGuard>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <UserProfile />
            <PermissionGuard permission={{ resource: 'users', action: 'create' }} showError={false}>
              <AdminUserRegistration />
            </PermissionGuard>
          </div>
        );
      case 'news':
        return (
          <PermissionGuard permission={{ resource: 'news', action: 'create' }}>
            <NewsManagementAdvanced />
          </PermissionGuard>
        );
      case 'events':
        return (
          <PermissionGuard permission={{ resource: 'events', action: 'create' }}>
            <EventsManagement />
          </PermissionGuard>
        );
      case 'competitions':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <CompetitionsManagementAdvanced />
          </PermissionGuard>
        );
      case 'clubs':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <ClubsManagement />
          </PermissionGuard>
        );
      case 'gallery':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <GalleryManagement />
          </PermissionGuard>
        );
      case 'stats':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <StatisticsManagement />
          </PermissionGuard>
        );
      case 'referees':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <RefereesManagement />
          </PermissionGuard>
        );
      case 'settings':
        return (
          <PermissionGuard permission={{ resource: 'settings', action: 'edit' }}>
            <SystemSettings />
          </PermissionGuard>
        );
      default:
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <Dashboard />
          </PermissionGuard>
        );
    }
  };

  return (
    <ProtectedRoute permission={{ resource: 'dashboard', action: 'view' }}>
      <PageLayout 
        title="Área Reservada" 
        description="Painel de controle administrativo da FCBB"
      >
        <div className="flex gap-6">
          {/* Sidebar de navegação */}
          <div className="w-64 space-y-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Menu Administrativo</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === item.id 
                          ? 'bg-cv-blue hover:bg-cv-blue/90' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
};

export default AreaReservadaPage;
