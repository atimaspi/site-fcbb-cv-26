
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Federation routes */}
          <Route path="/federacao/historia" element={<HistoriaPage />} />
          <Route path="/federacao/missao-visao" element={<MissaoVisaoPage />} />
          <Route path="/federacao/direcao" element={<DirecaoPage />} />
          <Route path="/federacao/orgaos-sociais" element={<OrgaosSociaisPage />} />
          <Route path="/federacao/estatutos" element={<EstatutosPage />} />
          <Route path="/federacao/contactos" element={<ContactosPage />} />
          
          {/* Competitions routes */}
          <Route path="/competicoes/liga-nacional" element={<LigaNacionalPage />} />
          <Route path="/competicoes/nacional-masculino" element={<NacionalMasculinoPage />} />
          <Route path="/competicoes/taca-de-cabo-verde" element={<TacaPage />} />
          <Route path="/competicoes/super-taca" element={<SuperTacaPage />} />
          <Route path="/competicoes/competicoes-regionais" element={<CompeticoesRegionaisPage />} />
          <Route path="/competicoes/calendario" element={<CalendarioPage />} />
          <Route path="/competicoes/classificacoes" element={<ClassificacoesPage />} />
          <Route path="/competicoes/resultados" element={<ResultadosPage />} />
          
          {/* Teams routes */}
          <Route path="/selecoes/masculina" element={<SelecaoMasculinaPage />} />
          <Route path="/selecoes/feminina" element={<SelecaoFemininaPage />} />
          <Route path="/selecoes/jovens" element={<SelecoesJovensPage />} />
          
          {/* New feature routes */}
          <Route path="/estatisticas" element={<EstatisticasPage />} />
          <Route path="/arbitragem" element={<ArbitragemPage />} />
          <Route path="/clubes" element={<ClubesPage />} />
          <Route path="/formacao" element={<FormacaoPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/transmissoes" element={<TransmissoesPage />} />
          <Route path="/transferencias" element={<TransferenciasPage />} />
          
          {/* FIBA LiveStats route */}
          <Route path="/resultados/fiba-livestats" element={<FibaLiveStatsPage />} />
          
          {/* Multimedia routes */}
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/imprensa" element={<ImprensaPage />} />
          
          {/* Main routes */}
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/area-reservada" element={<AreaReservadaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
