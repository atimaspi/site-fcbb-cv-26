
import CompactHeader from '@/components/CompactHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FibaStyleHero from '@/components/FibaStyleHero';
import FibaStyleNews from '@/components/FibaStyleNews';
import FibaStyleLiveResults from '@/components/FibaStyleLiveResults';
import PremiumStatsSection from '@/components/PremiumStatsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import TeamsSection from '@/components/TeamsSection';
import PartnersSection from '@/components/PartnersSection';
import InteractiveFloatingButtons from '@/components/InteractiveFloatingButtons';

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
          <FibaStyleHero />
          <FibaStyleLiveResults />
          <FibaStyleNews />
          <PremiumStatsSection />
          <CompetitionsSection />
          <TeamsSection />
          <PartnersSection />
        </main>
        <Footer />
        <InteractiveFloatingButtons />
      </div>
    </>
  );
};

export default Index;
