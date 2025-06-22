
import SEO from '@/components/SEO';
import ModernSlider from '@/components/ModernSlider';
import SobreSection from '@/components/sections/SobreSection';
import NoticiasSection from '@/components/sections/NoticiasSection';
import GaleriaSection from '@/components/sections/GaleriaSection';
import ContactoSection from '@/components/sections/ContactoSection';
import PartnersSection from '@/components/PartnersSection';
import InteractiveFloatingButtons from '@/components/InteractiveFloatingButtons';
import StickyNavigation from '@/components/StickyNavigation';
import Footer from '@/components/Footer';
import GameResults from '@/components/GameResults';
import GameCalendar from '@/components/GameCalendar';
import EnhancedStatsSection from '@/components/EnhancedStatsSection';

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
        <StickyNavigation />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section id="hero">
            <ModernSlider />
          </section>

          {/* Estatísticas Melhoradas */}
          <EnhancedStatsSection />

          {/* Resultados de Jogos */}
          <GameResults />

          {/* Calendário de Jogos */}
          <GameCalendar />

          {/* Sobre Section */}
          <SobreSection />

          {/* Notícias Section */}
          <NoticiasSection />

          {/* Parceiros Section */}
          <PartnersSection />

          {/* Galeria Section */}
          <GaleriaSection />

          {/* Contacto Section */}
          <ContactoSection />
        </main>

        <Footer />
        <InteractiveFloatingButtons />
      </div>
    </>
  );
};

export default Index;
