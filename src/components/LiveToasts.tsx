import React, { useState, useEffect } from 'react';
import { LiveClaim, Language } from '../types';
import { translations } from '../translations';
import { FreeFireDiamondIcon } from './Icons';
import { Sparkles, X } from 'lucide-react';

interface LiveToastsProps {
  currentLang: Language;
}

const mockClaims: LiveClaim[] = [
  {
    id: 'ff1',
    username: 'ID: 294821****',
    location: 'Casablanca, Morocco',
    countryCode: '🇲🇦',
    diamondsClaimed: 2180,
    timeAgo: '14s',
    avatarSeed: '1',
  },
  {
    id: 'ff2',
    username: 'Amine_Booyah',
    location: 'Algiers, Algeria',
    countryCode: '🇩🇿',
    diamondsClaimed: 5600,
    timeAgo: '26s',
    avatarSeed: '2',
  },
  {
    id: 'ff3',
    username: 'ID: 184920****',
    location: 'Cairo, Egypt',
    countryCode: '🇪🇬',
    diamondsClaimed: 2180,
    timeAgo: '41s',
    avatarSeed: '3',
  },
  {
    id: 'ff4',
    username: 'Krimo_FF99',
    location: 'Rabat, Morocco',
    countryCode: '🇲🇦',
    diamondsClaimed: 11500,
    timeAgo: '58s',
    avatarSeed: '4',
  },
  {
    id: 'ff5',
    username: 'Shadow_Heroic',
    location: 'Riyadh, Saudi Arabia',
    countryCode: '🇸🇦',
    diamondsClaimed: 5600,
    timeAgo: '1m',
    avatarSeed: '5',
  },
  {
    id: 'ff6',
    username: 'Yassine_Maroc',
    location: 'Marrakech, Morocco',
    countryCode: '🇲🇦',
    diamondsClaimed: 2180,
    timeAgo: '2m',
    avatarSeed: '6',
  },
  {
    id: 'ff7',
    username: 'Bader_Tunis',
    location: 'Tunis, Tunisia',
    countryCode: '🇹🇳',
    diamondsClaimed: 1060,
    timeAgo: '2m',
    avatarSeed: '7',
  },
  {
    id: 'ff8',
    username: 'Lucas_Gamer',
    location: 'Paris, France',
    countryCode: '🇫🇷',
    diamondsClaimed: 5600,
    timeAgo: '3m',
    avatarSeed: '8',
  },
];

export const LiveToasts: React.FC<LiveToastsProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [onlineCount, setOnlineCount] = useState(1842);

  // Rotate notifications every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockClaims.length);
        setVisible(true);
      }, 350);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  // Natural active server online jitter
  useEffect(() => {
    const jitter = setInterval(() => {
      setOnlineCount((prev) => prev + (Math.floor(Math.random() * 7) - 3));
    }, 6000);
    return () => clearInterval(jitter);
  }, []);

  const claim = mockClaims[currentIndex];

  return (
    <div
      className={`fixed bottom-4 ${
        isRtl ? 'right-4 text-right' : 'left-4 text-left'
      } z-40 max-w-sm pointer-events-auto`}
    >
      {/* Active Online Counter Pill */}
      <div className="mb-2 flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3.5 py-1.5 shadow-lg backdrop-blur-md w-fit">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block -ml-3.5" />
        <span className="text-[11px] font-medium text-slate-300">
          <strong className="text-white font-mono">{onlineCount.toLocaleString()}</strong>{' '}
          {t.onlineUsers}
        </span>
      </div>

      {/* Floating Claim Toast Notification */}
      <div
        className={`transition-all duration-300 transform ${
          visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div className="bg-slate-900/95 border-2 border-cyan-500/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3 relative overflow-hidden group">
          {/* Subtle cyan glow */}
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-cyan-500/15 rounded-full blur-xl pointer-events-none" />

          {/* Diamond Icon & Flag */}
          <div className="relative shrink-0">
            <FreeFireDiamondIcon className="w-11 h-11 animate-float" />
            <span className="absolute -bottom-1 -right-1 text-sm drop-shadow-md">
              {claim.countryCode}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-bold text-white truncate max-w-[130px] font-mono">
                {claim.username}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {claim.timeAgo} {t.ago}
              </span>
            </div>

            <div className="text-xs font-black text-cyan-300 font-mono mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                +{claim.diamondsClaimed.toLocaleString()} {t.diamonds}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {claim.location}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-slate-500 hover:text-slate-300 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
