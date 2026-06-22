import React from 'react';

interface SVGLogoProps {
  className?: string;
  size?: number;
}

export default function SVGLogo({ className = "", size = 40 }: SVGLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="smtech-svg-logo"
    >
      <defs>
        {/* Futuristic glowing linear gradients */}
        <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* Indigo */}
          <stop offset="50%" stopColor="#8b5cf6" /> {/* Purple */}
          <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
        </linearGradient>
        
        <linearGradient id="outline-grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
          <stop offset="40%" stopColor="#6366f1" /> {/* Indigo */}
          <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
        </linearGradient>

        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Futuristic Hexagonal Outlined Outer Frame */}
      <polygon
        points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5"
        stroke="url(#outline-grad)"
        strokeWidth="3"
        strokeLinejoin="round"
        className="opacity-90 animate-pulse duration-3000"
      />

      {/* Hexagon inner accent grid lines */}
      <path
        d="M 50,5 L 50,95 M 11,27.5 L 89,72.5 M 11,72.5 L 89,27.5"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-slate-200 dark:text-slate-800 opacity-20 pointer-events-none"
      />

      {/* Geometric Interlocking representing S and M */}
      {/* Abstract 'S' path overlay with multiple nodes */}
      <path
        d="M 33,35 C 33,26 67,26 67,42 C 67,58 33,52 33,68 C 33,76 67,76 67,68"
        stroke="url(#cyber-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="transition-all duration-300 hover:filter-neon"
      />

      {/* Creative overlapping 'M' geometry interlocking through the S */}
      <path
        d="M 28,54 L 35,42 L 50,60 L 65,42 L 72,54"
        stroke="url(#outline-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Glowing core interface nodes */}
      <circle cx="50" cy="60" r="3" fill="#f43f5e" className="animate-ping origin-center" />
      <circle cx="50" cy="60" r="2" fill="#ef4444" />
      <circle cx="35" cy="42" r="1.5" fill="#22d3ee" />
      <circle cx="65" cy="42" r="1.5" fill="#22d3ee" />
    </svg>
  );
}
