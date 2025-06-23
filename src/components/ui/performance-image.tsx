
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const PerformanceImage: React.FC<PerformanceImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  sizes = '100vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate optimized image sources
  const generateOptimizedSrc = useCallback((originalSrc: string, format?: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const params = new URLSearchParams();
      if (width) params.set('w', Math.min(width * 2, 2048).toString()); // Max 2048px
      if (height) params.set('h', Math.min(height * 2, 2048).toString());
      params.set('q', Math.min(quality, 80).toString()); // Max quality 80 for performance
      params.set('auto', 'compress,format');
      if (format) params.set('fm', format);
      params.set('fit', 'crop');
      
      return `${originalSrc.split('?')[0]}?${params.toString()}`;
    }
    return originalSrc;
  }, [width, height, quality]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="67" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="67" fill="url(#grad)" />
    </svg>
  `)}`;

  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500 text-sm border border-gray-300 rounded',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Erro ao carregar: ${alt}`}
      >
        <span className="text-xs text-center px-2">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden bg-gray-100', className)}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && placeholder === 'blur' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Main image with responsive sources */}
      {isInView && (
        <picture>
          {/* AVIF format for modern browsers */}
          <source 
            srcSet={generateOptimizedSrc(src, 'avif')} 
            type="image/avif"
            sizes={sizes}
          />
          
          {/* WebP format for good compression */}
          <source 
            srcSet={generateOptimizedSrc(src, 'webp')} 
            type="image/webp"
            sizes={sizes}
          />
          
          {/* JPEG fallback */}
          <img
            ref={imgRef}
            src={generateOptimizedSrc(src)}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            fetchPriority={priority ? 'high' : 'low'}
          />
        </picture>
      )}
    </div>
  );
};

export { PerformanceImage };
