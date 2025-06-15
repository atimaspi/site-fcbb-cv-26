
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Função otimizada de inicialização com performance
const init = () => {
  // Otimizar viewport para performance mobile
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
  }
  
  // Adicionar meta para performance
  const head = document.head;
  
  // DNS prefetch para recursos externos
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = '//images.unsplash.com';
  head.appendChild(dnsPrefetch);
  
  // Preconnect para recursos críticos
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = '//fonts.googleapis.com';
  head.appendChild(preconnect);
  
  // Resource hints para melhor performance
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.href = '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png';
  preload.as = 'image';
  head.appendChild(preload);
  
  // Inicializar aplicação React com configuração otimizada
  const container = document.getElementById("root");
  if (!container) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(container, {
    // Configurações para melhor performance
    identifierPrefix: 'fcbb-'
  });
  
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

// Inicialização otimizada baseada no estado do DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM já carregado, inicializar imediatamente
  init();
}

// Service Worker para cache (futuro)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Ignorar erros de SW em desenvolvimento
    });
  });
}
