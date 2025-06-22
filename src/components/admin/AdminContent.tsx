
import { memo } from 'react';
import PermissionGuard from '@/components/auth/PermissionGuard';
import UserProfile from '@/components/auth/UserProfile';
import AdminUserRegistration from '@/components/auth/AdminUserRegistration';
import Dashboard from '@/components/admin/Dashboard';
import NewsManagementAdvanced from '@/components/admin/NewsManagementAdvanced';
import EventsManagement from '@/components/admin/EventsManagement';
import ClubsManagement from '@/components/admin/ClubsManagement';
import CompetitionsManagementAdvanced from '@/components/admin/CompetitionsManagementAdvanced';
import GalleryManagement from '@/components/admin/GalleryManagement';
import StatisticsManagementAdvanced from '@/components/admin/StatisticsManagementAdvanced';
import RefereesManagement from '@/components/admin/RefereesManagement';
import PlayersManagementAdvanced from '@/components/admin/PlayersManagementAdvanced';
import CoachesManagement from '@/components/admin/CoachesManagement';
import GamesManagementAdvanced from '@/components/admin/GamesManagementAdvanced';
import RegionalAssociationsManagement from '@/components/admin/RegionalAssociationsManagement';
import FederationsManagement from '@/components/admin/FederationsManagement';
import HeroSlidesManagement from '@/components/admin/HeroSlidesManagement';
import PartnersManagementAdvanced from '@/components/admin/PartnersManagementAdvanced';
import SiteSettingsAdvanced from '@/components/admin/SiteSettingsAdvanced';

interface AdminContentProps {
  activeTab: string;
}

const AdminContent = memo(({ activeTab }: AdminContentProps) => {
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
      case 'hero-slides':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <HeroSlidesManagement />
          </PermissionGuard>
        );
      case 'statistics':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <StatisticsManagementAdvanced />
          </PermissionGuard>
        );
      case 'partners':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <PartnersManagementAdvanced />
          </PermissionGuard>
        );
      case 'site-settings':
        return (
          <PermissionGuard permission={{ resource: 'settings', action: 'edit' }}>
            <SiteSettingsAdvanced />
          </PermissionGuard>
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
      case 'federations':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <FederationsManagement />
          </PermissionGuard>
        );
      case 'regionalAssociations':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <RegionalAssociationsManagement />
          </PermissionGuard>
        );
      case 'clubs':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <ClubsManagement />
          </PermissionGuard>
        );
      case 'players':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <PlayersManagementAdvanced />
          </PermissionGuard>
        );
      case 'coaches':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <CoachesManagement />
          </PermissionGuard>
        );
      case 'games':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <GamesManagementAdvanced />
          </PermissionGuard>
        );
      case 'gallery':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <GalleryManagement />
          </PermissionGuard>
        );
      case 'referees':
        return (
          <PermissionGuard permission={{ resource: 'dashboard', action: 'view' }}>
            <RefereesManagement />
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

  return <div className="flex-1">{renderContent()}</div>;
});

AdminContent.displayName = 'AdminContent';

export default AdminContent;
