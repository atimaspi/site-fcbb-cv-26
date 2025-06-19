import EnhancedHero from '@/components/EnhancedHero';
import ModernNewsSection from '@/components/ModernNewsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import TeamsSection from '@/components/TeamsSection';
import UpcomingGames from '@/components/UpcomingGames';
import PartnersSection from '@/components/PartnersSection';
import PerformanceDashboard from '@/components/PerformanceDashboard';
import EnhancedFooter from '@/components/EnhancedFooter';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { Suspense, lazy } from 'react';
import CriticalCSS from '@/components/CriticalCSS';
import InteractiveCard from '@/components/InteractiveCard';

// Lazy load non-critical components
const FeaturedVideos = lazy(() => import('@/components/FeaturedVideos'));
const LiveResultsWidget = lazy(() => import('@/components/LiveResultsWidget'));

const Index = () => {
  const {
    newsData,
    competitionsData,
    teamsData,
    gamesData,
    isLoading
  } = useOptimizedDataFetching();

  const highlightCards = [
    {
      title: "Seleção Nacional",
      description: "Acompanhe a jornada da nossa seleção nacional masculina e feminina nas competições internacionais.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      buttonText: "Ver Seleções"
    },
    {
      title: "Liga Nacional 2024/25",
      description: "A mais emocionante temporada da Liga Nacional com 12 equipas a lutar pelo título.",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      buttonText: "Ver Classificações"
    },
    {
      title: "Programas de Formação",
      description: "Desenvolvendo jovens talentos em todas as ilhas através de programas inovadores.",
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      buttonText: "Saber Mais"
    }
  ];

  return (
    <>
      <CriticalCSS />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Enhanced Hero Section */}
        <EnhancedHero />
        
        {/* Highlights Section */}
        <section className="py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="cv-container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Destaques FCBB</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Descubra o melhor do basquetebol cabo-verdiano
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlightCards.map((card, index) => (
                <InteractiveCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  buttonText={card.buttonText}
                  variant="glass"
                  className="floating-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Modern News Section */}
        <ModernNewsSection />
        
        {/* Other sections with spacing */}
        <div className="space-y-16">
          <UpcomingGames />
          <CompetitionsSection />
          <TeamsSection />
          
          {/* Lazy-loaded components */}
          <Suspense fallback={
            <div className="cv-container">
              <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl glass-card"></div>
            </div>
          }>
            <LiveResultsWidget />
          </Suspense>
          
          <Suspense fallback={
            <div className="cv-container">
              <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl glass-card"></div>
            </div>
          }>
            <FeaturedVideos />
          </Suspense>
          
          <PartnersSection />
        </div>
        
        {/* Performance monitoring (dev only) */}
        <PerformanceDashboard />
      </div>
      
      {/* Enhanced Footer */}
      <EnhancedFooter />
    </>
  );
};

export default Index;
