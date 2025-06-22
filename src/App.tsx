
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import CriticalCSS from '@/components/CriticalCSS';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NoticiasPage from "./pages/NoticiasPage";
import ClassificacoesPage from "./pages/ClassificacoesPage";
import ResultadosPage from "./pages/ResultadosPage";
import ClubesPage from "./pages/ClubesPage";
import ContactoPage from "./pages/ContactoPage";
import CompeticoesPage from "./pages/CompeticoesPage";
import SelecoesPage from "./pages/SelecoesPage";
import ArbitragemPage from "./pages/ArbitragemPage";
import FormacaoPage from "./pages/FormacaoPage";
import ImprensaPage from "./pages/ImprensaPage";
import MultimediaPage from "./pages/MultimediaPage";
import GaleriaPage from "./pages/GaleriaPage";
import VideosPage from "./pages/VideosPage";
import TransmissoesPage from "./pages/TransmissoesPage";
import EventosPage from "./pages/EventosPage";
import EstatisticasPage from "./pages/EstatisticasPage";
import TransferenciasPage from "./pages/TransferenciasPage";
import FibaLiveStatsPage from "./pages/FibaLiveStatsPage";
import ResultadosAoVivoPage from "./pages/ResultadosAoVivoPage";
import AreaReservadaPage from "./pages/AreaReservadaPage";
import ClubesCompletePage from "./pages/ClubesCompletePage";
import SobreFCBBPage from "./pages/SobreFCBBPage";

// Federation pages
import HistoriaPage from "./pages/federation/HistoriaPage";
import MissaoVisaoPage from "./pages/federation/MissaoVisaoPage";
import DirecaoPage from "./pages/sobre/DirecaoPage";
import OrgaosSociaisPage from "./pages/sobre/OrgaosSociaisPage";
import EstatutosPage from "./pages/sobre/EstatutosPage";
import ContactosPage from "./pages/federation/ContactosPage";

// Competition pages
import LigaNacionalPage from "./pages/competitions/LigaNacionalPage";
import TacaPage from "./pages/competitions/TacaPage";
import SuperTacaPage from "./pages/competitions/SuperTacaPage";
import CalendarioPage from "./pages/competitions/CalendarioPage";
import NacionalMasculinoPage from "./pages/competitions/NacionalMasculinoPage";
import CompeticoesRegionaisPage from "./pages/competitions/CompeticoesRegionaisPage";
import ClassificacoesRegionaisPage from "./pages/competitions/ClassificacoesRegionaisPage";

// Team pages
import SelecaoMasculinaPage from "./pages/teams/SelecaoMasculinaPage";
import SelecaoFemininaPage from "./pages/teams/SelecaoFemininaPage";
import SelecoesJovensPage from "./pages/teams/SelecoesJovensPage";

// About pages  
import HistoriaSobrePage from "./pages/sobre/HistoriaPage";
import MissaoVisaoSobrePage from "./pages/sobre/MissaoVisaoPage";

// Components
import InteractiveFloatingButtons from "./components/InteractiveFloatingButtons";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <CriticalCSS />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/noticias" element={<NoticiasPage />} />
                <Route path="/classificacoes" element={<ClassificacoesPage />} />
                <Route path="/resultados" element={<ResultadosPage />} />
                <Route path="/clubes" element={<ClubesPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/competicoes" element={<CompeticoesPage />} />
                <Route path="/selecoes" element={<SelecoesPage />} />
                <Route path="/arbitragem" element={<ArbitragemPage />} />
                <Route path="/formacao" element={<FormacaoPage />} />
                <Route path="/imprensa" element={<ImprensaPage />} />
                <Route path="/multimedia" element={<MultimediaPage />} />
                <Route path="/galeria" element={<GaleriaPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/transmissoes" element={<TransmissoesPage />} />
                <Route path="/eventos" element={<EventosPage />} />
                <Route path="/estatisticas" element={<EstatisticasPage />} />
                <Route path="/transferencias" element={<TransferenciasPage />} />
                <Route path="/resultados/fiba-livestats" element={<FibaLiveStatsPage />} />
                <Route path="/resultados/ao-vivo" element={<ResultadosAoVivoPage />} />
                <Route path="/area-reservada" element={<AreaReservadaPage />} />
                <Route path="/clubes/completo" element={<ClubesCompletePage />} />
                <Route path="/sobre-fcbb" element={<SobreFCBBPage />} />
                
                {/* Federation routes */}
                <Route path="/federacao/historia" element={<HistoriaPage />} />
                <Route path="/federacao/missao-visao" element={<MissaoVisaoPage />} />
                <Route path="/federacao/direcao" element={<DirecaoPage />} />
                <Route path="/federacao/orgaos-sociais" element={<OrgaosSociaisPage />} />
                <Route path="/federacao/estatutos" element={<EstatutosPage />} />
                <Route path="/federacao/contactos" element={<ContactosPage />} />
                
                {/* Competition routes */}
                <Route path="/competicoes/liga-nacional" element={<LigaNacionalPage />} />
                <Route path="/competicoes/taca" element={<TacaPage />} />
                <Route path="/competicoes/super-taca" element={<SuperTacaPage />} />
                <Route path="/competicoes/calendario" element={<CalendarioPage />} />
                <Route path="/competicoes/nacional-masculino" element={<NacionalMasculinoPage />} />
                <Route path="/competicoes/regionais" element={<CompeticoesRegionaisPage />} />
                <Route path="/competicoes/classificacoes-regionais" element={<ClassificacoesRegionaisPage />} />
                
                {/* Team routes */}
                <Route path="/selecoes/masculina" element={<SelecaoMasculinaPage />} />
                <Route path="/selecoes/feminina" element={<SelecaoFemininaPage />} />
                <Route path="/selecoes/jovens" element={<SelecoesJovensPage />} />
                
                {/* About FCBB routes */}
                <Route path="/sobre/historia" element={<HistoriaSobrePage />} />
                <Route path="/sobre/missao-visao" element={<MissaoVisaoSobrePage />} />
                <Route path="/sobre/direcao" element={<DirecaoPage />} />
                <Route path="/sobre/orgaos-sociais" element={<OrgaosSociaisPage />} />
                <Route path="/sobre/estatutos" element={<EstatutosPage />} />
                <Route path="/sobre/contactos" element={<ContactosPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <InteractiveFloatingButtons />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
