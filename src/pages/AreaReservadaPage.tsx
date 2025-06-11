
import PageLayout from '@/pages/PageLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UserProfile from '@/components/auth/UserProfile';
import AdminUserRegistration from '@/components/auth/AdminUserRegistration';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  Settings,
  BarChart3,
  Shield,
  Upload
} from 'lucide-react';

const AreaReservadaPage = () => {
  return (
    <ProtectedRoute>
      <PageLayout 
        title="Área Reservada" 
        description="Painel de controle para administradores da FCBB"
      >
        <div className="space-y-8">
          {/* Perfil do usuário */}
          <UserProfile />
          
          {/* Registro de usuários (apenas para admins) */}
          <AdminUserRegistration />
          
          {/* Painel administrativo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cv-blue" />
                  Gestão de Notícias
                </CardTitle>
                <CardDescription>
                  Criar, editar e publicar notícias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Gerir Notícias
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-cv-blue" />
                  Competições
                </CardTitle>
                <CardDescription>
                  Gerir campeonatos e resultados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Gerir Competições
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cv-blue" />
                  Clubes e Jogadores
                </CardTitle>
                <CardDescription>
                  Administrar clubes e atletas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Gerir Clubes
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cv-blue" />
                  Calendário
                </CardTitle>
                <CardDescription>
                  Agendar jogos e eventos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Gerir Calendário
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-cv-blue" />
                  Galeria
                </CardTitle>
                <CardDescription>
                  Upload e gestão de imagens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Gerir Galeria
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cv-blue" />
                  Estatísticas
                </CardTitle>
                <CardDescription>
                  Relatórios e análises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Ver Estatísticas
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cv-blue" />
                  Arbitragem
                </CardTitle>
                <CardDescription>
                  Gestão de árbitros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Gerir Árbitros
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-cv-blue" />
                  Configurações
                </CardTitle>
                <CardDescription>
                  Configurações do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cv-blue hover:bg-cv-blue/90">
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Acesso Rápido</CardTitle>
              <CardDescription>
                Ações frequentes e informações importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Nova Notícia</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  <span>Novo Jogo</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Novo Jogador</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Novo Evento</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
};

export default AreaReservadaPage;
