import React, { useState } from 'react';
import { Language, GameMode } from '../types';
import { translations } from '../translations';
import { Settings, Globe, Volume2, VolumeX } from 'lucide-react';
import { MonopolyDiceIcon, FreeFireDiamondIcon } from './Icons';
import { sounds } from '../utils/sound';

interface NavbarProps {
  currentLang: Language;
  gameMode: GameMode;
  onLanguageChange: (lang: Language) => void;
  onOpenCpaSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  gameMode,
  onLanguageChange,
  onOpenCpaSettings,
}) => {
  const t = translations[currentLang];
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand title */}
        <div className="flex items-center gap-2.5">
          {gameMode === 'monopoly' ? (
            <MonopolyDiceIcon className="w-9 h-9" />
          ) : (
            <FreeFireDiamondIcon className="w-9 h-9" />
          )}
          <a
            href="#"
            className="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-heading"
          >
            {gameMode === 'monopoly' ? (
              <>
                <span className="text-red-500">MONOPOLY</span>
                <span className="text-amber-400">GO</span>
                <span className="text-xs font-bold text-slate-400 font-mono hidden sm:inline">
                  DICES 2026
                </span>
              </>
            ) : (
              <>
                <span className="text-amber-400">FREE</span>
                <span className="text-cyan-400">FIRE</span>
                <span className="text-xs font-bold text-slate-400 font-mono hidden sm:inline">
                  DIAMONDS
                </span>
              </>
            )}
          </a>
        </div>

        {/* Audio Toggle, Language & Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Mute/Unmute */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Language Switcher: AR (الفصحى), FR, EN */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1 hidden sm:inline-block" />
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onLanguageChange('ar');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                currentLang === 'ar'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onLanguageChange('fr');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                currentLang === 'fr'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onLanguageChange('en');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* CPA smartlink config modal */}
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenCpaSettings();
            }}
            title={t.cpaSettingsBtn}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
