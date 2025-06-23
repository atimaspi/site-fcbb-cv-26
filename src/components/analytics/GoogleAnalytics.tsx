
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GoogleAnalytics = ({ measurementId = 'G-XXXXXXXXXX' }: GoogleAnalyticsProps) => {
  const location = useLocation();

  useEffect(() => {
    // Only load in production and if measurement ID is provided
    if (process.env.NODE_ENV !== 'production' || !measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.log('Google Analytics não carregado (desenvolvimento ou ID não configurado)');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_title: document.title,
        page_location: window.location.href,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [measurementId]);

  useEffect(() => {
    // Track page views on route changes
    if (typeof window.gtag === 'function') {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [location, measurementId]);

  return null;
};

// Helper functions for tracking events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackCustomEvent = (eventName: string, parameters: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }
};

// Specific tracking functions for FCBB
export const trackNewsClick = (newsTitle: string, newsId: string) => {
  trackEvent('click', 'news', newsTitle, undefined);
  trackCustomEvent('news_view', {
    news_id: newsId,
    news_title: newsTitle,
  });
};

export const trackGameResult = (homeTeam: string, awayTeam: string) => {
  trackEvent('view', 'game_result', `${homeTeam} vs ${awayTeam}`);
};

export const trackSocialShare = (platform: string, contentType: string, contentId: string) => {
  trackEvent('share', 'social', platform);
  trackCustomEvent('share', {
    method: platform,
    content_type: contentType,
    content_id: contentId,
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'file', fileName);
  trackCustomEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

export default GoogleAnalytics;
