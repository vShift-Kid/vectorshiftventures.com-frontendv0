import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallback
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate WebP and AVIF sources
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif') => {
    const lastDotIndex = originalSrc.lastIndexOf('.');
    if (lastDotIndex === -1) return originalSrc;
    
    const baseName = originalSrc.substring(0, lastDotIndex);
    const extension = originalSrc.substring(lastDotIndex);
    
    return `${baseName}.${format}`;
  };

  const webpSrc = getOptimizedSrc(src, 'webp');
  const avifSrc = getOptimizedSrc(src, 'avif');

  const handleError = () => {
    console.log('Image failed to load:', src);
    console.log('WebP src:', webpSrc);
    console.log('AVIF src:', avifSrc);
    setImageError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (imageError) {
    if (fallback) {
      return (
        <img
          src={fallback}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
        />
      );
    } else {
      // Fallback to a simple div with text or icon
      return (
        <div 
          className={`${className} bg-gray-600 flex items-center justify-center text-white font-bold`}
          style={{ width: width, height: height }}
        >
          {alt.charAt(0).toUpperCase()}
        </div>
      );
    }
  }

  return (
    <picture className={className}>
      {/* AVIF format (best compression) */}
      <source
        srcSet={avifSrc}
        type="image/avif"
        media="(min-width: 1px)"
      />
      
      {/* WebP format (good compression, wide support) */}
      <source
        srcSet={webpSrc}
        type="image/webp"
        media="(min-width: 1px)"
      />
      
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          backgroundColor: '#1a1a2e', // Dark background while loading
        }}
      />
    </picture>
  );
};

export default OptimizedImage;