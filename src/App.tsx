
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/smooth-transition";
import ResponsiveContainer from "@/components/ui/responsive-container";
import CriticalCSS from "@/components/CriticalCSS";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NoticiasPage = lazy(() => import("./pages/NoticiasPage"));
const GaleriaPage = lazy(() => import("./pages/GaleriaPage"));
const ContactoPage = lazy(() => import("./pages/ContactoPage"));
const AreaReservadaPage = lazy(() => import("./pages/AreaReservadaPage"));
const VideosPage = lazy(() => import("./pages/VideosPage"));
const ImprensaPage = lazy(() => import("./pages/ImprensaPage"));
const CalendarioPage = lazy(() => import("./pages/competitions/CalendarioPage"));
const TransferenciasPage = lazy(() => import("./pages/TransferenciasPage"));
const FibaLiveStatsPage = lazy(() => import("./pages/FibaLiveStatsPage"));
const ResultadosAoVivoPage = lazy(() => import("./pages/ResultadosAoVivoPage"));

// Main pages
const SobreFCBBPage = lazy(() => import("./pages/SobreFCBBPage"));
const CompeticoesPage = lazy(() => import("./pages/CompeticoesPage"));
const SelecoesPage = lazy(() => import("./pages/SelecoesPage"));
const ClubesCompletePage = lazy(() => import("./pages/ClubesCompletePage"));
const MultimediaPage = lazy(() => import("./pages/MultimediaPage"));

// Federation pages
const MissaoVisaoPage = lazy(() => import("./pages/federation/MissaoVisaoPage"));
const DirecaoPage = lazy(() => import("./pages/federation/DirecaoPage"));
const HistoriaPage = lazy(() => import("./pages/federation/HistoriaPage"));
const OrgaosSociaisPage = lazy(() => import("./pages/federation/OrgaosSociaisPage"));
const EstatutosPage = lazy(() => import("./pages/federation/EstatutosPage"));
const ContactosPage = lazy(() => import("./pages/federation/ContactosPage"));

// Competitions pages
const LigaNacionalPage = lazy(() => import("./pages/competitions/LigaNacionalPage"));
const TacaPage = lazy(() => import("./pages/competitions/TacaPage"));
const SuperTacaPage = lazy(() => import("./pages/competitions/SuperTacaPage"));
const CompeticoesRegionaisPage = lazy(() => import("./pages/competitions/CompeticoesRegionaisPage"));
const NacionalMasculinoPage = lazy(() => import("./pages/competitions/NacionalMasculinoPage"));

// Teams pages
const SelecaoMasculinaPage = lazy(() => import("./pages/teams/SelecaoMasculinaPage"));
const SelecaoFemininaPage = lazy(() => import("./pages/teams/SelecaoFemininaPage"));
const SelecoesJovensPage = lazy(() => import("./pages/teams/SelecoesJovensPage"));

// Feature pages
const ClassificacoesPage = lazy(() => import("./pages/ClassificacoesPage"));
const EstatisticasPage = lazy(() => import("./pages/EstatisticasPage"));
const ResultadosPage = lazy(() => import("./pages/ResultadosPage"));
const ArbitragemPage = lazy(() => import("./pages/ArbitragemPage"));
const ClubesPage = lazy(() => import("./pages/ClubesPage"));
const FormacaoPage = lazy(() => import("./pages/FormacaoPage"));
const EventosPage = lazy(() => import("./pages/EventosPage"));
const TransmissoesPage = lazy(() => import("./pages/TransmissoesPage"));

// Otimizar QueryClient para melhor performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: (failureCount, error) => {
        // Não fazer retry em erros 4xx
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false, // Evitar refetches desnecessários
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Wrapper para Suspense com PageTransition
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>
    <PageTransition>{children}</PageTransition>
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SuspenseWrapper><Index /></SuspenseWrapper>} />
        
        {/* Main navigation routes */}
        <Route path="/sobre" element={<SuspenseWrapper><SobreFCBBPage /></SuspenseWrapper>} />
        <Route path="/competicoes" element={<SuspenseWrapper><CompeticoesPage /></SuspenseWrapper>} />
        <Route path="/selecoes" element={<SuspenseWrapper><SelecoesPage /></SuspenseWrapper>} />
        <Route path="/clubes" element={<SuspenseWrapper><ClubesCompletePage /></SuspenseWrapper>} />
        <Route path="/multimedia" element={<SuspenseWrapper><MultimediaPage /></SuspenseWrapper>} />
        
        {/* Federation routes */}
        <Route path="/federacao/historia" element={<SuspenseWrapper><HistoriaPage /></SuspenseWrapper>} />
        <Route path="/federacao/missao-visao" element={<SuspenseWrapper><MissaoVisaoPage /></SuspenseWrapper>} />
        <Route path="/federacao/direcao" element={<SuspenseWrapper><DirecaoPage /></SuspenseWrapper>} />
        <Route path="/federacao/orgaos-sociais" element={<SuspenseWrapper><OrgaosSociaisPage /></SuspenseWrapper>} />
        <Route path="/federacao/estatutos" element={<SuspenseWrapper><EstatutosPage /></SuspenseWrapper>} />
        <Route path="/federacao/contactos" element={<SuspenseWrapper><ContactosPage /></SuspenseWrapper>} />
        
        {/* Sobre a FCBB routes */}
        <Route path="/sobre/historia" element={<SuspenseWrapper><HistoriaPage /></SuspenseWrapper>} />
        <Route path="/sobre/missao-visao" element={<SuspenseWrapper><MissaoVisaoPage /></SuspenseWrapper>} />
        <Route path="/sobre/direcao" element={<SuspenseWrapper><DirecaoPage /></SuspenseWrapper>} />
        <Route path="/sobre/orgaos-sociais" element={<SuspenseWrapper><OrgaosSociaisPage /></SuspenseWrapper>} />
        <Route path="/sobre/estatutos" element={<SuspenseWrapper><EstatutosPage /></SuspenseWrapper>} />
        <Route path="/sobre/contactos" element={<SuspenseWrapper><ContactosPage /></SuspenseWrapper>} />
        
        {/* Competitions routes */}
        <Route path="/competicoes/liga-nacional" element={<SuspenseWrapper><LigaNacionalPage /></SuspenseWrapper>} />
        <Route path="/competicoes/nacional-masculino" element={<SuspenseWrapper><NacionalMasculinoPage /></SuspenseWrapper>} />
        <Route path="/competicoes/taca-de-cabo-verde" element={<SuspenseWrapper><TacaPage /></SuspenseWrapper>} />
        <Route path="/competicoes/taca-cabo-verde" element={<SuspenseWrapper><TacaPage /></SuspenseWrapper>} />
        <Route path="/competicoes/super-taca" element={<SuspenseWrapper><SuperTacaPage /></SuspenseWrapper>} />
        <Route path="/competicoes/competicoes-regionais" element={<SuspenseWrapper><CompeticoesRegionaisPage /></SuspenseWrapper>} />
        <Route path="/competicoes/calendario" element={<SuspenseWrapper><CalendarioPage /></SuspenseWrapper>} />
        <Route path="/competicoes/classificacoes" element={<SuspenseWrapper><ClassificacoesPage /></SuspenseWrapper>} />
        <Route path="/competicoes/resultados" element={<SuspenseWrapper><ResultadosPage /></SuspenseWrapper>} />
        
        {/* Teams routes */}
        <Route path="/selecoes/masculina" element={<SuspenseWrapper><SelecaoMasculinaPage /></SuspenseWrapper>} />
        <Route path="/selecoes/senior-masculina" element={<SuspenseWrapper><SelecaoMasculinaPage /></SuspenseWrapper>} />
        <Route path="/selecoes/feminina" element={<SuspenseWrapper><SelecaoFemininaPage /></SuspenseWrapper>} />
        <Route path="/selecoes/senior-feminina" element={<SuspenseWrapper><SelecaoFemininaPage /></SuspenseWrapper>} />
        <Route path="/selecoes/jovens" element={<SuspenseWrapper><SelecoesJovensPage /></SuspenseWrapper>} />
        <Route path="/selecoes/sub-18-masculina" element={<SuspenseWrapper><SelecoesJovensPage /></SuspenseWrapper>} />
        <Route path="/selecoes/sub-18-feminina" element={<SuspenseWrapper><SelecoesJovensPage /></SuspenseWrapper>} />
        <Route path="/selecoes/sub-16-masculina" element={<SuspenseWrapper><SelecoesJovensPage /></SuspenseWrapper>} />
        <Route path="/selecoes/sub-16-feminina" element={<SuspenseWrapper><SelecoesJovensPage /></SuspenseWrapper>} />
        
        {/* Additional feature routes */}
        <Route path="/estatisticas" element={<SuspenseWrapper><EstatisticasPage /></SuspenseWrapper>} />
        <Route path="/arbitragem" element={<SuspenseWrapper><ArbitragemPage /></SuspenseWrapper>} />
        <Route path="/clubes-old" element={<SuspenseWrapper><ClubesPage /></SuspenseWrapper>} />
        <Route path="/formacao" element={<SuspenseWrapper><FormacaoPage /></SuspenseWrapper>} />
        <Route path="/eventos" element={<SuspenseWrapper><EventosPage /></SuspenseWrapper>} />
        <Route path="/transmissoes" element={<SuspenseWrapper><TransmissoesPage /></SuspenseWrapper>} />
        <Route path="/transferencias" element={<SuspenseWrapper><TransferenciasPage /></SuspenseWrapper>} />
        
        {/* Results and live data routes */}
        <Route path="/resultados" element={<SuspenseWrapper><ResultadosPage /></SuspenseWrapper>} />
        <Route path="/resultados/ao-vivo" element={<SuspenseWrapper><ResultadosAoVivoPage /></SuspenseWrapper>} />
        <Route path="/resultados/fiba-livestats" element={<SuspenseWrapper><FibaLiveStatsPage /></SuspenseWrapper>} />
        <Route path="/resultados/liga-nacional" element={<SuspenseWrapper><ResultadosPage /></SuspenseWrapper>} />
        <Route path="/resultados/taca-cabo-verde" element={<SuspenseWrapper><ResultadosPage /></SuspenseWrapper>} />
        
        {/* Multimedia routes */}
        <Route path="/videos" element={<SuspenseWrapper><VideosPage /></SuspenseWrapper>} />
        <Route path="/imprensa" element={<SuspenseWrapper><ImprensaPage /></SuspenseWrapper>} />
        <Route path="/media/videos" element={<SuspenseWrapper><VideosPage /></SuspenseWrapper>} />
        <Route path="/media/imprensa" element={<SuspenseWrapper><ImprensaPage /></SuspenseWrapper>} />
        
        {/* Main routes */}
        <Route path="/noticias" element={<SuspenseWrapper><NoticiasPage /></SuspenseWrapper>} />
        <Route path="/galeria" element={<SuspenseWrapper><GaleriaPage /></SuspenseWrapper>} />
        <Route path="/area-reservada" element={<SuspenseWrapper><AreaReservadaPage /></SuspenseWrapper>} />
        <Route path="/contacto" element={<SuspenseWrapper><ContactoPage /></SuspenseWrapper>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<SuspenseWrapper><NotFound /></SuspenseWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <>
    <CriticalCSS />
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
  </>
);

export default App;
