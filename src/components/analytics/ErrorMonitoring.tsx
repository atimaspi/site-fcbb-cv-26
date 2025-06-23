import { useEffect } from 'react';

interface ErrorInfo {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  userAgent: string;
  timestamp: string;
  userId?: string;
  route: string;
}

interface ErrorMonitoringProps {
  enabled?: boolean;
  endpoint?: string;
}

const ErrorMonitoring = ({ enabled = true, endpoint }: ErrorMonitoringProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleError = (event: ErrorEvent) => {
      const errorInfo: ErrorInfo = {
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        route: window.location.pathname,
      };

      logError(errorInfo);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorInfo: ErrorInfo = {
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        route: window.location.pathname,
      };

      logError(errorInfo);
    };

    const logError = async (errorInfo: ErrorInfo) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error captured:', errorInfo);
      }

      // Send to external monitoring service if endpoint is provided
      if (endpoint) {
        try {
          await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(errorInfo),
          });
        } catch (e) {
          console.error('Failed to send error to monitoring service:', e);
        }
      }

      // Store locally for analysis
      try {
        const errors = JSON.parse(localStorage.getItem('error_log') || '[]');
        errors.push(errorInfo);
        
        // Keep only last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('error_log', JSON.stringify(errors));
      } catch (e) {
        console.error('Failed to store error locally:', e);
      }

      // Track in Google Analytics if available
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'exception', {
          description: errorInfo.message,
          fatal: false,
        });
      }
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [enabled, endpoint]);

  return null;
};

// Helper function to manually report errors
export const reportError = (error: Error, context?: string) => {
  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    route: window.location.pathname,
  };

  console.error(`Error in ${context}:`, errorInfo);

  // Store locally
  try {
    const errors = JSON.parse(localStorage.getItem('error_log') || '[]');
    errors.push({ ...errorInfo, context });
    localStorage.setItem('error_log', JSON.stringify(errors));
  } catch (e) {
    console.error('Failed to store error locally:', e);
  }

  // Track in Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'exception', {
      description: `${context}: ${error.message}`,
      fatal: false,
    });
  }
};

// Function to get stored errors for debugging
export const getStoredErrors = (): ErrorInfo[] => {
  try {
    return JSON.parse(localStorage.getItem('error_log') || '[]');
  } catch {
    return [];
  }
};

// Function to clear stored errors
export const clearStoredErrors = () => {
  localStorage.removeItem('error_log');
};

export default ErrorMonitoring;
