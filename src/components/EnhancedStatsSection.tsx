
import { motion, useInView } from 'framer-motion';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { useContentData } from '@/hooks/useContentData';
import { useRef } from 'react';
import { StatCard } from './stats/StatCard';
import { ProgressSection } from './stats/ProgressSection';
import { createStatsData } from './stats/StatsData';

const EnhancedStatsSection = () => {
  const { clubsData, gamesData, teamsData, isLoading } = useOptimizedDataFetching();
  const { statisticsData } = useContentData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calcular estatísticas em tempo real
  const stats = {
    totalClubs: clubsData?.length || 24,
    totalGames: gamesData?.length || 180,
    totalTeams: teamsData?.length || 48,
    activePlayers: 1250,
    completedGames: gamesData?.filter(game => game.status === 'completed')?.length || 120,
    liveGames: gamesData?.filter(game => game.status === 'live' || game.status === 'in_progress')?.length || 0
  };

  const statsData = createStatsData(statisticsData, stats);

  if (isLoading) {
    return (
      <div className="fcbb-section bg-gray-50">
        <div className="fcbb-container">
          <div className="fcbb-grid fcbb-grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-40 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-cv-blue mb-6">
            O Basquetebol Cabo-verdiano em Números
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Acompanhe o crescimento e desenvolvimento do nosso desporto favorito 
            através das estatísticas mais relevantes do panorama nacional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>

        <ProgressSection isInView={isInView} stats={stats} />
      </div>
    </section>
  );
};

export default EnhancedStatsSection;
