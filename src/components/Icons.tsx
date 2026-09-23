import React from 'react';

export function RedDiceIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Dice Body */}
      <rect x="6" y="6" width="52" height="52" rx="12" fill="url(#diceGrad)" filter="url(#shadowFilter)" stroke="#fca5a5" strokeWidth="1.5" />
      {/* Subtle shine on top left */}
      <path d="M12 12 Q 32 10 52 14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
      {/* 5-pip dice pattern */}
      <circle cx="20" cy="20" r="4.5" fill="#ffffff" />
      <circle cx="44" cy="20" r="4.5" fill="#ffffff" />
      <circle cx="32" cy="32" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="20" cy="44" r="4.5" fill="#ffffff" />
      <circle cx="44" cy="44" r="4.5" fill="#ffffff" />
    </svg>
  );
}

export function GoldDiceIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldDiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="12" fill="url(#goldDiceGrad)" stroke="#fef08a" strokeWidth="2" />
      <circle cx="20" cy="20" r="4.5" fill="#1e293b" />
      <circle cx="44" cy="20" r="4.5" fill="#1e293b" />
      <circle cx="32" cy="32" r="5" fill="#dc2626" />
      <circle cx="20" cy="44" r="4.5" fill="#1e293b" />
      <circle cx="44" cy="44" r="4.5" fill="#1e293b" />
    </svg>
  );
}

export function MonopolyCashIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      {/* Bill */}
      <rect x="2" y="2" width="60" height="36" rx="4" fill="url(#cashGrad)" stroke="#86efac" strokeWidth="1.5" />
      <circle cx="32" cy="20" r="10" stroke="#bbf7d0" strokeWidth="1.5" fill="#14532d" />
      <text x="32" y="25" textAnchor="middle" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="sans-serif">M</text>
      <circle cx="10" cy="20" r="3" fill="#86efac" />
      <circle cx="54" cy="20" r="3" fill="#86efac" />
    </svg>
  );
}

export function MrMonopolyHat({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top Hat */}
      <ellipse cx="24" cy="38" rx="20" ry="4" fill="#0f172a" />
      <path d="M12 36 L15 12 L33 12 L36 36 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      {/* Red Ribbon */}
      <rect x="14" y="28" width="20" height="6" fill="#ef4444" />
      {/* Top of hat */}
      <ellipse cx="24" cy="12" rx="9" ry="3" fill="#334155" />
    </svg>
  );
}
