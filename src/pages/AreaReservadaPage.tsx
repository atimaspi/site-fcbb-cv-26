
import { useState } from 'react';
import PageLayout from '@/pages/PageLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminContent from '@/components/admin/AdminContent';

const AreaReservadaPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ProtectedRoute permission={{ resource: 'dashboard', action: 'view' }}>
      <PageLayout 
        title="Área Reservada" 
        description="Painel de controle administrativo da FCBB"
      >
        <div className="flex gap-6">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <AdminContent activeTab={activeTab} />
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
};

export default AreaReservadaPage;
