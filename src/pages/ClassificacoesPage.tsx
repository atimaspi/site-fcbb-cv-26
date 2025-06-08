
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ClassificacoesPage = () => {
  const ligaNacional = [
    { pos: 1, team: "ABC Basquete", games: 18, wins: 16, losses: 2, points: 34, trend: "up" },
    { pos: 2, team: "Seven Stars", games: 18, wins: 15, losses: 3, points: 33, trend: "up" },
    { pos: 3, team: "Sporting CP", games: 18, wins: 14, losses: 4, points: 32, trend: "same" },
    { pos: 4, team: "Académica", games: 18, wins: 12, losses: 6, points: 30, trend: "up" },
    { pos: 5, team: "CD Travadores", games: 18, wins: 11, losses: 7, points: 29, trend: "down" },
    { pos: 6, team: "Inter Clube", games: 18, wins: 10, losses: 8, points: 28, trend: "up" },
    { pos: 7, team: "Five Stars", games: 18, wins: 9, losses: 9, points: 27, trend: "same" },
    { pos: 8, team: "Boavista FC", games: 18, wins: 8, losses: 10, points: 26, trend: "down" },
    { pos: 9, team: "Vitória SC", games: 18, wins: 6, losses: 12, points: 24, trend: "down" },
    { pos: 10, team: "FC Porto CV", games: 18, wins: 5, losses: 13, points: 23, trend: "same" },
    { pos: 11, team: "Benfica CV", games: 18, wins: 4, losses: 14, points: 22, trend: "down" },
    { pos: 12, team: "União Desportiva", games: 18, wins: 2, losses: 16, points: 20, trend: "down" }
  ];

  const ligaFeminina = [
    { pos: 1, team: "ABC Basquete F", games: 16, wins: 15, losses: 1, points: 31, trend: "up" },
    { pos: 2, team: "Sporting CP F", games: 16, wins: 13, losses: 3, points: 29, trend: "same" },
    { pos: 3, team: "Seven Stars F", games: 16, wins: 12, losses: 4, points: 28, trend: "up" },
    { pos: 4, team: "Académica F", games: 16, wins: 10, losses: 6, points: 26, trend: "down" },
    { pos: 5, team: "Inter Clube F", games: 16, wins: 9, losses: 7, points: 25, trend: "up" },
    { pos: 6, team: "CD Travadores F", games: 16, wins: 8, losses: 8, points: 24, trend: "same" },
    { pos: 7, team: "Five Stars F", games: 16, wins: 6, losses: 10, points: 22, trend: "down" },
    { pos: 8, team: "Boavista FC F", games: 16, wins: 4, losses: 12, points: 20, trend: "down" },
    { pos: 9, team: "Vitória SC F", games: 16, wins: 3, losses: 13, points: 19, trend: "same" },
    { pos: 10, team: "União Desportiva F", games: 16, wins: 1, losses: 15, points: 17, trend: "down" }
  ];

  const juvenis = [
    { pos: 1, team: "ABC Basquete Sub-18", games: 14, wins: 12, losses: 2, points: 26, trend: "up" },
    { pos: 2, team: "Sporting CP Sub-18", games: 14, wins: 11, losses: 3, points: 25, trend: "same" },
    { pos: 3, team: "Seven Stars Sub-18", games: 14, wins: 10, losses: 4, points: 24, trend: "up" },
    { pos: 4, team: "Académica Sub-18", games: 14, wins: 8, losses: 6, points: 22, trend: "down" },
    { pos: 5, team: "Inter Clube Sub-18", games: 14, wins: 7, losses: 7, points: 21, trend: "up" },
    { pos: 6, team: "CD Travadores Sub-18", games: 14, wins: 6, losses: 8, points: 20, trend: "same" },
    { pos: 7, team: "Five Stars Sub-18", games: 14, wins: 4, losses: 10, points: 18, trend: "down" },
    { pos: 8, team: "Boavista FC Sub-18", games: 14, wins: 2, losses: 12, points: 16, trend: "down" }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPositionBadge = (pos: number, category: string) => {
    if (category === 'ligaNacional') {
      if (pos <= 4) return <Badge className="bg-green-500">Playoffs</Badge>;
      if (pos <= 8) return <Badge className="bg-blue-500">Qualificado</Badge>;
      return <Badge variant="destructive">Descida</Badge>;
    }
    if (category === 'ligaFeminina') {
      if (pos <= 4) return <Badge className="bg-green-500">Playoffs</Badge>;
      return <Badge variant="outline">Zona Segura</Badge>;
    }
    if (category === 'juvenis') {
      if (pos <= 3) return <Badge className="bg-yellow-500">Pódio</Badge>;
      return <Badge variant="outline">Participante</Badge>;
    }
  };

  const ClassificationTable = ({ data, category }: { data: any[], category: string }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Pos</th>
            <th className="text-left p-2">Equipa</th>
            <th className="text-center p-2">J</th>
            <th className="text-center p-2">V</th>
            <th className="text-center p-2">D</th>
            <th className="text-center p-2">Pts</th>
            <th className="text-center p-2">Situação</th>
            <th className="text-center p-2">Tendência</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2 font-bold text-cv-blue">{team.pos}</td>
              <td className="p-2 font-semibold">{team.team}</td>
              <td className="p-2 text-center">{team.games}</td>
              <td className="p-2 text-center text-green-600 font-semibold">{team.wins}</td>
              <td className="p-2 text-center text-red-600 font-semibold">{team.losses}</td>
              <td className="p-2 text-center font-bold">{team.points}</td>
              <td className="p-2 text-center">{getPositionBadge(team.pos, category)}</td>
              <td className="p-2 text-center">{getTrendIcon(team.trend)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <PageLayout title="Classificações">
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">3</div>
              <p className="text-gray-600">Competições Ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cv-blue mb-2">32</div>
              <p className="text-gray-600">Equipas em Competição</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cv-blue mb-2">85%</div>
              <p className="text-gray-600">Época Completada</p>
            </CardContent>
          </Card>
        </div>

        {/* Classification Tables */}
        <Tabs defaultValue="ligaNacional" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ligaNacional">Liga Nacional Masculina</TabsTrigger>
            <TabsTrigger value="ligaFeminina">Liga Nacional Feminina</TabsTrigger>
            <TabsTrigger value="juvenis">Campeonato Juvenil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ligaNacional" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Liga Nacional Masculina 2023/24</CardTitle>
                  <Badge variant="outline">Jornada 18/20</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ClassificationTable data={ligaNacional} category="ligaNacional" />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-sm font-medium text-green-700">Playoffs (1º-4º)</div>
                    <div className="text-xs text-green-600">Qualificação para Final Four</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-sm font-medium text-blue-700">Zona Segura (5º-8º)</div>
                    <div className="text-xs text-blue-600">Permanência garantida</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <div className="text-sm font-medium text-red-700">Descida (9º-12º)</div>
                    <div className="text-xs text-red-600">Risco de despromoção</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ligaFeminina" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Liga Nacional Feminina 2023/24</CardTitle>
                  <Badge variant="outline">Jornada 16/18</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ClassificationTable data={ligaFeminina} category="ligaFeminina" />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-sm font-medium text-green-700">Playoffs (1º-4º)</div>
                    <div className="text-xs text-green-600">Qualificação para Final Four</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-sm font-medium text-blue-700">Liga Regular (5º-10º)</div>
                    <div className="text-xs text-blue-600">Época terminada</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="juvenis" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Campeonato Nacional Juvenil Sub-18</CardTitle>
                  <Badge variant="outline">Jornada 14/16</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ClassificationTable data={juvenis} category="juvenis" />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-sm font-medium text-yellow-700">Pódio (1º-3º)</div>
                    <div className="text-xs text-yellow-600">Medalhas e troféus</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-700">Participantes (4º-8º)</div>
                    <div className="text-xs text-gray-600">Experiência competitiva</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ClassificacoesPage;
