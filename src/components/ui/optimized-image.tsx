
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
  sizes = "100vw",
  quality = 80
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  // Generate WebP and AVIF sources for Unsplash images
  const generateSources = useCallback(() => {
    if (!src.includes('unsplash.com')) {
      return { webp: src, avif: src, original: src };
    }

    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams(src.split('?')[1] || '');
    
    // Set quality and format optimizations
    params.set('q', quality.toString());
    params.set('fm', 'webp');
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('fit', 'crop');
    params.set('auto', 'format,compress');

    const webpSrc = `${baseUrl}?${params.toString()}`;
    
    // AVIF version
    params.set('fm', 'avif');
    const avifSrc = `${baseUrl}?${params.toString()}`;
    
    return { webp: webpSrc, avif: avifSrc, original: src };
  }, [src, width, height, quality]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const sources = generateSources();

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500 text-sm',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Erro ao carregar imagem: ${alt}`}
      >
        <span className="text-xs">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 bg-gray-200 animate-shimmer',
            className
          )}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      
      <picture>
        {/* AVIF format for modern browsers */}
        <source 
          srcSet={sources.avif} 
          type="image/avif"
          sizes={sizes}
        />
        
        {/* WebP format for most browsers */}
        <source 
          srcSet={sources.webp} 
          type="image/webp"
          sizes={sizes}
        />
        
        {/* Fallback to original format */}
        <img
          src={sources.original}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      </picture>
    </div>
  );
};

export { OptimizedImage };
