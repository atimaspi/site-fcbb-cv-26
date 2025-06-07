
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main>
        <Hero />
        
        {/* Main content grid */}
        <div className="cv-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content column */}
            <div className="lg:col-span-2 space-y-8">
              <NewsSection />
              <FeaturedVideos />
              <CompetitionsSection />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <LiveResultsWidget />
              <UpcomingGames />
              <TeamsSection />
            </div>
          </div>
        </div>
        
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
