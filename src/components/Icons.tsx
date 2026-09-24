import React from 'react';

export function FreeFireDiamondIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ffDiamondGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="ffDiamondFacetTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="50%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="ffDiamondGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
        <filter id="ffDiamondShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Main Diamond Shape with Glow */}
      <g filter="url(#ffDiamondShadow)">
        {/* Top Facet */}
        <polygon points="18,16 46,16 56,28 8,28" fill="url(#ffDiamondFacetTop)" stroke="#e0f2fe" strokeWidth="1" />
        {/* Center Bottom Point */}
        <polygon points="8,28 56,28 32,54" fill="url(#ffDiamondGrad1)" stroke="#38bdf8" strokeWidth="1" />
        {/* Interior Facet lines */}
        <polygon points="26,16 38,16 42,28 22,28" fill="url(#ffDiamondGlow)" />
        <polygon points="22,28 42,28 32,54" fill="#0284c7" opacity="0.6" />
        <polygon points="8,28 22,28 32,54" fill="#0369a1" opacity="0.8" />
        <polygon points="42,28 56,28 32,54" fill="#075985" opacity="0.9" />
        {/* Highlight Sparkles */}
        <circle cx="22" cy="22" r="2" fill="#ffffff" />
        <path d="M46 20 L48 24 L52 25 L48 26 L46 30 L44 26 L40 25 L44 24 Z" fill="#ffffff" />
      </g>
    </svg>
  );
}

export function FreeFireFlameBadge({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="75%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>
      <path
        d="M24 4C24 4 28 12 28 17C28 18.2 27.6 19.3 27 20.2C30 18 34 20 34 25C34 32.5 28 39 22 41C20.5 41.5 18.5 41.8 17 41C15 40 13 37.5 13 34.5C13 30 17 27 18 23C19 19 18 16 18 16C18 16 15 20 15 25C15 25.5 14 26 13.5 25.5C11.5 23 12 18.5 14.5 15C18 10 24 4 24 4Z"
        fill="url(#flameGrad)"
      />
    </svg>
  );
}

export function BooyahIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="#f59e0b"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Keep aliases for compatibility
export const RedDiceIcon = FreeFireDiamondIcon;
export const GoldDiceIcon = FreeFireDiamondIcon;
export const MonopolyCashIcon = FreeFireDiamondIcon;
