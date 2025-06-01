
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClassificacoesPage = () => {
  const [selectedCompetition, setSelectedCompetition] = useState('liga-nacional');

  const ligaNacionalClassification = [
    { pos: 1, team: 'ABC Basquete', games: 18, wins: 15, losses: 3, points: 33 },
    { pos: 2, team: 'CD Travadores', games: 18, wins: 14, losses: 4, points: 32 },
    { pos: 3, team: 'Sporting CP', games: 18, wins: 13, losses: 5, points: 31 },
    { pos: 4, team: 'FC Porto', games: 18, wins: 11, losses: 7, points: 29 },
    { pos: 5, team: 'Benfica', games: 18, wins: 10, losses: 8, points: 28 },
    { pos: 6, team: 'Académica', games: 18, wins: 8, losses: 10, points: 26 },
    { pos: 7, team: 'Vitória SC', games: 18, wins: 7, losses: 11, points: 25 },
    { pos: 8, team: 'Boavista', games: 18, wins: 5, losses: 13, points: 23 },
  ];

  const tacaClassification = [
    { pos: 1, team: 'ABC Basquete', games: 6, wins: 6, losses: 0, points: 12 },
    { pos: 2, team: 'Sporting CP', games: 6, wins: 5, losses: 1, points: 11 },
    { pos: 3, team: 'FC Porto', games: 6, wins: 4, losses: 2, points: 10 },
    { pos: 4, team: 'Benfica', games: 6, wins: 2, losses: 4, points: 8 },
  ];

  return (
    <PageLayout title="Classificações">
      <Tabs value={selectedCompetition} onValueChange={setSelectedCompetition} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="liga-nacional">Liga Nacional</TabsTrigger>
          <TabsTrigger value="taca-cv">Taça de Cabo Verde</TabsTrigger>
          <TabsTrigger value="regionais">Competições Regionais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liga-nacional" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Liga Nacional 2024/25</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Pos</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead className="text-center">J</TableHead>
                  <TableHead className="text-center">V</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ligaNacionalClassification.map((team) => (
                  <TableRow key={team.pos}>
                    <TableCell className="font-medium">{team.pos}</TableCell>
                    <TableCell className="font-medium">{team.team}</TableCell>
                    <TableCell className="text-center">{team.games}</TableCell>
                    <TableCell className="text-center">{team.wins}</TableCell>
                    <TableCell className="text-center">{team.losses}</TableCell>
                    <TableCell className="text-center font-bold">{team.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="taca-cv" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Taça de Cabo Verde 2025</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Pos</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead className="text-center">J</TableHead>
                  <TableHead className="text-center">V</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tacaClassification.map((team) => (
                  <TableRow key={team.pos}>
                    <TableCell className="font-medium">{team.pos}</TableCell>
                    <TableCell className="font-medium">{team.team}</TableCell>
                    <TableCell className="text-center">{team.games}</TableCell>
                    <TableCell className="text-center">{team.wins}</TableCell>
                    <TableCell className="text-center">{team.losses}</TableCell>
                    <TableCell className="text-center font-bold">{team.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="regionais" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-cv-blue mb-3">Santiago</h3>
              <p className="text-gray-600">Classificações da região de Santiago serão atualizadas em breve.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-cv-blue mb-3">São Vicente</h3>
              <p className="text-gray-600">Classificações da região de São Vicente serão atualizadas em breve.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ClassificacoesPage;
