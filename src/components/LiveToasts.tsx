import React, { useState, useEffect } from 'react';
import { LiveClaim, Language, GameMode } from '../types';
import { translations } from '../translations';
import { MonopolyDiceIcon, FreeFireDiamondIcon } from './Icons';
import { Sparkles, X } from 'lucide-react';

interface LiveToastsProps {
  currentLang: Language;
  gameMode?: GameMode;
}

const mockClaimsMonopoly: LiveClaim[] = [
  {
    id: 'mg1',
    username: 'Karim_Tycoon',
    location: 'Casablanca, Morocco',
    countryCode: '🇲🇦',
    amountClaimed: 13500,
    resourceType: 'dices',
    timeAgo: '4s',
    avatarSeed: '1',
  },
  {
    id: 'mg2',
    username: 'BoardMaster_DZ',
    location: 'Oran, Algeria',
    countryCode: '🇩🇿',
    amountClaimed: 8250,
    resourceType: 'dices',
    timeAgo: '12s',
    avatarSeed: '2',
  },
  {
    id: 'mg3',
    username: 'DiceKing_EG',
    location: 'Alexandria, Egypt',
    countryCode: '🇪🇬',
    amountClaimed: 13500,
    resourceType: 'dices',
    timeAgo: '28s',
    avatarSeed: '3',
  },
  {
    id: 'mg4',
    username: 'Rabat_Rolls99',
    location: 'Rabat, Morocco',
    countryCode: '🇲🇦',
    amountClaimed: 4200,
    resourceType: 'dices',
    timeAgo: '45s',
    avatarSeed: '4',
  },
  {
    id: 'mg5',
    username: 'Fahad_KSA',
    location: 'Riyadh, Saudi Arabia',
    countryCode: '🇸🇦',
    amountClaimed: 13500,
    resourceType: 'dices',
    timeAgo: '1m',
    avatarSeed: '5',
  },
  {
    id: 'mg6',
    username: 'Sara_Paris',
    location: 'Paris, France',
    countryCode: '🇫🇷',
    amountClaimed: 8250,
    resourceType: 'dices',
    timeAgo: '2m',
    avatarSeed: '6',
  },
];

const mockClaimsFreefire: LiveClaim[] = [
  {
    id: 'ff1',
    username: 'ID: 294821****',
    location: 'Casablanca, Morocco',
    countryCode: '🇲🇦',
    amountClaimed: 2180,
    resourceType: 'diamonds',
    timeAgo: '6s',
    avatarSeed: '1',
  },
  {
    id: 'ff2',
    username: 'Amine_Booyah',
    location: 'Algiers, Algeria',
    countryCode: '🇩🇿',
    amountClaimed: 5600,
    resourceType: 'diamonds',
    timeAgo: '19s',
    avatarSeed: '2',
  },
  {
    id: 'ff3',
    username: 'ID: 184920****',
    location: 'Cairo, Egypt',
    countryCode: '🇪🇬',
    amountClaimed: 11500,
    resourceType: 'diamonds',
    timeAgo: '37s',
    avatarSeed: '3',
  },
  {
    id: 'ff4',
    username: 'Krimo_FF99',
    location: 'Marrakech, Morocco',
    countryCode: '🇲🇦',
    amountClaimed: 5600,
    resourceType: 'diamonds',
    timeAgo: '52s',
    avatarSeed: '4',
  },
];

export const LiveToasts: React.FC<LiveToastsProps> = ({ currentLang, gameMode = 'monopoly' }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [onlineCount, setOnlineCount] = useState(2140);

  const activeClaims = gameMode === 'monopoly' ? mockClaimsMonopoly : mockClaimsFreefire;

  // Rotate notifications every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activeClaims.length);
        setVisible(true);
      }, 350);
    }, 5500);

    return () => clearInterval(interval);
  }, [activeClaims.length]);

  // Natural active server online jitter
  useEffect(() => {
    const jitter = setInterval(() => {
      setOnlineCount((prev) => prev + (Math.floor(Math.random() * 9) - 4));
    }, 5000);
    return () => clearInterval(jitter);
  }, []);

  const claim = activeClaims[currentIndex % activeClaims.length];
  const unitText = gameMode === 'monopoly' ? t.diceUnit : t.diamondUnit;

  return (
    <div
      className={`fixed bottom-4 ${
        isRtl ? 'right-4 text-right' : 'left-4 text-left'
      } z-40 max-w-sm pointer-events-auto`}
    >
      {/* Active Online Counter Pill */}
      <div className="mb-2 flex items-center gap-2 bg-slate-900/95 border border-slate-700/80 rounded-full px-3.5 py-1.5 shadow-lg backdrop-blur-md w-fit">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block -ml-3.5" />
        <span className="text-[11px] font-medium text-slate-300">
          <strong className="text-white font-mono">{onlineCount.toLocaleString()}</strong>{' '}
          {t.onlinePlayers}
        </span>
      </div>

      {/* Floating Claim Toast Notification */}
      <div
        className={`transition-all duration-300 transform ${
          visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div className="bg-slate-900/95 border-2 border-amber-400/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3 relative overflow-hidden group">
          {/* Subtle amber glow */}
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />

          {/* Icon & Country Flag */}
          <div className="relative shrink-0">
            {gameMode === 'monopoly' ? (
              <MonopolyDiceIcon className="w-10 h-10 animate-float" />
            ) : (
              <FreeFireDiamondIcon className="w-10 h-10 animate-float" />
            )}
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
                {claim.timeAgo}
              </span>
            </div>

            <div className="text-xs font-black text-amber-300 font-mono mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span>
                +{claim.amountClaimed.toLocaleString()} {unitText}
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
            className="text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
