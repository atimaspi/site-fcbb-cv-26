
import { memo } from 'react';

const CriticalCSS = memo(() => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
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
        
        /* Essential loading states */
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Hero section critical styles */
        .hero-slide {
          position: absolute;
          inset: 0;
          transition: transform 0.7s ease-in-out;
        }
        
        .hero-slide.active { transform: translateX(0); }
        .hero-slide.prev { transform: translateX(-100%); }
        .hero-slide.next { transform: translateX(100%); }
        
        /* Essential typography */
        .section-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #003893;
          border-bottom: 4px solid #F7D116;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 2.25rem;
          }
          .cv-container {
            padding: 0 2rem;
          }
        }
        
        /* Prevent layout shift */
        img[width][height] {
          height: auto;
        }
        
        /* Essential button styles */
        .btn-primary {
          background-color: #003893;
          color: white;
          padding: 0.5rem 1rem;
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
