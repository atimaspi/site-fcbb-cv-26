
import PageLayout from '../PageLayout';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Trophy, Filter } from 'lucide-react';

const CalendarioPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('maio');
  const [selectedCompetition, setSelectedCompetition] = useState('todos');

  const jogosCalendario = [
    {
      id: 1,
      data: '25/05/2025',
      hora: '18:00',
      competicao: 'Liga Nacional Masculina',
      jornada: 'Jornada 15',
      equipaCasa: 'ABC Basquete',
      equipaFora: 'Sporting CP',
      pavilhao: 'Pavilhão Municipal',
      cidade: 'Praia',
      status: 'agendado'
    },
    {
      id: 2,
      data: '26/05/2025',
      hora: '20:00',
      competicao: 'Liga Nacional Feminina',
      jornada: 'Jornada 12',
      equipaCasa: 'Five Stars Feminino',
      equipaFora: 'Unidos Feminino',
      pavilhao: 'Pavilhão Vavá Duarte',
      cidade: 'Praia',
      status: 'agendado'
    },
    {
      id: 3,
      data: '27/05/2025',
      hora: '19:30',
      competicao: 'Taça de Cabo Verde',
      jornada: 'Quartos de Final',
      equipaCasa: 'Benfica',
      equipaFora: 'FC Porto',
      pavilhao: 'Pavilhão Central',
      cidade: 'Mindelo',
      status: 'agendado'
    },
    {
      id: 4,
      data: '28/05/2025',
      hora: '17:00',
      competicao: 'Liga Nacional Masculina',
      jornada: 'Jornada 15',
      equipaCasa: 'CD Travadores',
      equipaFora: 'Académica',
      pavilhao: 'Pavilhão Desportivo',
      cidade: 'Santa Catarina',
      status: 'agendado'
    }
  ];

  const competicoes = [
    'Liga Nacional Masculina',
    'Liga Nacional Feminina', 
    'Taça de Cabo Verde',
    'Campeonatos Regionais'
  ];

  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const filteredJogos = selectedCompetition === 'todos' 
    ? jogosCalendario 
    : jogosCalendario.filter(jogo => jogo.competicao === selectedCompetition);

  return (
    <PageLayout title="Calendário de Competições">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Filter className="mr-2 h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Competição</label>
                <select 
                  value={selectedCompetition}
                  onChange={(e) => setSelectedCompetition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="todos">Todas as Competições</option>
                  {competicoes.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mês</label>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {meses.map(mes => (
                    <option key={mes} value={mes}>
                      {mes.charAt(0).toUpperCase() + mes.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="lista" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lista">Lista de Jogos</TabsTrigger>
            <TabsTrigger value="calendario">Vista Calendário</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lista" className="space-y-4">
            {filteredJogos.map((jogo) => (
              <Card key={jogo.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-cv-blue text-white">{jogo.competicao}</Badge>
                        <Badge variant="outline">{jogo.jornada}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 items-center gap-4 mb-3">
                        <div className="text-right">
                          <p className="font-bold text-lg">{jogo.equipaCasa}</p>
                        </div>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-gray-400">VS</span>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg">{jogo.equipaFora}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {jogo.data}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {jogo.hora}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {jogo.pavilhao}, {jogo.cidade}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {jogo.status.charAt(0).toUpperCase() + jogo.status.slice(1)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="calendario">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Vista de Calendário
                  </h3>
                  <p className="text-gray-500">
                    A vista de calendário estará disponível em breve.
                    Por enquanto, utilize a lista de jogos acima.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Trophy className="mr-2 h-5 w-5" />
              Próximos Destaques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-cv-blue to-cv-red text-white p-4 rounded-lg">
                <h4 className="font-bold">Final da Taça</h4>
                <p className="text-sm">30 de Junho • Pavilhão Nacional</p>
              </div>
              <div className="bg-gradient-to-r from-cv-red to-cv-yellow text-white p-4 rounded-lg">
                <h4 className="font-bold">Playoffs Liga Masculina</h4>
                <p className="text-sm">Início em 15 de Junho</p>
              </div>
              <div className="bg-gradient-to-r from-cv-yellow to-cv-blue text-white p-4 rounded-lg">
                <h4 className="font-bold">Liga Feminina</h4>
                <p className="text-sm">Final prevista para 20 de Junho</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CalendarioPage;
