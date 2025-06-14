
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload Inter font
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);

  // Preload critical images (first hero slide)
  const heroImage = new Image();
  heroImage.src = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&h=1080&q=75';
  
  // DNS prefetch for external resources
  const dnsPrefetch = [
    'https://images.unsplash.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  dnsPrefetch.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Optimize font loading
const optimizeFontLoading = () => {
  if ('fonts' in document) {
    // Use font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize performance optimizations
const initPerformanceOptimizations = () => {
  // Register service worker for caching (if available)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Could register SW here for offline caching
    });
  }
  
  // Optimize viewport for mobile
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5');
  }
  
  // Add performance hints
  const performanceHints = [
    { name: 'resource-hints', content: 'prefetch' },
    { name: 'format-detection', content: 'telephone=no' }
  ];
  
  performanceHints.forEach(hint => {
    const meta = document.createElement('meta');
    meta.name = hint.name;
    meta.content = hint.content;
    document.head.appendChild(meta);
  });
};

// Initialize everything
const init = () => {
  preloadCriticalResources();
  optimizeFontLoading();
  initPerformanceOptimizations();
  
  // Start React application
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(init);
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(init, 0);
}
