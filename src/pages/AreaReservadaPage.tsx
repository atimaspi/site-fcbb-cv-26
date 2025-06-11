
import { useState } from 'react';
import PageLayout from '@/pages/PageLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PermissionGuard from '@/components/auth/PermissionGuard';
import UserProfile from '@/components/auth/UserProfile';
import AdminUserRegistration from '@/components/auth/AdminUserRegistration';
import Dashboard from '@/components/admin/Dashboard';
import NewsManagementAdvanced from '@/components/admin/NewsManagementAdvanced';
import EventsManagement from '@/components/admin/EventsManagement';
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
  const { canAccessAdminArea, canManageNews, canManageEvents, canManageUsers } = usePermissions();

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-cv-blue" />
                  Gestão de Competições
                </CardTitle>
                <CardDescription>
                  Funcionalidade em desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Esta secção permitirá gerir campeonatos, jogos e resultados.
                </p>
              </CardContent>
            </Card>
          </PermissionGuard>
        );
      case 'clubs':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cv-blue" />
                  Gestão de Clubes
                </CardTitle>
                <CardDescription>
                  Funcionalidade em desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Esta secção permitirá gerir clubes, equipas e jogadores.
                </p>
              </CardContent>
            </Card>
          </PermissionGuard>
        );
      case 'gallery':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-cv-blue" />
                  Gestão de Galeria
                </CardTitle>
                <CardDescription>
                  Funcionalidade em desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Esta secção permitirá fazer upload e gerir imagens da galeria.
                </p>
              </CardContent>
            </Card>
          </PermissionGuard>
        );
      case 'stats':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cv-blue" />
                  Estatísticas e Relatórios
                </CardTitle>
                <CardDescription>
                  Funcionalidade em desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Esta secção mostrará estatísticas detalhadas e relatórios.
                </p>
              </CardContent>
            </Card>
          </PermissionGuard>
        );
      case 'referees':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cv-blue" />
                  Gestão de Arbitragem
                </CardTitle>
                <CardDescription>
                  Funcionalidade em desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Esta secção permitirá gerir árbitros e designações.
                </p>
              </CardContent>
            </Card>
          </PermissionGuard>
        );
      case 'settings':
        return (
          <PermissionGuard permission={{ resource: 'settings', action: 'edit' }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-cv-blue" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>
                  Funcionalidade em desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Esta secção permitirá configurar parâmetros do sistema.
                </p>
              </CardContent>
            </Card>
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
