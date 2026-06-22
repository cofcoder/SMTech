import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onImageClick?: () => void;
}

export default function OptimizedImage({ src, alt, className = "", onImageClick }: OptimizedImageProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            // Once we have intersected, we don't need to observe anymore
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        rootMargin: '100px 0px', // start loading slightly before coming into view
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Safe check if image is already completed (e.g. cached)
  useEffect(() => {
    if (isIntersecting && imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden w-full h-full bg-slate-100 dark:bg-slate-950 select-none group"
      onClick={onImageClick}
    >
      {/* Progressive Blur placeholder or Loading Indicator */}
      {(!isIntersecting || !isLoaded) && (
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-700 ease-out flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: !isLoaded ? 1 : 0 }}
        >
          {/* Soft background blurred skeleton matching themes */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/40 via-slate-300/20 to-indigo-100/10 dark:from-[#080d24] dark:via-indigo-950/15 dark:to-slate-900/40 backdrop-blur-md" />
          
          {/* Miniature animated loading dots */}
          <div className="relative z-15 flex flex-col items-center gap-1.5">
            <div className="flex space-x-1 justify-center items-center">
              <span className="sr-only">Optimizing...</span>
              <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-1.5 w-1.5 bg-pink-500 rounded-full animate-bounce"></div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono font-bold">
              LAZY OPTIMIZED
            </span>
          </div>
        </div>
      )}

      {/* Main Image Layer */}
      {isIntersecting && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded 
              ? "blur-0 scale-100 opacity-100" 
              : "blur-md scale-105 opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)} // avoid hanging if image fails
        />
      )}

      {/* Hover ambient lighting overlay */}
      <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20" />
    </div>
  );
}
