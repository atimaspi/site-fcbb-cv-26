
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Wifi, BarChart3, Clock, MapPin, Users } from 'lucide-react';

const ResultadosAoVivoPage = () => {
  const liveGames = [
    {
      id: 1,
      competition: "Liga Nacional Masculina",
      homeTeam: "ABC Basquete",
      awayTeam: "Sporting CP",
      homeScore: 78,
      awayScore: 82,
      quarter: "4º Período",
      time: "02:15",
      venue: "Pavilhão Gimnodesportivo da Praia",
      viewers: 1250,
      isLive: true
    },
    {
      id: 2,
      competition: "Liga Nacional Feminina",
      homeTeam: "Five Stars Feminino",
      awayTeam: "Unidos Feminino",
      homeScore: 56,
      awayScore: 51,
      quarter: "3º Período",
      time: "08:42",
      venue: "Pavilhão Municipal de Mindelo",
      viewers: 890,
      isLive: true
    }
  ];

  const todaysGames = [
    {
      id: 3,
      competition: "Taça de Cabo Verde",
      homeTeam: "CD Travadores",
      awayTeam: "Académica",
      time: "19:00",
      venue: "Pavilhão da Várzea",
      status: "A iniciar em breve"
    },
    {
      id: 4,
      competition: "Liga Nacional Masculina",
      homeTeam: "Benfica CV",
      awayTeam: "FC Porto CV",
      time: "21:00",
      venue: "Pavilhão Gimnodesportivo da Praia",
      status: "Agendado"
    }
  ];

  const recentResults = [
    {
      id: 5,
      competition: "Liga Nacional Masculina",
      homeTeam: "Sporting CP",
      awayTeam: "Five Stars",
      homeScore: 89,
      awayScore: 76,
      date: "Ontem",
      venue: "Pavilhão Municipal de Mindelo"
    },
    {
      id: 6,
      competition: "Liga Nacional Feminina",
      homeTeam: "Unidos Feminino",
      awayTeam: "ABC Feminino",
      homeScore: 68,
      awayScore: 72,
      date: "Domingo",
      venue: "Pavilhão da Várzea"
    }
  ];

  return (
    <PageLayout title="Resultados ao Vivo">
      <div className="space-y-6">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live">Ao Vivo</TabsTrigger>
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <div className="grid gap-4">
              {liveGames.map((game) => (
                <Card key={game.id} className="border-2 border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-cv-blue">{game.competition}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-500 animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                          AO VIVO
                        </Badge>
                        <Badge variant="outline" className="text-red-600">
                          {game.quarter} • {game.time}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center md:text-right">
                        <h3 className="font-bold text-lg">{game.homeTeam}</h3>
                        <p className="text-3xl font-bold text-cv-blue">{game.homeScore}</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-400">VS</span>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg">{game.awayTeam}</h3>
                        <p className="text-3xl font-bold text-cv-blue">{game.awayScore}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {game.venue}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {game.viewers.toLocaleString()} espectadores
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        <Play className="h-4 w-4 mr-2" />
                        Ver Stream
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-300 text-orange-600">
                        <Wifi className="h-4 w-4 mr-2" />
                        FIBA LiveStats
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Estatísticas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <div className="grid gap-4">
              {todaysGames.map((game) => (
                <Card key={game.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-cv-blue">{game.competition}</CardTitle>
                      <Badge variant="outline" className="text-cv-blue">
                        <Clock className="h-3 w-3 mr-1" />
                        {game.time}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center md:text-right">
                        <h3 className="font-bold text-lg">{game.homeTeam}</h3>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-400">VS</span>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg">{game.awayTeam}</h3>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 mb-3">
                      <div className="flex items-center justify-center mb-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        {game.venue}
                      </div>
                      <Badge variant="secondary">{game.status}</Badge>
                    </div>

                    <div className="flex justify-center">
                      <Button size="sm" variant="outline" className="border-cv-blue text-cv-blue">
                        Definir Lembrete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-4">
              {recentResults.map((game) => (
                <Card key={game.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-cv-blue">{game.competition}</CardTitle>
                      <Badge variant="outline">{game.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center md:text-right">
                        <h3 className="font-bold text-lg">{game.homeTeam}</h3>
                        <p className="text-2xl font-bold text-cv-blue">{game.homeScore}</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-400">-</span>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg">{game.awayTeam}</h3>
                        <p className="text-2xl font-bold text-cv-blue">{game.awayScore}</p>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 mb-3">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {game.venue}
                      </div>
                    </div>

                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Ver Estatísticas
                      </Button>
                      <Button size="sm" variant="outline">
                        Relatório do Jogo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Widget de Notificações */}
        <Card className="bg-gradient-to-r from-cv-blue to-cv-red text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Notificações em Tempo Real</h3>
                <p className="text-sm opacity-90">
                  Receba alertas instantâneos sobre golos, resultados e estatísticas dos seus jogos favoritos.
                </p>
              </div>
              <Button variant="secondary" className="bg-white text-cv-blue hover:bg-gray-100">
                Ativar Notificações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ResultadosAoVivoPage;
