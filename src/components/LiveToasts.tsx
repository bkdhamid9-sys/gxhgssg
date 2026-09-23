import React, { useState, useEffect } from 'react';
import { LiveClaim, Language } from '../types';
import { translations } from '../translations';
import { RedDiceIcon } from './Icons';
import { Users, X, Sparkles } from 'lucide-react';

interface LiveToastsProps {
  currentLang: Language;
}

const mockClaims: LiveClaim[] = [
  {
    id: 'c1',
    username: 'Alex_Tycoon',
    location: 'Texas, USA',
    countryCode: '🇺🇸',
    diceClaimed: 15000,
    timeAgo: '18s',
    avatarSeed: '1',
  },
  {
    id: 'c2',
    username: 'Sarah_MGO',
    location: 'Paris, France',
    countryCode: '🇫🇷',
    diceClaimed: 32500,
    timeAgo: '35s',
    avatarSeed: '2',
  },
  {
    id: 'c3',
    username: 'Liam_MGO',
    location: 'Toronto, Canada',
    countryCode: '🇨🇦',
    diceClaimed: 15000,
    timeAgo: '52s',
    avatarSeed: '3',
  },
  {
    id: 'c4',
    username: 'TycoonDave',
    location: 'California, USA',
    countryCode: '🇺🇸',
    diceClaimed: 32500,
    timeAgo: '1m',
    avatarSeed: '4',
  },
  {
    id: 'c5',
    username: 'Lucas_Bordeaux',
    location: 'Lyon, France',
    countryCode: '🇫🇷',
    diceClaimed: 15000,
    timeAgo: '2m',
    avatarSeed: '5',
  },
  {
    id: 'c6',
    username: 'Emma_London',
    location: 'London, UK',
    countryCode: '🇬🇧',
    diceClaimed: 3500,
    timeAgo: '2m',
    avatarSeed: '6',
  },
  {
    id: 'c7',
    username: 'Noah_Sydney',
    location: 'Sydney, Australia',
    countryCode: '🇦🇺',
    diceClaimed: 32500,
    timeAgo: '3m',
    avatarSeed: '7',
  },
];

export const LiveToasts: React.FC<LiveToastsProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [onlineCount, setOnlineCount] = useState(1429);

  // Rotate notification every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockClaims.length);
        setVisible(true);
      }, 400);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Slight natural jitter to online user count
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setOnlineCount((prev) => prev + (Math.floor(Math.random() * 5) - 2));
    }, 7000);
    return () => clearInterval(jitterInterval);
  }, []);

  const claim = mockClaims[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm pointer-events-auto">
      {/* Live Active Online Counter Badge */}
      <div className="mb-2 flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3 py-1 shadow-lg backdrop-blur-md w-fit">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block -ml-3" />
        <span className="text-[11px] font-medium text-slate-300">
          <strong className="text-white font-mono">{onlineCount.toLocaleString()}</strong> {t.onlineUsers}
        </span>
      </div>

      {/* Floating Claim Toast */}
      <div
        className={`transition-all duration-400 transform ${
          visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div className="bg-slate-900/95 border border-amber-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Dice icon */}
          <div className="relative shrink-0">
            <RedDiceIcon className="w-10 h-10 animate-dice-roll" />
            <span className="absolute -bottom-1 -right-1 text-xs">
              {claim.countryCode}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-bold text-white truncate max-w-[130px]">
                {claim.username}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {claim.timeAgo} {t.ago}
              </span>
            </div>
            <div className="text-xs font-semibold text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>+{claim.diceClaimed.toLocaleString()} {t.dice}</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
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
