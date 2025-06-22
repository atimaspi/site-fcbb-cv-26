
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Calendar, Target, TrendingUp, Star } from 'lucide-react';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { useContentData } from '@/hooks/useContentData';
import { motion } from 'framer-motion';

const EnhancedStatsSection = () => {
  const { clubsData, gamesData, teamsData, isLoading } = useOptimizedDataFetching();
  const { statisticsData } = useContentData();

  // Calcular estatísticas em tempo real
  const stats = {
    totalClubs: clubsData?.length || 24,
    totalGames: gamesData?.length || 180,
    totalTeams: teamsData?.length || 48,
    activePlayers: 1250, // Pode vir de uma tabela específica
    completedGames: gamesData?.filter(game => game.status === 'completed')?.length || 120,
    liveGames: gamesData?.filter(game => game.status === 'live' || game.status === 'in_progress')?.length || 2
  };

  // Usar estatísticas do backend se disponíveis, senão usar as padrão
  const statsData = statisticsData?.length > 0 ? statisticsData.map(stat => {
    const iconMap: { [key: string]: any } = {
      'trophy': Trophy,
      'users': Users,
      'calendar': Calendar,
      'target': Target,
      'trending-up': TrendingUp,
      'star': Star
    };

    return {
      title: stat.stat_name,
      value: stat.stat_value,
      icon: iconMap[stat.icon_name] || Trophy,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: stat.description || ""
    };
  }) : [
    {
      title: "Clubes Licenciados",
      value: stats.totalClubs.toString(),
      icon: Trophy,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+3 este ano"
    },
    {
      title: "Atletas Federados",
      value: "1,250+",
      icon: Users,
      color: "text-green-600", 
      bgColor: "bg-green-100",
      change: "+12% vs ano anterior"
    },
    {
      title: "Jogos por Época",
      value: stats.totalGames.toString() + "+",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: `${stats.completedGames} concluídos`
    },
    {
      title: "Equipas Ativas",
      value: stats.totalTeams.toString(),
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "Masculinas e Femininas"
    },
    {
      title: "Jogos ao Vivo",
      value: stats.liveGames.toString(),
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-100",
      change: stats.liveGames > 0 ? "Agora mesmo" : "Próximos em breve"
    },
    {
      title: "Ilhas Participantes",
      value: "9",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "Todo o arquipélago"
    }
  ];

  if (isLoading) {
    return (
      <div className="fcbb-section bg-gray-50">
        <div className="fcbb-container">
          <div className="fcbb-grid fcbb-grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="fcbb-section bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="fcbb-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="fcbb-title text-4xl mb-4">
            O Basquetebol Cabo-verdiano em Números
          </h2>
          <p className="fcbb-subtitle max-w-3xl mx-auto">
            Acompanhe o crescimento e desenvolvimento do nosso desporto favorito 
            através das estatísticas mais relevantes
          </p>
        </motion.div>

        <div className="fcbb-grid fcbb-grid-3">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="fcbb-card h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600`}>
                      {stat.change}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Seção adicional com progressos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="fcbb-card bg-gradient-to-r from-cv-primary to-cv-accent text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Época 2024/25</h3>
                  <p className="opacity-90">
                    {Math.round((stats.completedGames / stats.totalGames) * 100)}% Completa
                  </p>
                  <div className="mt-3 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-cv-secondary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(stats.completedGames / stats.totalGames) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Participação</h3>
                  <p className="opacity-90">
                    Crescimento de 12% em atletas federados
                  </p>
                  <div className="mt-3 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-cv-secondary h-2 rounded-full transition-all duration-1000"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Cobertura</h3>
                  <p className="opacity-90">
                    Presente em todas as 9 ilhas de Cabo Verde
                  </p>
                  <div className="mt-3 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-cv-secondary h-2 rounded-full transition-all duration-1000"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedStatsSection;
