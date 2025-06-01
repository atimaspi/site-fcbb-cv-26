
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Users, Trophy, MapPin, Calendar } from 'lucide-react';

const ClubesPage = () => {
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [fromClub, setFromClub] = useState('');
  const [toClub, setToClub] = useState('');
  const [transferType, setTransferType] = useState('definitiva');

  const clubs = [
    { 
      id: 1, 
      name: 'ABC Basquete', 
      region: 'Santiago', 
      founded: 1985, 
      players: 15, 
      titles: 3,
      contact: 'abc@basquete.cv'
    },
    { 
      id: 2, 
      name: 'CD Travadores', 
      region: 'São Vicente', 
      founded: 1978, 
      players: 14, 
      titles: 5,
      contact: 'travadores@clube.cv'
    },
    { 
      id: 3, 
      name: 'Sporting Clube da Praia', 
      region: 'Santiago', 
      founded: 1923, 
      players: 16, 
      titles: 8,
      contact: 'sporting@praia.cv'
    },
    { 
      id: 4, 
      name: 'FC Porto CV', 
      region: 'São Vicente', 
      founded: 1995, 
      players: 13, 
      titles: 2,
      contact: 'porto@cv.pt'
    },
  ];

  const recentTransfers = [
    { id: 1, player: 'João Silva', from: 'ABC Basquete', to: 'Sporting CP', type: 'Definitiva', date: '15/05/2025' },
    { id: 2, player: 'Carlos Santos', from: 'FC Porto', to: 'CD Travadores', type: 'Empréstimo', date: '12/05/2025' },
    { id: 3, player: 'Pedro Gomes', from: 'Benfica', to: 'ABC Basquete', type: 'Definitiva', date: '08/05/2025' },
  ];

  const topPlayers = [
    { rank: 1, player: 'Miguel Costa', club: 'ABC Basquete', position: 'Base', age: 25, points: 18.5 },
    { rank: 2, player: 'André Pereira', club: 'Sporting CP', position: 'Extremo', age: 23, points: 16.8 },
    { rank: 3, player: 'Bruno Tavares', club: 'CD Travadores', position: 'Poste', age: 28, points: 15.2 },
    { rank: 4, player: 'Rui Martins', club: 'FC Porto', position: 'Ala', age: 26, points: 14.7 },
    { rank: 5, player: 'Tiago Sousa', club: 'Benfica', position: 'Pivot', age: 29, points: 13.9 },
  ];

  const handleSubmitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transfer submitted:', { playerName, fromClub, toClub, transferType });
    setShowTransferDialog(false);
    // Reset form
    setPlayerName('');
    setFromClub('');
    setToClub('');
    setTransferType('definitiva');
    alert('Transferência registada com sucesso!');
  };

  return (
    <PageLayout title="Clubes e Atletas">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clubes Filiados</CardTitle>
            <Trophy className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">16</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atletas Registados</CardTitle>
            <Users className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">240</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferências</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">12</div>
            <p className="text-xs text-gray-600">Este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regiões</CardTitle>
            <MapPin className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">10</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clubes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clubes">Clubes</TabsTrigger>
          <TabsTrigger value="atletas">Atletas</TabsTrigger>
          <TabsTrigger value="transferencias">Transferências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clubes" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Clubes Filiados</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Região</TableHead>
                  <TableHead className="text-center">Fundado</TableHead>
                  <TableHead className="text-center">Jogadores</TableHead>
                  <TableHead className="text-center">Títulos</TableHead>
                  <TableHead>Contacto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell className="font-medium">{club.name}</TableCell>
                    <TableCell>{club.region}</TableCell>
                    <TableCell className="text-center">{club.founded}</TableCell>
                    <TableCell className="text-center">{club.players}</TableCell>
                    <TableCell className="text-center">{club.titles}</TableCell>
                    <TableCell>{club.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="atletas" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Top Atletas</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Clube</TableHead>
                  <TableHead>Posição</TableHead>
                  <TableHead className="text-center">Idade</TableHead>
                  <TableHead className="text-center">PPJ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell className="font-medium">{player.player}</TableCell>
                    <TableCell>{player.club}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell className="text-center">{player.age}</TableCell>
                    <TableCell className="text-center font-bold">{player.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="transferencias" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-cv-blue">Transferências Recentes</h3>
              <Button 
                className="bg-cv-blue hover:bg-blue-700"
                onClick={() => setShowTransferDialog(true)}
              >
                Registar Transferência
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jogador</TableHead>
                  <TableHead>De</TableHead>
                  <TableHead>Para</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.player}</TableCell>
                    <TableCell>{transfer.from}</TableCell>
                    <TableCell>{transfer.to}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transfer.type === 'Definitiva' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transfer.type}
                      </span>
                    </TableCell>
                    <TableCell>{transfer.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Registar Transferência</DialogTitle>
            <DialogDescription>
              Preencha os dados da transferência do jogador.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitTransfer}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="playerName" className="text-sm font-medium">
                  Nome do Jogador
                </label>
                <input
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="fromClub" className="text-sm font-medium">
                    Clube de Origem
                  </label>
                  <input
                    id="fromClub"
                    value={fromClub}
                    onChange={(e) => setFromClub(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="toClub" className="text-sm font-medium">
                    Clube de Destino
                  </label>
                  <input
                    id="toClub"
                    value={toClub}
                    onChange={(e) => setToClub(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="transferType" className="text-sm font-medium">
                  Tipo de Transferência
                </label>
                <select
                  id="transferType"
                  value={transferType}
                  onChange={(e) => setTransferType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="definitiva">Definitiva</option>
                  <option value="emprestimo">Empréstimo</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-cv-blue">Registar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ClubesPage;
