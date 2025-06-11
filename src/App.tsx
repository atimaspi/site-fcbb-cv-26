
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/smooth-transition";
import ResponsiveContainer from "@/components/ui/responsive-container";

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NoticiasPage from "./pages/NoticiasPage";
import GaleriaPage from "./pages/GaleriaPage";
import ContactoPage from "./pages/ContactoPage";
import AreaReservadaPage from "./pages/AreaReservadaPage";
import VideosPage from "./pages/VideosPage";
import ImprensaPage from "./pages/ImprensaPage";
import CalendarioPage from "./pages/competitions/CalendarioPage";
import TransferenciasPage from "./pages/TransferenciasPage";
import FibaLiveStatsPage from "./pages/FibaLiveStatsPage";
import ResultadosAoVivoPage from "./pages/ResultadosAoVivoPage";

// Federation pages
import MissaoVisaoPage from "./pages/federation/MissaoVisaoPage";
import DirecaoPage from "./pages/federation/DirecaoPage";
import HistoriaPage from "./pages/federation/HistoriaPage";
import OrgaosSociaisPage from "./pages/federation/OrgaosSociaisPage";
import EstatutosPage from "./pages/federation/EstatutosPage";
import ContactosPage from "./pages/federation/ContactosPage";

// Competitions pages
import LigaNacionalPage from "./pages/competitions/LigaNacionalPage";
import TacaPage from "./pages/competitions/TacaPage";
import SuperTacaPage from "./pages/competitions/SuperTacaPage";
import CompeticoesRegionaisPage from "./pages/competitions/CompeticoesRegionaisPage";
import NacionalMasculinoPage from "./pages/competitions/NacionalMasculinoPage";

// Teams pages
import SelecaoMasculinaPage from "./pages/teams/SelecaoMasculinaPage";
import SelecaoFemininaPage from "./pages/teams/SelecaoFemininaPage";
import SelecoesJovensPage from "./pages/teams/SelecoesJovensPage";

// New feature pages
import ClassificacoesPage from "./pages/ClassificacoesPage";
import EstatisticasPage from "./pages/EstatisticasPage";
import ResultadosPage from "./pages/ResultadosPage";
import ArbitragemPage from "./pages/ArbitragemPage";
import ClubesPage from "./pages/ClubesPage";
import FormacaoPage from "./pages/FormacaoPage";
import EventosPage from "./pages/EventosPage";
import TransmissoesPage from "./pages/TransmissoesPage";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        
        {/* Federation routes - Both /federacao and /sobre paths */}
        <Route path="/federacao/historia" element={<PageTransition><HistoriaPage /></PageTransition>} />
        <Route path="/federacao/missao-visao" element={<PageTransition><MissaoVisaoPage /></PageTransition>} />
        <Route path="/federacao/direcao" element={<PageTransition><DirecaoPage /></PageTransition>} />
        <Route path="/federacao/orgaos-sociais" element={<PageTransition><OrgaosSociaisPage /></PageTransition>} />
        <Route path="/federacao/estatutos" element={<PageTransition><EstatutosPage /></PageTransition>} />
        <Route path="/federacao/contactos" element={<PageTransition><ContactosPage /></PageTransition>} />
        
        {/* Sobre a FCBB routes (alternative paths) */}
        <Route path="/sobre/historia" element={<PageTransition><HistoriaPage /></PageTransition>} />
        <Route path="/sobre/missao-visao" element={<PageTransition><MissaoVisaoPage /></PageTransition>} />
        <Route path="/sobre/direcao" element={<PageTransition><DirecaoPage /></PageTransition>} />
        <Route path="/sobre/orgaos-sociais" element={<PageTransition><OrgaosSociaisPage /></PageTransition>} />
        <Route path="/sobre/estatutos" element={<PageTransition><EstatutosPage /></PageTransition>} />
        <Route path="/sobre/contactos" element={<PageTransition><ContactosPage /></PageTransition>} />
        
        {/* Competitions routes - All paths covered */}
        <Route path="/competicoes/liga-nacional" element={<PageTransition><LigaNacionalPage /></PageTransition>} />
        <Route path="/competicoes/nacional-masculino" element={<PageTransition><NacionalMasculinoPage /></PageTransition>} />
        <Route path="/competicoes/taca-de-cabo-verde" element={<PageTransition><TacaPage /></PageTransition>} />
        <Route path="/competicoes/taca-cabo-verde" element={<PageTransition><TacaPage /></PageTransition>} />
        <Route path="/competicoes/super-taca" element={<PageTransition><SuperTacaPage /></PageTransition>} />
        <Route path="/competicoes/competicoes-regionais" element={<PageTransition><CompeticoesRegionaisPage /></PageTransition>} />
        <Route path="/competicoes/calendario" element={<PageTransition><CalendarioPage /></PageTransition>} />
        <Route path="/competicoes/classificacoes" element={<PageTransition><ClassificacoesPage /></PageTransition>} />
        <Route path="/competicoes/resultados" element={<PageTransition><ResultadosPage /></PageTransition>} />
        
        {/* Teams routes - All variations covered */}
        <Route path="/selecoes/masculina" element={<PageTransition><SelecaoMasculinaPage /></PageTransition>} />
        <Route path="/selecoes/senior-masculina" element={<PageTransition><SelecaoMasculinaPage /></PageTransition>} />
        <Route path="/selecoes/feminina" element={<PageTransition><SelecaoFemininaPage /></PageTransition>} />
        <Route path="/selecoes/senior-feminina" element={<PageTransition><SelecaoFemininaPage /></PageTransition>} />
        <Route path="/selecoes/jovens" element={<PageTransition><SelecoesJovensPage /></PageTransition>} />
        <Route path="/selecoes/sub-18-masculina" element={<PageTransition><SelecoesJovensPage /></PageTransition>} />
        <Route path="/selecoes/sub-18-feminina" element={<PageTransition><SelecoesJovensPage /></PageTransition>} />
        <Route path="/selecoes/sub-16-masculina" element={<PageTransition><SelecoesJovensPage /></PageTransition>} />
        <Route path="/selecoes/sub-16-feminina" element={<PageTransition><SelecoesJovensPage /></PageTransition>} />
        
        {/* Additional feature routes */}
        <Route path="/estatisticas" element={<PageTransition><EstatisticasPage /></PageTransition>} />
        <Route path="/arbitragem" element={<PageTransition><ArbitragemPage /></PageTransition>} />
        <Route path="/clubes" element={<PageTransition><ClubesPage /></PageTransition>} />
        <Route path="/formacao" element={<PageTransition><FormacaoPage /></PageTransition>} />
        <Route path="/eventos" element={<PageTransition><EventosPage /></PageTransition>} />
        <Route path="/transmissoes" element={<PageTransition><TransmissoesPage /></PageTransition>} />
        <Route path="/transferencias" element={<PageTransition><TransferenciasPage /></PageTransition>} />
        
        {/* Results and live data routes - All paths covered */}
        <Route path="/resultados" element={<PageTransition><ResultadosPage /></PageTransition>} />
        <Route path="/resultados/ao-vivo" element={<PageTransition><ResultadosAoVivoPage /></PageTransition>} />
        <Route path="/resultados/fiba-livestats" element={<PageTransition><FibaLiveStatsPage /></PageTransition>} />
        <Route path="/resultados/liga-nacional" element={<PageTransition><ResultadosPage /></PageTransition>} />
        <Route path="/resultados/taca-cabo-verde" element={<PageTransition><ResultadosPage /></PageTransition>} />
        
        {/* Multimedia routes */}
        <Route path="/videos" element={<PageTransition><VideosPage /></PageTransition>} />
        <Route path="/imprensa" element={<PageTransition><ImprensaPage /></PageTransition>} />
        <Route path="/media/videos" element={<PageTransition><VideosPage /></PageTransition>} />
        <Route path="/media/imprensa" element={<PageTransition><ImprensaPage /></PageTransition>} />
        
        {/* Main routes */}
        <Route path="/noticias" element={<PageTransition><NoticiasPage /></PageTransition>} />
        <Route path="/galeria" element={<PageTransition><GaleriaPage /></PageTransition>} />
        <Route path="/area-reservada" element={<PageTransition><AreaReservadaPage /></PageTransition>} />
        <Route path="/contacto" element={<PageTransition><ContactoPage /></PageTransition>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <ResponsiveContainer maxWidth="full" padding="none">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </ResponsiveContainer>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
