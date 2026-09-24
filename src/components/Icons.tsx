import React from 'react';

// High-fidelity 3D Red Dice Icon (Monopoly GO Signature)
export function MonopolyDiceIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Dice Body Gradient (3D Red) */}
        <linearGradient id="diceFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="60%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="diceTopGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
        <linearGradient id="diceRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <filter id="diceShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#diceShadow)">
        {/* Top Face */}
        <polygon points="32,6 56,18 32,30 8,18" fill="url(#diceTopGrad)" stroke="#fee2e2" strokeWidth="1" strokeLinejoin="round" />
        {/* Left/Front Face */}
        <polygon points="8,18 32,30 32,56 8,44" fill="url(#diceFrontGrad)" stroke="#fca5a5" strokeWidth="0.8" strokeLinejoin="round" />
        {/* Right Face */}
        <polygon points="32,30 56,18 56,44 32,56" fill="url(#diceRightGrad)" stroke="#f87171" strokeWidth="0.8" strokeLinejoin="round" />

        {/* Top Face Dots (Pip 1 Center) */}
        <ellipse cx="32" cy="18" rx="3.5" ry="2" fill="#ffffff" />
        <ellipse cx="32" cy="18" rx="2.5" ry="1.2" fill="#f8fafc" />

        {/* Front Face Dots (Pips 3) */}
        <circle cx="16" cy="27" r="2.5" fill="#ffffff" />
        <circle cx="20" cy="37" r="2.5" fill="#ffffff" />
        <circle cx="24" cy="47" r="2.5" fill="#ffffff" />

        {/* Right Face Dots (Pips 4) */}
        <circle cx="40" cy="27" r="2.2" fill="#ffffff" opacity="0.95" />
        <circle cx="48" cy="23" r="2.2" fill="#ffffff" opacity="0.95" />
        <circle cx="40" cy="47" r="2.2" fill="#ffffff" opacity="0.95" />
        <circle cx="48" cy="43" r="2.2" fill="#ffffff" opacity="0.95" />
      </g>
    </svg>
  );
}

// Pair of Monopoly GO Dices
export function MonopolyDicePairIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <MonopolyDiceIcon className="w-4/5 h-4/5 -rotate-12 transform -translate-x-1" />
      <MonopolyDiceIcon className="w-4/5 h-4/5 rotate-12 transform translate-x-1 -translate-y-1" />
    </div>
  );
}

// Free Fire Diamond Icon
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

      <g filter="url(#ffDiamondShadow)">
        <polygon points="18,16 46,16 56,28 8,28" fill="url(#ffDiamondFacetTop)" stroke="#e0f2fe" strokeWidth="1" />
        <polygon points="8,28 56,28 32,54" fill="url(#ffDiamondGrad1)" stroke="#38bdf8" strokeWidth="1" />
        <polygon points="26,16 38,16 42,28 22,28" fill="url(#ffDiamondGlow)" />
        <polygon points="22,28 42,28 32,54" fill="#0284c7" opacity="0.6" />
        <polygon points="8,28 22,28 32,54" fill="#0369a1" opacity="0.8" />
        <polygon points="42,28 56,28 32,54" fill="#075985" opacity="0.9" />
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

// Aliases
export const RedDiceIcon = MonopolyDiceIcon;
export const GoldDiceIcon = MonopolyDiceIcon;
export const MonopolyCashIcon = MonopolyDiceIcon;
