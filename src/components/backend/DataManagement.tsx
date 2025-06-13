
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  UserCheck,
  GraduationCap,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const DataManagement = () => {
  const {
    teams,
    competitions,
    games,
    players,
    newsData,
    eventsData,
    nationalTeams,
    referees,
    coaches,
    isLoading
  } = useBackendData();

  const [activeTab, setActiveTab] = useState('teams');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const renderTeamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Clubes</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Clube
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Abreviação</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Ilha</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team: any) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>{team.abbreviation}</TableCell>
              <TableCell>{team.city}</TableCell>
              <TableCell>{team.island}</TableCell>
              <TableCell>
                <Badge variant={team.status === 'ativo' ? 'default' : 'secondary'}>
                  {team.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderCompetitionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Competições</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Competição
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Época</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data Início</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitions.map((competition: any) => (
            <TableRow key={competition.id}>
              <TableCell className="font-medium">{competition.name}</TableCell>
              <TableCell>{competition.type}</TableCell>
              <TableCell>{competition.season}</TableCell>
              <TableCell>
                <Badge variant={competition.status === 'ativo' ? 'default' : 'secondary'}>
                  {competition.status}
                </Badge>
              </TableCell>
              <TableCell>{competition.start_date}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderGamesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Jogos</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Jogo
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Jogos Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {games.filter((g: any) => g.status === 'agendado').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Jogos Finalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {games.filter((g: any) => g.status === 'finalizado').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Jogos ao Vivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {games.filter((g: any) => g.status === 'ao_vivo').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPlayersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Jogadores</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Jogador
        </Button>
      </div>
      
      <div className="text-center py-8">
        <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Total de Jogadores: {players.length}
        </h3>
        <p className="text-gray-500">
          Sistema de gestão de jogadores ativo
        </p>
      </div>
    </div>
  );

  const renderNewsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Notícias</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Notícia
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Publicadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {newsData.filter((n: any) => n.status === 'publicado').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rascunhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {newsData.filter((n: any) => n.status === 'rascunho').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsData.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Gestão de Dados FCBB</h2>
        <p className="text-gray-600">Sistema completo de gestão backend</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Clubes
          </TabsTrigger>
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Competições
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Jogos
          </TabsTrigger>
          <TabsTrigger value="players" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Jogadores
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Notícias
          </TabsTrigger>
          <TabsTrigger value="officials" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Oficiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {renderTeamsTab()}
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          {renderCompetitionsTab()}
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          {renderGamesTab()}
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          {renderPlayersTab()}
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          {renderNewsTab()}
        </TabsContent>

        <TabsContent value="officials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Árbitros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cv-blue">{referees.length}</div>
                  <p className="text-gray-600">Árbitros Registados</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Treinadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cv-blue">{coaches.length}</div>
                  <p className="text-gray-600">Treinadores Licenciados</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagement;
