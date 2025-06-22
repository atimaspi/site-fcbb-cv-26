
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
        
        {/* Adicionar espaçamento para compensar o menu fixo */}
        <div className="pt-20">
          <main className="flex-grow">
            {/* Hero Section */}
            <section id="hero">
              <ModernSlider />
            </section>

            {/* Estatísticas Melhoradas */}
            <section id="estatisticas">
              <EnhancedStatsSection />
            </section>

            {/* Resultados de Jogos */}
            <section id="resultados">
              <GameResults />
            </section>

            {/* Calendário de Jogos */}
            <section id="calendario">
              <GameCalendar />
            </section>

            {/* Sobre Section */}
            <section id="sobre">
              <SobreSection />
            </section>

            {/* Notícias Section */}
            <section id="noticias">
              <NoticiasSection />
            </section>

            {/* Parceiros Section */}
            <section id="parceiros">
              <PartnersSection />
            </section>

            {/* Galeria Section */}
            <section id="galeria">
              <GaleriaSection />
            </section>

            {/* Contacto Section */}
            <section id="contacto">
              <ContactoSection />
            </section>
          </main>
        </div>

        <Footer />
        <InteractiveFloatingButtons />
      </div>
    </>
  );
};

export default Index;
