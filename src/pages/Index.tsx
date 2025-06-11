
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import TeamsSection from '@/components/TeamsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import LiveResultsWidget from '@/components/LiveResultsWidget';
import FeaturedVideos from '@/components/FeaturedVideos';
import UpcomingGames from '@/components/UpcomingGames';
import SEO from '@/components/SEO';
import ResponsiveContainer from '@/components/ui/responsive-container';
import SmoothTransition from '@/components/ui/smooth-transition';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users, TrendingUp, Clock } from 'lucide-react';

const Index = () => {
  const liveGames = [
    {
      id: 1,
      homeTeam: "CD Travadores",
      awayTeam: "Sporting CV",
      homeScore: 78,
      awayScore: 82,
      quarter: "4º Q",
      time: "02:34",
      status: "live"
    },
    {
      id: 2,
      homeTeam: "Académica Porto Novo",
      awayTeam: "CS Mindelense",
      homeScore: 65,
      awayScore: 71,
      quarter: "3º Q",
      time: "05:12",
      status: "live"
    }
  ];

  const upcomingGames = [
    {
      id: 1,
      homeTeam: "Barreirense",
      awayTeam: "ABC Basket",
      date: "2025-06-10",
      time: "19:00",
      venue: "Pavilhão Adão Silvestre",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      homeTeam: "GDRC Oliveirense",
      awayTeam: "Juventude Furna",
      date: "2025-06-11",
      time: "20:30",
      venue: "Pavilhão Municipal",
      competition: "Liga Nacional"
    }
  ];

  const recentResults = [
    {
      id: 1,
      homeTeam: "Unitec Assomada",
      awayTeam: "Sal Rei BC",
      homeScore: 89,
      awayScore: 76,
      date: "2025-06-08",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      homeTeam: "Five Stars",
      awayTeam: "Praia BC",
      homeScore: 72,
      awayScore: 85,
      date: "2025-06-07",
      competition: "Liga Nacional"
    }
  ];

  const quickStats = [
    { label: "Clubes Afiliados", value: "156", icon: <Users className="w-6 h-6" /> },
    { label: "Atletas Registados", value: "2,847", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Competições Ativas", value: "8", icon: <Trophy className="w-6 h-6" /> },
    { label: "Ilhas Representadas", value: "10", icon: <MapPin className="w-6 h-6" /> }
  ];

  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main>
          <Hero />
          
          {/* Quick Stats */}
          <section className="py-8 bg-white border-b">
            <ResponsiveContainer maxWidth="xl" padding="md">
              <SmoothTransition direction="fade" duration={0.4}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickStats.map((stat, index) => (
                    <Card key={index} className="text-center border-t-4 border-cv-blue hover-scale">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center mb-2 text-cv-blue">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-cv-blue">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SmoothTransition>
            </ResponsiveContainer>
          </section>
          
          {/* Main content grid */}
          <ResponsiveContainer maxWidth="xl" padding="md" className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content column */}
              <div className="lg:col-span-2 space-y-8">
                <SmoothTransition direction="left" duration={0.5}>
                  <NewsSection />
                </SmoothTransition>
                
                {/* Resultados ao Vivo */}
                <SmoothTransition direction="up" duration={0.4}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-cv-blue">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Jogos ao Vivo</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {liveGames.map((game) => (
                          <div key={game.id} className="p-4 border rounded-lg bg-gradient-to-r from-red-50 to-white hover-scale">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">{game.homeTeam}</span>
                                  <span className="text-xl font-bold">{game.homeScore}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{game.awayTeam}</span>
                                  <span className="text-xl font-bold">{game.awayScore}</span>
                                </div>
                              </div>
                              <div className="text-center ml-4">
                                <Badge variant="destructive" className="mb-1">{game.quarter}</Badge>
                                <div className="text-sm font-mono">{game.time}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </SmoothTransition>

                <SmoothTransition direction="right" duration={0.5}>
                  <FeaturedVideos />
                </SmoothTransition>
                
                <SmoothTransition direction="up" duration={0.4}>
                  <CompetitionsSection />
                </SmoothTransition>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <SmoothTransition direction="right" duration={0.3}>
                  <LiveResultsWidget />
                </SmoothTransition>
                
                {/* Próximos Jogos */}
                <SmoothTransition direction="right" duration={0.4}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-cv-blue">
                        <Calendar className="w-5 h-5" />
                        <span>Próximos Jogos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingGames.map((game) => (
                          <div key={game.id} className="p-3 border rounded-lg hover:bg-gray-50 hover-scale">
                            <div className="text-sm text-gray-600 mb-1">{game.competition}</div>
                            <div className="font-medium text-sm mb-1">
                              {game.homeTeam} vs {game.awayTeam}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 space-x-2">
                              <Clock className="w-3 h-3" />
                              <span>{game.date} às {game.time}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{game.venue}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </SmoothTransition>

                {/* Resultados Recentes */}
                <SmoothTransition direction="right" duration={0.5}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-cv-blue">
                        <Trophy className="w-5 h-5" />
                        <span>Resultados Recentes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentResults.map((result) => (
                          <div key={result.id} className="p-3 border rounded-lg hover-scale">
                            <div className="text-xs text-gray-500 mb-1">{result.competition} - {result.date}</div>
                            <div className="flex justify-between items-center">
                              <div className="text-sm">
                                <div>{result.homeTeam}</div>
                                <div>{result.awayTeam}</div>
                              </div>
                              <div className="text-right font-bold">
                                <div className={result.homeScore > result.awayScore ? "text-green-600" : ""}>{result.homeScore}</div>
                                <div className={result.awayScore > result.homeScore ? "text-green-600" : ""}>{result.awayScore}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </SmoothTransition>

                <SmoothTransition direction="right" duration={0.6}>
                  <TeamsSection />
                </SmoothTransition>
              </div>
            </div>
          </ResponsiveContainer>
          
          <SmoothTransition direction="up" duration={0.4}>
            <PartnersSection />
          </SmoothTransition>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
