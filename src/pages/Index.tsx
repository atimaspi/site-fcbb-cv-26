
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
import { useSupabaseData } from '@/hooks/useSupabaseData';

const Index = () => {
  // Conectar com todos os dados do Supabase
  const { 
    newsData, 
    clubsData, 
    gamesData, 
    competitionsData,
    teamsData,
    statsData,
    playersData,
    refereesData,
    eventsData,
    federationsData,
    regionalAssociationsData,
    partnersData,
    heroSlidesData,
    galleryData,
    galleryImagesData,
    siteSettingsData,
    isLoading 
  } = useSupabaseData();

  console.log('Index page - Conectado com todos os dados do Supabase:', {
    news: newsData?.length || 0,
    clubs: clubsData?.length || 0,
    games: gamesData?.length || 0,
    competitions: competitionsData?.length || 0,
    teams: teamsData?.length || 0,
    stats: statsData?.length || 0,
    players: playersData?.length || 0,
    referees: refereesData?.length || 0,
    events: eventsData?.length || 0,
    federations: federationsData?.length || 0,
    regionalAssociations: regionalAssociationsData?.length || 0,
    partners: partnersData?.length || 0,
    heroSlides: heroSlidesData?.length || 0,
    gallery: galleryData?.length || 0,
    galleryImages: galleryImagesData?.length || 0,
    siteSettings: siteSettingsData?.length || 0,
    loading: isLoading
  });

  return (
    <FCBBLayout 
      title="FCBB - Federação Cabo-verdiana de Basquetebol" 
      description="Site oficial da Federação Cabo-verdiana de Basquetebol. Acompanhe as últimas notícias, resultados, classificações e competições do basquetebol cabo-verdiano."
      keywords="FCBB, basquetebol, Cabo Verde, federação, liga nacional, competições, resultados"
    >
      {/* Hero Section com slides dinâmicos */}
      <section className="relative">
        <ModernSlider heroSlides={heroSlidesData} />
      </section>

      {/* Estatísticas Melhoradas - dados dinâmicos do backend */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-16">
        <EnhancedStatsSection 
          statistics={statsData}
          clubs={clubsData}
          players={playersData}
          competitions={competitionsData}
        />
      </section>

      {/* Resultados de Jogos - dados dinâmicos */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50/40 py-16">
        <div className="cv-container">
          <GameResults 
            games={gamesData}
            teams={teamsData}
            competitions={competitionsData}
          />
        </div>
      </section>

      {/* Calendário de Jogos - dados dinâmicos */}
      <section className="bg-gradient-to-br from-gray-100 to-red-50/40 py-16">
        <div className="cv-container">
          <GameCalendar 
            games={gamesData}
            teams={teamsData}
            competitions={competitionsData}
          />
        </div>
      </section>

      {/* Sobre Section - dados dinâmicos das configurações */}
      <section className="bg-gradient-to-br from-yellow-50 to-amber-50/60 py-16">
        <SobreSection 
          federations={federationsData}
          settings={siteSettingsData}
        />
      </section>

      {/* Notícias Section - dados dinâmicos */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-red-50/40 py-16">
        <NoticiasSection 
          news={newsData}
          events={eventsData}
        />
      </section>

      {/* Parceiros Section - dados dinâmicos */}
      <section className="bg-gradient-to-br from-gray-50 to-slate-100/60 py-16">
        <PartnersSection 
          partners={partnersData}
        />
      </section>

      {/* Galeria Section - dados dinâmicos */}
      <section className="bg-gradient-to-br from-orange-50/60 to-yellow-50/80 py-16">
        <GaleriaSection 
          gallery={galleryData}
          galleryImages={galleryImagesData}
        />
      </section>

      {/* Contacto Section - dados dinâmicos das configurações */}
      <section className="bg-gradient-to-r from-cv-blue to-cv-red py-16 text-white">
        <ContactoSection 
          settings={siteSettingsData}
          federations={federationsData}
        />
      </section>
    </FCBBLayout>
  );
};

export default Index;
