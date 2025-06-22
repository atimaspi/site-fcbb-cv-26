
import FCBBLayout from '@/components/layout/FCBBLayout';
import ModernSlider from '@/components/ModernSlider';
import SobreSection from '@/components/sections/SobreSection';
import NoticiasSection from '@/components/sections/NoticiasSection';
import GaleriaSection from '@/components/sections/GaleriaSection';
import ContactoSection from '@/components/sections/ContactoSection';
import PartnersSection from '@/components/PartnersSection';
import GameResults from '@/components/GameResults';
import GameCalendar from '@/components/GameCalendar';
import EnhancedStatsSection from '@/components/EnhancedStatsSection';

const Index = () => {
  return (
    <FCBBLayout 
      title="FCBB - Federação Cabo-verdiana de Basquetebol" 
      description="Site oficial da Federação Cabo-verdiana de Basquetebol. Acompanhe as últimas notícias, resultados, classificações e competições do basquetebol cabo-verdiano."
      keywords="FCBB, basquetebol, Cabo Verde, federação, liga nacional, competições, resultados"
    >
      {/* Hero Section */}
      <section className="relative">
        <ModernSlider />
      </section>

      {/* Estatísticas Melhoradas */}
      <section className="bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow py-16">
        <EnhancedStatsSection />
      </section>

      {/* Resultados de Jogos */}
      <section className="bg-white py-16">
        <div className="cv-container">
          <GameResults />
        </div>
      </section>

      {/* Calendário de Jogos */}
      <section className="bg-gray-50 py-16">
        <div className="cv-container">
          <GameCalendar />
        </div>
      </section>

      {/* Sobre Section */}
      <section className="bg-white py-16">
        <SobreSection />
      </section>

      {/* Notícias Section */}
      <section className="bg-gradient-to-br from-blue-50 to-red-50 py-16">
        <NoticiasSection />
      </section>

      {/* Parceiros Section */}
      <section className="bg-white py-16">
        <PartnersSection />
      </section>

      {/* Galeria Section */}
      <section className="bg-gray-50 py-16">
        <GaleriaSection />
      </section>

      {/* Contacto Section */}
      <section className="bg-gradient-to-r from-cv-blue to-cv-red py-16 text-white">
        <ContactoSection />
      </section>
    </FCBBLayout>
  );
};

export default Index;
