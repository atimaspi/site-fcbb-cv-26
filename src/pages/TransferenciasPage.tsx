
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  ArrowRightLeft, 
  Search,
  Download,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const TransferenciasPage = () => {
  const [selectedSeason, setSelectedSeason] = useState('2024-25');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const transferencias = [
    {
      id: 1,
      jogador: 'Miguel Costa',
      posicao: 'Base',
      idade: 25,
      clubeOrigem: 'ABC Basquete',
      clubeDestino: 'Sporting CP',
      tipo: 'Definitiva',
      valor: '€15.000',
      data: '15/01/2025',
      status: 'Concluída',
      nacionalidade: 'Cabo Verde',
      temporada: '2024-25'
    },
    {
      id: 2,
      jogador: 'Carlos Santos',
      posicao: 'Ala',
      idade: 23,
      clubeOrigem: 'FC Porto CV',
      clubeDestino: 'CD Travadores',
      tipo: 'Empréstimo',
      valor: '€8.000',
      data: '12/01/2025',
      status: 'Pendente',
      nacionalidade: 'Cabo Verde',
      temporada: '2024-25'
    },
    {
      id: 3,
      jogador: 'André Silva',
      posicao: 'Pivot',
      idade: 28,
      clubeOrigem: 'Benfica CV',
      clubeDestino: 'Five Stars',
      tipo: 'Definitiva',
      valor: '€22.000',
      data: '08/01/2025',
      status: 'Rejeitada',
      nacionalidade: 'Portugal',
      temporada: '2024-25'
    },
    {
      id: 4,
      jogador: 'Pedro Gomes',
      posicao: 'Extremo',
      idade: 26,
      clubeOrigem: 'Internacional',
      clubeDestino: 'ABC Basquete',
      tipo: 'Livre',
      valor: 'Livre',
      data: '05/01/2025',
      status: 'Em Análise',
      nacionalidade: 'Cabo Verde',
      temporada: '2024-25'
    }
  ];

  const janelaTransferencias = [
    {
      periodo: 'Janela de Inverno',
      inicio: '01/01/2025',
      fim: '31/01/2025',
      status: 'Ativa',
      transferenciasRealizadas: 8
    },
    {
      periodo: 'Janela de Verão',
      inicio: '01/07/2025',
      fim: '31/08/2025',
      status: 'Futura',
      transferenciasRealizadas: 0
    }
  ];

  const estatisticasTransferencias = {
    totalTransferencias: 24,
    transferenciasAtivas: 3,
    valorTotal: '€185.000',
    clubeMaisAtivo: 'ABC Basquete'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluída': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Rejeitada': return 'bg-red-100 text-red-800';
      case 'Em Análise': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluída': return <CheckCircle className="h-4 w-4" />;
      case 'Pendente': return <Clock className="h-4 w-4" />;
      case 'Rejeitada': return <AlertCircle className="h-4 w-4" />;
      case 'Em Análise': return <Search className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredTransferencias = transferencias.filter(transfer => {
    const matchesSearch = transfer.jogador.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.clubeOrigem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.clubeDestino.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || transfer.status === selectedStatus;
    const matchesSeason = transfer.temporada === selectedSeason;
    
    return matchesSearch && matchesStatus && matchesSeason;
  });

  const exportTransfers = () => {
    const dataStr = JSON.stringify(filteredTransferencias, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transferencias-${selectedSeason}.json`;
    link.click();
  };

  return (
    <PageLayout title="Centro de Transferências">
      <div className="space-y-6">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transferências</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-cv-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cv-blue">{estatisticasTransferencias.totalTransferencias}</div>
              <p className="text-xs text-gray-600">Temporada 2024-25</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transferências Ativas</CardTitle>
              <Clock className="h-4 w-4 text-cv-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cv-blue">{estatisticasTransferencias.transferenciasAtivas}</div>
              <p className="text-xs text-gray-600">Em processo</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-cv-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cv-blue">{estatisticasTransferencias.valorTotal}</div>
              <p className="text-xs text-gray-600">Mercado atual</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clube Mais Ativo</CardTitle>
              <Users className="h-4 w-4 text-cv-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-cv-blue">{estatisticasTransferencias.clubeMaisAtivo}</div>
              <p className="text-xs text-gray-600">5 transferências</p>
            </CardContent>
          </Card>
        </div>

        {/* Janelas de Transferência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Calendar className="mr-2 h-5 w-5" />
              Janelas de Transferência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {janelaTransferencias.map((janela, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{janela.periodo}</h4>
                    <Badge className={janela.status === 'Ativa' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                      {janela.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {janela.inicio} - {janela.fim}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{janela.transferenciasRealizadas}</span> transferências realizadas
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filtros e Controlos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-cv-blue">
              <div className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filtros e Pesquisa
              </div>
              <Button variant="outline" size="sm" onClick={exportTransfers}>
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Temporada</label>
                <select 
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="2024-25">2024-25</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2022-23">2022-23</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Rejeitada">Rejeitada</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Pesquisar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar jogador ou clube..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Transferências */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <ArrowRightLeft className="mr-2 h-5 w-5" />
              Registro de Transferências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jogador</TableHead>
                  <TableHead>Posição</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransferencias.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transfer.jogador}</p>
                        <p className="text-sm text-gray-600">{transfer.idade} anos • {transfer.nacionalidade}</p>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.posicao}</TableCell>
                    <TableCell>{transfer.clubeOrigem}</TableCell>
                    <TableCell>{transfer.clubeDestino}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transfer.tipo}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{transfer.valor}</TableCell>
                    <TableCell>{transfer.data}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transfer.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(transfer.status)}
                          {transfer.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle>Detalhes da Transferência</DialogTitle>
                            <DialogDescription>
                              Informações completas sobre a transferência de {transfer.jogador}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Jogador</label>
                                <p className="font-medium">{transfer.jogador}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Posição</label>
                                <p className="font-medium">{transfer.posicao}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Clube de Origem</label>
                                <p className="font-medium">{transfer.clubeOrigem}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Clube de Destino</label>
                                <p className="font-medium">{transfer.clubeDestino}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Tipo</label>
                                <p className="font-medium">{transfer.tipo}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Valor</label>
                                <p className="font-medium">{transfer.valor}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Data</label>
                                <p className="font-medium">{transfer.data}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <Badge className={getStatusColor(transfer.status)}>
                                  {transfer.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TransferenciasPage;
