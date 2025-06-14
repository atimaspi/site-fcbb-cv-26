
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Função otimizada de inicialização
const init = () => {
  // Otimizar viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5');
  }
  
  // Iniciar aplicação React
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

// Inicialização imediata para melhor performance
init();
