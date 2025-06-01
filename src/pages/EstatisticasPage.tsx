
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EstatisticasPage = () => {
  const topScorers = [
    { rank: 1, player: 'João Silva', team: 'ABC Basquete', points: 24.5, games: 18 },
    { rank: 2, player: 'Carlos Santos', team: 'CD Travadores', points: 22.8, games: 17 },
    { rank: 3, player: 'Pedro Gomes', team: 'Sporting CP', points: 21.3, games: 18 },
    { rank: 4, player: 'Miguel Costa', team: 'FC Porto', points: 19.7, games: 16 },
    { rank: 5, player: 'André Pereira', team: 'Benfica', points: 18.9, games: 18 },
  ];

  const topRebounders = [
    { rank: 1, player: 'Marco António', team: 'ABC Basquete', rebounds: 11.2, games: 18 },
    { rank: 2, player: 'Luís Fonseca', team: 'Sporting CP', rebounds: 10.8, games: 17 },
    { rank: 3, player: 'Bruno Tavares', team: 'FC Porto', rebounds: 10.1, games: 18 },
    { rank: 4, player: 'Rui Martins', team: 'CD Travadores', rebounds: 9.7, games: 16 },
    { rank: 5, player: 'Tiago Sousa', team: 'Benfica', rebounds: 9.3, games: 18 },
  ];

  const topAssists = [
    { rank: 1, player: 'Nuno Rodrigues', team: 'Sporting CP', assists: 8.7, games: 18 },
    { rank: 2, player: 'Ricardo Lima', team: 'ABC Basquete', assists: 7.9, games: 17 },
    { rank: 3, player: 'Hugo Mendes', team: 'FC Porto', assists: 7.2, games: 18 },
    { rank: 4, player: 'Filipe Cruz', team: 'CD Travadores', assists: 6.8, games: 16 },
    { rank: 5, player: 'Daniel Lopes', team: 'Benfica', assists: 6.5, games: 18 },
  ];

  return (
    <PageLayout title="Estatísticas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Total de Jogos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cv-blue">144</div>
            <p className="text-gray-600">Esta época</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Equipas Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cv-blue">16</div>
            <p className="text-gray-600">Todas as competições</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Jogadores Registados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cv-blue">240</div>
            <p className="text-gray-600">Época 2024/25</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pontuacao" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pontuacao">Pontuação</TabsTrigger>
          <TabsTrigger value="ressaltos">Ressaltos</TabsTrigger>
          <TabsTrigger value="assistencias">Assistências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pontuacao" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Top Marcadores</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead className="text-center">PPJ</TableHead>
                  <TableHead className="text-center">Jogos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topScorers.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell className="font-medium">{player.player}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="text-center font-bold">{player.points}</TableCell>
                    <TableCell className="text-center">{player.games}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="ressaltos" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Top Ressaltadores</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead className="text-center">RPJ</TableHead>
                  <TableHead className="text-center">Jogos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRebounders.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell className="font-medium">{player.player}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="text-center font-bold">{player.rebounds}</TableCell>
                    <TableCell className="text-center">{player.games}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="assistencias" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Top Assistentes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead className="text-center">APJ</TableHead>
                  <TableHead className="text-center">Jogos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAssists.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell className="font-medium">{player.player}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="text-center font-bold">{player.assists}</TableCell>
                    <TableCell className="text-center">{player.games}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default EstatisticasPage;
