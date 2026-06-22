import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onImageClick?: () => void;
}

export default function OptimizedImage({ src, alt, className = "", onImageClick }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // If the image is already cached by the browser, set loaded to true instantly
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div 
      className="relative overflow-hidden w-full h-full bg-slate-100 dark:bg-gray-900 select-none group"
      onClick={onImageClick}
    >
      {/* Progressive Blur placeholder or Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/50 via-slate-300/30 to-indigo-50/20 dark:from-[#0a0f24] dark:to-slate-800 animate-pulse flex flex-col items-center justify-center gap-1.5 min-h-[120px]">
          {/* Miniature animated loading dots */}
          <div className="flex space-x-1 justify-center items-center">
            <span className="sr-only">Optimizing...</span>
            <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"></div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">Optimized WebP</span>
        </div>
      )}

      {/* Main Image Layer */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`${className} transition-all duration-700 ease-out ${
          isLoaded 
            ? "blur-0 scale-100 opacity-100" 
            : "blur-md scale-105 opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Hover ambient lighting overlay */}
      <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
    </div>
  );
}
