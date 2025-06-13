
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  TrendingUp,
  Eye,
  MessageSquare,
  Star,
  ImageIcon,
  Play,
  Database,
  BarChart3
} from 'lucide-react';

import GamesManagement from './GamesManagement';
import ResultsManagement from './ResultsManagement';
import IntegrationsManagement from './IntegrationsManagement';
import GalleryManagement from './GalleryManagement';
import DataManagement from '../backend/DataManagement';
import LiveScoring from '../backend/LiveScoring';

const Dashboard = () => {
  const { useFetch } = useApi();
  const {
    teams,
    competitions,
    games,
    players,
    publishedNews,
    activeEvents,
    recentGames,
    upcomingGames,
    isLoading: backendLoading
  } = useBackendData();
  
  const { data: news, isLoading: newsLoading } = useFetch('news');
  const { data: events, isLoading: eventsLoading } = useFetch('events');
  const { data: clubs, isLoading: clubsLoading } = useFetch('clubs');

  // Use backend data if available, fallback to API data
  const newsList = publishedNews.length > 0 ? publishedNews : (Array.isArray(news) ? news : []);
  const eventsList = activeEvents.length > 0 ? activeEvents : (Array.isArray(events) ? events : []);
  const clubsList = teams.length > 0 ? teams : (Array.isArray(clubs) ? clubs : []);
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

  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-cv-blue mb-2">Dashboard Administrativo</h2>
              <p className="text-gray-600">Visão geral da plataforma FCBB com backend completo</p>
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

            {/* Estatísticas adicionais de backend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-cv-blue" />
                    Competições Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cv-blue">{competitions.length}</div>
                  <p className="text-sm text-gray-500">Ligas e torneios em curso</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-cv-blue" />
                    Jogos Realizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cv-blue">
                    {games.filter((g: any) => g.status === 'finalizado').length}
                  </div>
                  <p className="text-sm text-gray-500">Jogos completados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cv-blue" />
                    Próximos Jogos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cv-blue">
                    {upcomingGames.length}
                  </div>
                  <p className="text-sm text-gray-500">Jogos agendados</p>
                </CardContent>
              </Card>
            </div>

            {/* Atividade recente e acesso rápido */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-cv-blue" />
                    Últimos Resultados
                  </CardTitle>
                  <CardDescription>
                    Resultados dos jogos mais recentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentGames.slice(0, 3).map((game: any) => (
                      <div key={game.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Trophy className="h-4 w-4 text-cv-blue" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {teams.find((t: any) => t.id === game.home_team_id)?.name || 'Casa'} {game.home_score} - {game.away_score} {teams.find((t: any) => t.id === game.away_team_id)?.name || 'Visitante'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(game.game_date).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                      </div>
                    ))}
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
                    <button 
                      onClick={() => setActiveTab('data')}
                      className="flex flex-col items-center p-4 bg-cv-blue/10 hover:bg-cv-blue/20 rounded-lg transition-colors"
                    >
                      <Database className="h-6 w-6 text-cv-blue mb-2" />
                      <span className="text-sm font-medium">Gestão de Dados</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('live')}
                      className="flex flex-col items-center p-4 bg-cv-red/10 hover:bg-cv-red/20 rounded-lg transition-colors"
                    >
                      <Play className="h-6 w-6 text-cv-red mb-2" />
                      <span className="text-sm font-medium">Pontuação ao Vivo</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('games')}
                      className="flex flex-col items-center p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                    >
                      <Trophy className="h-6 w-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Gestão de Jogos</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('gallery')}
                      className="flex flex-col items-center p-4 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                    >
                      <ImageIcon className="h-6 w-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Galeria</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'data':
        return <DataManagement />;
      case 'live':
        return <LiveScoring />;
      case 'games':
        return <GamesManagement />;
      case 'results':
        return <ResultsManagement />;
      case 'integrations':
        return <IntegrationsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      default:
        return <div className="text-center py-8">Selecione uma opção no menu lateral</div>;
    }
  };

  if (newsLoading || eventsLoading || clubsLoading || backendLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-cv-blue text-white p-6">
        <h2 className="text-xl font-bold mb-8">Painel Admin FCBB</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <BarChart3 className="inline w-4 h-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'data' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <Database className="inline w-4 h-4 mr-2" />
            Gestão de Dados
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'live' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <Play className="inline w-4 h-4 mr-2" />
            Pontuação ao Vivo
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'games' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <Trophy className="inline w-4 h-4 mr-2" />
            Gestão de Jogos
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'results' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <FileText className="inline w-4 h-4 mr-2" />
            Gestão de Resultados
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'gallery' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <ImageIcon className="inline w-4 h-4 mr-2" />
            Gestão de Galeria
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === 'integrations' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            <Star className="inline w-4 h-4 mr-2" />
            Integrações
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
