
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, TrendingUp } from 'lucide-react';

const ResultadosPage = () => {
  const recentGames = [
    {
      id: 1,
      date: '23/05/2025',
      time: '20:00',
      competition: 'Liga Nacional',
      homeTeam: 'ABC Basquete',
      awayTeam: 'Sporting CP',
      homeScore: 85,
      awayScore: 72,
      status: 'finalizado',
      venue: 'Pavilhão Municipal'
    },
    {
      id: 2,
      date: '22/05/2025',
      time: '18:30',
      competition: 'Liga Nacional',
      homeTeam: 'FC Porto',
      awayTeam: 'CD Travadores',
      homeScore: 78,
      awayScore: 81,
      status: 'finalizado',
      venue: 'Dragão Arena'
    },
    {
      id: 3,
      date: '21/05/2025',
      time: '19:00',
      competition: 'Taça CV',
      homeTeam: 'Benfica',
      awayTeam: 'Académica',
      homeScore: 92,
      awayScore: 68,
      status: 'finalizado',
      venue: 'Pavilhão Central'
    }
  ];

  const upcomingGames = [
    {
      id: 1,
      date: '25/05/2025',
      time: '18:00',
      competition: 'Liga Nacional',
      homeTeam: 'ABC Basquete',
      awayTeam: 'FC Porto',
      status: 'agendado',
      venue: 'Pavilhão Municipal'
    },
    {
      id: 2,
      date: '26/05/2025',
      time: '20:00',
      competition: 'Liga Nacional',
      homeTeam: 'Sporting CP',
      awayTeam: 'CD Travadores',
      status: 'agendado',
      venue: 'Pavilhão Desportivo'
    },
    {
      id: 3,
      date: '27/05/2025',
      time: '19:30',
      competition: 'Taça CV',
      homeTeam: 'Benfica',
      awayTeam: 'Boavista',
      status: 'agendado',
      venue: 'Estádio da Luz'
    }
  ];

  const liveGames = [
    {
      id: 1,
      time: 'AO VIVO',
      competition: 'Liga Nacional',
      homeTeam: 'Vitória SC',
      awayTeam: 'Académica',
      homeScore: 45,
      awayScore: 38,
      quarter: '2º Período',
      timeLeft: '08:23',
      venue: 'Pavilhão D. Afonso Henriques'
    }
  ];

  const competitions = [
    { name: 'Liga Nacional', games: 144, completed: 120 },
    { name: 'Taça de Cabo Verde', games: 32, completed: 28 },
    { name: 'Super Taça', games: 1, completed: 1 },
    { name: 'Regionais', games: 60, completed: 45 }
  ];

  return (
    <PageLayout title="Resultados e Calendário">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jogos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ao Vivo</CardTitle>
            <Users className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">1</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <Trophy className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
            <TrendingUp className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">82.5</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ao-vivo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ao-vivo">Ao Vivo</TabsTrigger>
          <TabsTrigger value="resultados">Resultados</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="competicoes">Competições</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ao-vivo" className="space-y-4">
          <div className="space-y-4">
            {liveGames.length > 0 ? (
              liveGames.map((game) => (
                <Card key={game.id} className="border-l-4 border-red-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          {game.time}
                        </Badge>
                        <span className="text-sm text-gray-600">{game.competition}</span>
                      </div>
                      <div className="text-sm text-gray-600">{game.venue}</div>
                    </div>
                    
                    <div className="grid grid-cols-3 items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-lg">{game.homeTeam}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-4">
                          <span className="text-3xl font-bold text-cv-blue">{game.homeScore}</span>
                          <span className="text-2xl text-gray-400">-</span>
                          <span className="text-3xl font-bold text-cv-blue">{game.awayScore}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {game.quarter} • {game.timeLeft}
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <div className="font-bold text-lg">{game.awayTeam}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">Não há jogos ao vivo neste momento.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="resultados" className="space-y-4">
          <div className="space-y-4">
            {recentGames.map((game) => (
              <Card key={game.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{game.date} • {game.time}</span>
                      <Badge variant="outline">{game.competition}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">{game.venue}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">{game.homeTeam}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4">
                        <span className={`text-2xl font-bold ${game.homeScore > game.awayScore ? 'text-green-600' : 'text-gray-600'}`}>
                          {game.homeScore}
                        </span>
                        <span className="text-xl text-gray-400">-</span>
                        <span className={`text-2xl font-bold ${game.awayScore > game.homeScore ? 'text-green-600' : 'text-gray-600'}`}>
                          {game.awayScore}
                        </span>
                      </div>
                      <Badge className="mt-2 bg-green-100 text-green-800">Final</Badge>
                    </div>
                    
                    <div className="text-left">
                      <div className="font-bold text-lg">{game.awayTeam}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="calendario" className="space-y-4">
          <div className="space-y-4">
            {upcomingGames.map((game) => (
              <Card key={game.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{game.date} • {game.time}</span>
                      <Badge variant="outline">{game.competition}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">{game.venue}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">{game.homeTeam}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-400">VS</div>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">Agendado</Badge>
                    </div>
                    
                    <div className="text-left">
                      <div className="font-bold text-lg">{game.awayTeam}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="competicoes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitions.map((comp, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-cv-blue">{comp.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Jogos Totais:</span>
                      <span className="font-bold">{comp.games}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Concluídos:</span>
                      <span className="font-bold">{comp.completed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cv-blue h-2 rounded-full" 
                        style={{ width: `${(comp.completed / comp.games) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                      {Math.round((comp.completed / comp.games) * 100)}% completa
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ResultadosPage;
