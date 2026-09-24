import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Settings, Globe, Flame } from 'lucide-react';
import { FreeFireDiamondIcon } from './Icons';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCpaSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenCpaSettings,
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand title */}
        <div className="flex items-center gap-2.5">
          <FreeFireDiamondIcon className="w-9 h-9" />
          <a
            href="#"
            className="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-heading"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400">
              FREE FIRE
            </span>
            <span className="text-cyan-400">DIAMONDS</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 hidden xs:inline-flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              <span>2026</span>
            </span>
          </a>
        </div>

        {/* Language & Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher: AR, FR, EN */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1 hidden sm:inline-block" />
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                currentLang === 'ar'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                currentLang === 'fr'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                currentLang === 'en'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Admin link configuration modal */}
          <button
            type="button"
            onClick={onOpenCpaSettings}
            title={t.cpaSettingsBtn}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
