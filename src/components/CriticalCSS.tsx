
import { memo } from 'react';

const CriticalCSS = memo(() => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS ultra-otimizado para FCBB branding */
        .cv-container {
          max-width: 1280px;
          padding: 0 1rem;
          margin: 0 auto;
        }
        
        /* FCBB Core colors - inline para evitar FOUC */
        .text-cv-blue { color: #002b7f; }
        .text-cv-red { color: #ce1126; }
        .text-cv-yellow { color: #ffcc00; }
        .bg-cv-blue { background-color: #002b7f; }
        .bg-cv-red { background-color: #ce1126; }
        .bg-cv-yellow { background-color: #ffcc00; }
        
        /* FCBB gradients */
        .hero-gradient {
          background: linear-gradient(135deg, #002b7f 0%, #ce1126 50%, #ffcc00 100%);
        }
        
        .fcbb-primary-gradient {
          background: linear-gradient(135deg, #002b7f 0%, #1e40af 100%);
        }
        
        .fcbb-accent-gradient {
          background: linear-gradient(135deg, #ffcc00 0%, #fbbf24 100%);
        }
        
        /* Enhanced loading with FCBB colors */
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f4ff 25%, #e0e7ff 50%, #f0f4ff 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          will-change: background-position;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* FCBB Typography */
        .fcbb-heading {
          font-family: 'Poppins', 'Inter', system-ui, sans-serif;
          font-weight: 700;
          color: #002b7f;
          line-height: 1.2;
        }
        
        .fcbb-subheading {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600;
          color: #1e40af;
        }
        
        /* Section titles with FCBB styling */
        .section-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #002b7f;
          border-bottom: 4px solid #ffcc00;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          display: inline-block;
        }
        
        /* FCBB Cards */
        .fcbb-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 204, 0, 0.2);
          border-radius: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 43, 127, 0.1);
        }
        
        .fcbb-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 43, 127, 0.2);
          border-color: rgba(255, 204, 0, 0.4);
        }
        
        /* FCBB Buttons */
        .fcbb-btn-primary {
          background: linear-gradient(135deg, #ffcc00 0%, #fbbf24 100%);
          color: #002b7f;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(255, 204, 0, 0.3);
        }
        
        .fcbb-btn-primary:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #ffcc00 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 204, 0, 0.4);
        }
        
        .fcbb-btn-secondary {
          background: linear-gradient(135deg, #002b7f 0%, #1e40af 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 700;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 43, 127, 0.3);
        }
        
        .fcbb-btn-secondary:hover {
          background: linear-gradient(135deg, #1e40af 0%, #002b7f 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 43, 127, 0.4);
        }
        
        /* Basketball-themed animations */
        @keyframes bounce-basketball {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-basketball {
          animation: bounce-basketball 2s ease-in-out infinite;
        }
        
        /* FCBB Stats counter */
        .fcbb-stat-number {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #002b7f 0%, #1e40af 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        
        /* Performance optimizations */
        img[width][height] {
          height: auto;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* GPU acceleration for FCBB animations */
        .fcbb-hover-lift {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          will-change: transform, box-shadow;
        }
        
        .fcbb-hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        /* Accessibility and performance */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* FCBB responsive typography */
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.5rem;
            border-bottom-width: 3px;
          }
          
          .fcbb-stat-number {
            font-size: 2.5rem;
          }
        }
      `
    }} />
  );
});

CriticalCSS.displayName = 'CriticalCSS';

export default CriticalCSS;
