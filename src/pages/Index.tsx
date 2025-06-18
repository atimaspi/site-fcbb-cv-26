
import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import TeamsSection from '@/components/TeamsSection';
import UpcomingGames from '@/components/UpcomingGames';
import PartnersSection from '@/components/PartnersSection';
import PerformanceDashboard from '@/components/PerformanceDashboard';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { Suspense, lazy } from 'react';
import CriticalCSS from '@/components/CriticalCSS';

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

  return (
    <>
      <CriticalCSS />
      <div className="min-h-screen bg-white">
        {/* Critical above-the-fold content */}
        <Hero />
        
        {/* High-priority content */}
        <NewsSection data={newsData} loading={isLoading} />
        
        {/* Secondary content */}
        <div className="space-y-12 md:space-y-16">
          <UpcomingGames data={gamesData} loading={isLoading} />
          <CompetitionsSection data={competitionsData} loading={isLoading} />
          <TeamsSection data={teamsData} loading={isLoading} />
          
          {/* Lazy-loaded components */}
          <Suspense fallback={
            <div className="cv-container">
              <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            </div>
          }>
            <LiveResultsWidget />
          </Suspense>
          
          <Suspense fallback={
            <div className="cv-container">
              <div className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
            </div>
          }>
            <FeaturedVideos />
          </Suspense>
          
          <PartnersSection />
        </div>
        
        {/* Performance monitoring (dev only) */}
        <PerformanceDashboard />
      </div>
    </>
  );
};

export default Index;
