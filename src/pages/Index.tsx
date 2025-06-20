
import CompactHeader from '@/components/CompactHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ModernHeroSection from '@/components/ModernHeroSection';
import InteractiveStatsCards from '@/components/InteractiveStatsCards';
import NewsSection from '@/components/NewsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import TeamsSection from '@/components/TeamsSection';
import UpcomingGames from '@/components/UpcomingGames';
import PartnersSection from '@/components/PartnersSection';

const Index = () => {
  return (
    <>
      <SEO 
        title="FCBB - Federação Cabo-verdiana de Basquetebol" 
        description="Site oficial da Federação Cabo-verdiana de Basquetebol. Acompanhe as últimas notícias, resultados, classificações e competições do basquetebol cabo-verdiano."
        keywords="FCBB, basquetebol, Cabo Verde, federação, liga nacional, competições, resultados"
        url="/"
      />
      <div className="min-h-screen flex flex-col">
        <CompactHeader />
        <main className="flex-grow">
          <ModernHeroSection />
          <InteractiveStatsCards />
          <NewsSection />
          <UpcomingGames />
          <CompetitionsSection />
          <TeamsSection />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
