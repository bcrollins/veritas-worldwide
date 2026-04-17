'use client';

import React, { useState, useEffect, ImgHTMLAttributes } from 'react';
import { getPreferredImageSrc } from '../lib/imageSources';

// Global Set to track broken images
const brokenImages = new Set<string>();

// Type for component props
interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  retryCount?: number;
  showPlaceholder?: boolean;
}

/**
 * ImageWithFallback Component
 * Handles image loading with fallback support, retry logic, and error tracking
 * Features:
 * - Automatic retry using Wikimedia Commons thumbnail proxy
 * - Loading skeleton during image load
 * - Fade-in transition on successful load
 * - Global tracking of broken images
 * - Veritas design colors with dark mode support
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  fallbackSrc,
  retryCount = 2,
  showPlaceholder = true,
  className = '',
  ...props
}) => {
  const normalizedSrc = getPreferredImageSrc(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const [retryAttempts, setRetryAttempts] = useState(0);

  useEffect(() => {
    setCurrentSrc(normalizedSrc);
    setIsLoading(Boolean(src));
    setHasError(false);
    setRetryAttempts(0);

    if (typeof window === 'undefined' || !src) return;

    try {
      const overrides = JSON.parse(
        localStorage.getItem('veritas_image_overrides') || '{}'
      );
      if (overrides[src]) {
        setCurrentSrc(overrides[src]);
      }
    } catch {
      // localStorage parsing error, continue with normalized src
    }
  }, [normalizedSrc, src]);

  const handleError = () => {
    if (retryAttempts < retryCount && normalizedSrc && currentSrc !== normalizedSrc) {
        setCurrentSrc(normalizedSrc);
        setRetryAttempts((attempts) => attempts + 1);
        setIsLoading(true);
        return;
    }

    // Use fallback source if provided
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    // Mark as broken
    if (src) {
      brokenImages.add(src);
    }
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (src) {
      brokenImages.delete(src);
    }
  };

  const placeholderClasses =
    'bg-gradient-to-br from-[#FAF8F5] to-[#EFE9E0] dark:from-[#2A2520] dark:to-[#1A1815] animate-pulse';
  const containerClasses = `relative overflow-hidden rounded-lg ${className}`;
  const imgClasses = `w-full h-full object-cover transition-opacity duration-500 ${
    isLoading ? 'opacity-0' : 'opacity-100'
  }`;

  return (
    <div className={containerClasses}>
      {showPlaceholder && isLoading && (
        <div className={`absolute inset-0 ${placeholderClasses}`} />
      )}

      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={imgClasses}
          {...props}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-[#FAF8F5] dark:bg-[#1A1815] text-[#8B1A1A] dark:text-[#D4A5A5]`}
        >
          <div className="text-center px-4">
            <p className="text-sm font-serif">Image unavailable</p>
            <p className="text-xs mt-1 opacity-75">{alt || 'No image'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Export utility functions for health tracking
export const getBrokenImages = (): Set<string> => {
  return new Set(brokenImages);
};

export const getImageHealthStats = (): {
  total: number;
  broken: number;
  working: number;
} => {
  return {
    total: 0, // Will be calculated by consumer
    broken: brokenImages.size,
    working: 0, // Will be calculated by consumer
  };
};

// Export reset function for testing/admin purposes
export const clearBrokenImages = (): void => {
  brokenImages.clear();
};

export default ImageWithFallback;
