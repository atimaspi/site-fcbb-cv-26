
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  TrendingUp,
  Eye,
  MessageSquare,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const { useFetch } = useApi();
  
  const { data: news, isLoading: newsLoading } = useFetch('news');
  const { data: events, isLoading: eventsLoading } = useFetch('events');
  const { data: clubs, isLoading: clubsLoading } = useFetch('clubs');
  const { data: players, isLoading: playersLoading } = useFetch('players');

  // Garantir que os dados são arrays válidos antes de acessar propriedades
  const newsList = Array.isArray(news) ? news : [];
  const eventsList = Array.isArray(events) ? events : [];
  const clubsList = Array.isArray(clubs) ? clubs : [];
  const playersList = Array.isArray(players) ? players : [];

  const stats = [
    {
      title: 'Total de Notícias',
      value: newsList.length,
      description: 'Artigos publicados',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Eventos Ativos',
      value: eventsList.length,
      description: 'Próximos eventos',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Clubes Registados',
      value: clubsList.length,
      description: 'Clubes ativos',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      title: 'Jogadores',
      value: playersList.length,
      description: 'Atletas registados',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  if (newsLoading || eventsLoading || clubsLoading || playersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Dashboard Administrativo</h2>
        <p className="text-gray-600">Visão geral da plataforma FCBB</p>
      </div>

      {/* Estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cv-blue">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Atividade recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cv-blue" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas ações na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova notícia publicada</p>
                  <p className="text-xs text-gray-500">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Evento agendado</p>
                  <p className="text-xs text-gray-500">Há 4 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="h-4 w-4 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo jogador registado</p>
                  <p className="text-xs text-gray-500">Há 6 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-cv-blue" />
              Acesso Rápido
            </CardTitle>
            <CardDescription>
              Ações mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-4 bg-cv-blue/10 hover:bg-cv-blue/20 rounded-lg transition-colors">
                <FileText className="h-6 w-6 text-cv-blue mb-2" />
                <span className="text-sm font-medium">Nova Notícia</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-cv-red/10 hover:bg-cv-red/20 rounded-lg transition-colors">
                <Calendar className="h-6 w-6 text-cv-red mb-2" />
                <span className="text-sm font-medium">Novo Evento</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                <Trophy className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm font-medium">Novo Jogo</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors">
                <Users className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium">Novo Jogador</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
