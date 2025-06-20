
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp, TrendingDown, Minus, MapPin, Calendar, Users, Target } from 'lucide-react';

const ClassificacoesRegionaisPage = () => {
  const regionais = {
    santiago: [
      { pos: 1, team: "ABC Basquete", games: 14, wins: 12, losses: 2, points: 26, trend: "up", region: "Santiago" },
      { pos: 2, team: "Sporting Praia", games: 14, wins: 11, losses: 3, points: 25, trend: "same", region: "Santiago" },
      { pos: 3, team: "Unidos do Tarrafal", games: 14, wins: 9, losses: 5, points: 23, trend: "up", region: "Santiago" },
      { pos: 4, team: "Estrela Vermelha", games: 14, wins: 8, losses: 6, points: 22, trend: "down", region: "Santiago" },
      { pos: 5, team: "Benfica Praia", games: 14, wins: 6, losses: 8, points: 20, trend: "same", region: "Santiago" },
      { pos: 6, team: "Clube Desportivo", games: 14, wins: 4, losses: 10, points: 18, trend: "down", region: "Santiago" }
    ],
    saoVicente: [
      { pos: 1, team: "Seven Stars", games: 12, wins: 11, losses: 1, points: 23, trend: "up", region: "São Vicente" },
      { pos: 2, team: "CS Mindelense", games: 12, wins: 9, losses: 3, points: 21, trend: "same", region: "São Vicente" },
      { pos: 3, team: "Barreirense", games: 12, wins: 8, losses: 4, points: 20, trend: "up", region: "São Vicente" },
      { pos: 4, team: "Académica Mindelo", games: 12, wins: 6, losses: 6, points: 18, trend: "down", region: "São Vicente" },
      { pos: 5, team: "Derby FC", games: 12, wins: 3, losses: 9, points: 15, trend: "down", region: "São Vicente" },
      { pos: 6, team: "União Desportiva", games: 12, wins: 1, losses: 11, points: 13, trend: "same", region: "São Vicente" }
    ],
    sal: [
      { pos: 1, team: "Académica do Sal", games: 10, wins: 8, losses: 2, points: 18, trend: "up", region: "Sal" },
      { pos: 2, team: "Juventude do Sal", games: 10, wins: 7, losses: 3, points: 17, trend: "same", region: "Sal" },
      { pos: 3, team: "Espargos FC", games: 10, wins: 5, losses: 5, points: 15, trend: "down", region: "Sal" },
      { pos: 4, team: "Santa Maria", games: 10, wins: 4, losses: 6, points: 14, trend: "up", region: "Sal" },
      { pos: 5, team: "Pedra de Lume", games: 10, wins: 1, losses: 9, points: 11, trend: "down", region: "Sal" }
    ],
    santoAntao: [
      { pos: 1, team: "Inter Porto Novo", games: 8, wins: 7, losses: 1, points: 15, trend: "up", region: "Santo Antão" },
      { pos: 2, team: "Paulense FC", games: 8, wins: 5, losses: 3, points: 13, trend: "same", region: "Santo Antão" },
      { pos: 3, team: "Ribeira Grande", games: 8, wins: 3, losses: 5, points: 11, trend: "down", region: "Santo Antão" },
      { pos: 4, team: "Desportivo Ribeira", games: 8, wins: 1, losses: 7, points: 9, trend: "down", region: "Santo Antão" }
    ]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPositionBadge = (pos: number) => {
    if (pos <= 2) return <Badge className="bg-green-500">Apurado</Badge>;
    if (pos <= 4) return <Badge variant="outline">Zona Segura</Badge>;
    return <Badge variant="destructive">Eliminação</Badge>;
  };

  const RegionalTable = ({ data, regionName }: { data: any[], regionName: string }) => (
    <Card className="modern-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cv-blue" />
            Liga Regional de {regionName}
          </CardTitle>
          <Badge variant="outline">Época 2023/24</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Pos</TableHead>
              <TableHead>Equipa</TableHead>
              <TableHead className="text-center">J</TableHead>
              <TableHead className="text-center">V</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead className="text-center">Situação</TableHead>
              <TableHead className="text-center">Tendência</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((team, index) => (
              <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <TableCell className="font-bold text-cv-blue">{team.pos}</TableCell>
                <TableCell className="font-semibold">{team.team}</TableCell>
                <TableCell className="text-center">{team.games}</TableCell>
                <TableCell className="text-center text-green-600 font-semibold">{team.wins}</TableCell>
                <TableCell className="text-center text-red-600 font-semibold">{team.losses}</TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell className="text-center">{getPositionBadge(team.pos)}</TableCell>
                <TableCell className="text-center">{getTrendIcon(team.trend)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout title="Classificações das Competições Regionais">
      <div className="space-y-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">4</div>
              <p className="text-gray-600 dark:text-gray-300">Regiões Ativas</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">21</div>
              <p className="text-gray-600 dark:text-gray-300">Equipas Participantes</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">156</div>
              <p className="text-gray-600 dark:text-gray-300">Jogos Realizados</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">78%</div>
              <p className="text-gray-600 dark:text-gray-300">Época Completada</p>
            </CardContent>
          </Card>
        </div>

        {/* Regional Classifications */}
        <Tabs defaultValue="santiago" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-effect">
            <TabsTrigger value="santiago">Santiago</TabsTrigger>
            <TabsTrigger value="saoVicente">São Vicente</TabsTrigger>
            <TabsTrigger value="sal">Sal</TabsTrigger>
            <TabsTrigger value="santoAntao">Santo Antão</TabsTrigger>
          </TabsList>
          
          <TabsContent value="santiago" className="space-y-6">
            <RegionalTable data={regionais.santiago} regionName="Santiago" />
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Próximos Jogos - Santiago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-semibold">ABC Basquete vs Sporting Praia</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">25 Jun • 19:00 • Pavilhão Municipal</div>
                    </div>
                    <Badge>Destaque</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-semibold">Unidos do Tarrafal vs Estrela Vermelha</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">26 Jun • 20:30 • Pavilhão do Tarrafal</div>
                    </div>
                    <Badge variant="outline">Regular</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saoVicente">
            <RegionalTable data={regionais.saoVicente} regionName="São Vicente" />
          </TabsContent>
          
          <TabsContent value="sal">
            <RegionalTable data={regionais.sal} regionName="Sal" />
          </TabsContent>
          
          <TabsContent value="santoAntao">
            <RegionalTable data={regionais.santoAntao} regionName="Santo Antão" />
          </TabsContent>
        </Tabs>

        {/* Regional Competition Rules */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-cv-blue" />
              Sistema de Apuramento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-lg font-bold text-green-700 dark:text-green-400">1º - 2º Lugar</div>
                <div className="text-sm text-green-600 dark:text-green-300">Apuramento Direto para Liga Nacional</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-lg font-bold text-blue-700 dark:text-blue-400">3º - 4º Lugar</div>
                <div className="text-sm text-blue-600 dark:text-blue-300">Zona de Segurança Regional</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-lg font-bold text-red-700 dark:text-red-400">Últimos Lugares</div>
                <div className="text-sm text-red-600 dark:text-red-300">Risco de Despromoção</div>
              </div>
            </div>
            <div className="text-center pt-4">
              <Button className="bg-cv-blue hover:bg-blue-700">
                Ver Regulamento Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ClassificacoesRegionaisPage;
