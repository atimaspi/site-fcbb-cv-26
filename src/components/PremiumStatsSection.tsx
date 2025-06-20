
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Target, TrendingUp, Award, MapPin, Zap, Star, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

const PremiumStatsSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const stats = [
    {
      icon: Trophy,
      title: "Competições Ativas",
      value: 5,
      displayValue: "5",
      description: "Liga Nacional, Taça CV, Regionais",
      trend: "+2 vs ano anterior",
      color: "from-cv-blue to-blue-600",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-300/50",
      glowColor: "shadow-blue-500/30"
    },
    {
      icon: Users,
      title: "Jogadores Federados",
      value: 240,
      displayValue: "240+",
      description: "Em todas as categorias",
      trend: "+15% este ano",
      color: "from-cv-red to-red-600",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-300/50",
      glowColor: "shadow-red-500/30"
    },
    {
      icon: MapPin,
      title: "Ilhas Representadas",
      value: 9,
      displayValue: "9",
      description: "Cobertura nacional completa",
      trend: "100% das ilhas",
      color: "from-cv-yellow to-yellow-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-300/50",
      glowColor: "shadow-yellow-500/30"
    },
    {
      icon: Calendar,
      title: "Jogos esta Época",
      value: 180,
      displayValue: "180+",
      description: "Todas as competições",
      trend: "+20 jogos vs 2022/23",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-300/50",
      glowColor: "shadow-green-500/30"
    },
    {
      icon: Award,
      title: "Árbitros Certificados",
      value: 45,
      displayValue: "45",
      description: "Níveis regional e nacional",
      trend: "+8 novos este ano",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-300/50",
      glowColor: "shadow-purple-500/30"
    },
    {
      icon: Zap,
      title: "Média de Pontos",
      value: 85.2,
      displayValue: "85.2",
      description: "Por jogo na Liga Nacional",
      trend: "+3.5 vs época passada",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-300/50",
      glowColor: "shadow-orange-500/30"
    }
  ];

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => prev.map((count, index) => {
        const target = stats[index].value;
        if (count < target) {
          return Math.min(count + Math.ceil(target / 50), target);
        }
        return count;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cv-blue/5 to-cv-red/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cv-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cv-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="cv-container relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-cv-blue to-cv-red text-white border-none px-6 py-2 text-base">
            <Star className="mr-2 h-4 w-4" />
            Estatísticas Premium 2023/24
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-6">
            Basquetebol em Números
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Acompanhe o crescimento extraordinário do basquetebol cabo-verdiano com dados em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`
                group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2
                bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20
                ${activeCard === index ? `scale-105 -translate-y-2 ${stat.glowColor} shadow-2xl` : ''}
                hover:${stat.glowColor} hover:shadow-2xl hover:border-white/40
              `}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-white text-lg group-hover:text-gray-100 transition-colors">
                    {stat.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {index < counters.length ? (
                        typeof stat.value === 'number' && stat.value > 10 ? 
                        counters[index] : stat.displayValue
                      ) : stat.displayValue}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                  
                  <Badge 
                    variant="outline" 
                    className="text-xs border-green-400/50 text-green-400 bg-green-400/10"
                  >
                    {stat.trend}
                  </Badge>
                </div>

                {activeCard === index && (
                  <div className="mt-6 pt-6 border-t border-white/20 animate-fade-in">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Atualizado em tempo real
                      </span>
                      <span>●</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Enhanced */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cv-blue/20 to-cv-red/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <Target className="h-6 w-6 text-cv-yellow" />
            <span className="text-lg font-semibold text-white">
              Dados atualizados a cada 5 minutos
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumStatsSection;
