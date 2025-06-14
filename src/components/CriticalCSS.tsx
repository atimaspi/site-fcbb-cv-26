
import { memo } from 'react';

const CriticalCSS = memo(() => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS optimizado */
        .cv-container {
          max-width: 1280px;
          padding: 0 1rem;
          margin: 0 auto;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #003893 0%, #CF2027 50%, #F7D116 100%);
        }
        
        .text-cv-blue { color: #003893; }
        .text-cv-red { color: #CF2027; }
        .bg-cv-blue { background-color: #003893; }
        .bg-cv-red { background-color: #CF2027; }
        
        /* Loading otimizado */
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Typography otimizada */
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #003893;
          border-bottom: 3px solid #F7D116;
          padding-bottom: 0.25rem;
          margin-bottom: 1rem;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 1.875rem;
          }
        }
        
        /* Performance otimizada */
        img[width][height] {
          height: auto;
        }
        
        .btn-primary {
          background-color: #003893;
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        
        .btn-primary:hover {
          background-color: #002766;
        }
      `
    }} />
  );
});

CriticalCSS.displayName = 'CriticalCSS';

export default CriticalCSS;
