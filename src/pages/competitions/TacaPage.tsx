import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Users, Download, Play } from 'lucide-react';

const TacaPage = () => {
  const currentBracket = [
    { round: "Oitavos de Final", date: "15-20 Jul 2024", matches: [
      { team1: "ABC Basquete", team2: "Boavista FC", score1: 89, score2: 76, status: "finished" },
      { team1: "Sporting CP", team2: "Vitória SC", score1: 95, score2: 78, status: "finished" },
      { team1: "CD Travadores", team2: "Académica", score1: null, score2: null, status: "scheduled", date: "18 Jul 19:00" },
      { team1: "FC Porto CV", team2: "Benfica CV", score1: null, score2: null, status: "scheduled", date: "19 Jul 20:00" }
    ]},
    { round: "Quartos de Final", date: "25-27 Jul 2024", matches: [
      { team1: "ABC Basquete", team2: "Sporting CP", score1: null, score2: null, status: "pending" },
      { team1: "TBD", team2: "TBD", score1: null, score2: null, status: "pending" }
    ]}
  ];

  const historicWinners = [
    { year: 2024, winner: "ABC Basquete", runner: "Sporting CP", score: "89-76" },
    { year: 2023, winner: "Seven Stars", runner: "ABC Basquete", score: "92-88" },
    { year: 2022, winner: "Académica", runner: "CD Travadores", score: "78-74" },
    { year: 2021, winner: "Inter Clube", runner: "Five Stars", score: "85-79" },
    { year: 2020, winner: "ABC Basquete", runner: "Sporting CP", score: "91-84" },
    { year: 2019, winner: "CD Travadores", runner: "Académica", score: "87-82" }
  ];

  const statistics = [
    { label: "Edições Realizadas", value: "47", icon: Trophy },
    { label: "Equipas Participantes", value: "16", icon: Users },
    { label: "Jogos Realizados", value: "156", icon: Calendar }
  ];

  return (
    <PageLayout title="Taça de Cabo Verde">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-cv-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-cv-blue mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Competition Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Sobre a Competição</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              A Taça de Cabo Verde é a mais prestigiada competição eliminatória de basquetebol do país, 
              disputada anualmente desde 1977. Esta competição reúne as melhores equipas de todas as ilhas, 
              proporcionando emocionantes confrontos em formato de eliminação direta.
            </p>
            <p>
              O formato atual inclui 16 equipas que se enfrentam desde os oitavos de final até à grande final, 
              tradicionalmente disputada no Pavilhão Nacional em Praia.
            </p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bracket" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bracket">Quadro Competitivo</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="rules">Regulamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bracket" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Taça de Cabo Verde 2024</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Quadro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {currentBracket.map((round, roundIndex) => (
                    <div key={roundIndex}>
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-lg font-semibold">{round.round}</h3>
                        <Badge variant="outline">{round.date}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {round.matches.map((match, matchIndex) => (
                          <Card key={matchIndex} className="border">
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{match.team1}</span>
                                  {match.status === 'finished' && (
                                    <span className="text-xl font-bold text-cv-blue">{match.score1}</span>
                                  )}
                                </div>
                                <div className="text-center text-sm text-gray-500">VS</div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{match.team2}</span>
                                  {match.status === 'finished' && (
                                    <span className="text-xl font-bold text-cv-blue">{match.score2}</span>
                                  )}
                                </div>
                                
                                {match.status === 'scheduled' && (
                                  <div className="mt-3 pt-3 border-t">
                                    <div className="text-sm text-gray-600 text-center">{match.date}</div>
                                    <Button size="sm" className="w-full mt-2 bg-red-500 hover:bg-red-600">
                                      <Play className="h-4 w-4 mr-2" />
                                      Ver em Direto
                                    </Button>
                                  </div>
                                )}
                                
                                {match.status === 'pending' && (
                                  <div className="mt-3 pt-3 border-t text-center text-sm text-gray-500">
                                    Aguarda apuramento
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Vencedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicWinners.map((winner, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-cv-blue">{winner.year}</div>
                        <div>
                          <div className="font-semibold flex items-center">
                            <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                            {winner.winner}
                          </div>
                          <div className="text-sm text-gray-600">vs {winner.runner}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cv-blue">{winner.score}</div>
                        <div className="text-xs text-gray-500">Resultado Final</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulamento da Competição</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h4>Formato da Competição</h4>
                <ul>
                  <li>Competição eliminatória com 16 equipas participantes</li>
                  <li>Jogos a eliminar desde os oitavos de final</li>
                  <li>Em caso de empate no final do tempo regulamentar, joga-se prolongamento</li>
                  <li>Não há terceiro e quarto lugar</li>
                </ul>
                
                <h4>Critérios de Apuramento</h4>
                <ul>
                  <li>8 melhores classificados da Liga Nacional</li>
                  <li>6 vencedores das competições regionais</li>
                  <li>2 vagas para equipas convidadas pela FCBB</li>
                </ul>
                
                <h4>Calendário</h4>
                <ul>
                  <li>Oitavos de Final: Julho</li>
                  <li>Quartos de Final: Julho/Agosto</li>
                  <li>Meias-Finais: Agosto</li>
                  <li>Final: Setembro</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TacaPage;
