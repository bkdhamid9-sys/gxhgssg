import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Settings, Globe } from 'lucide-react';
import { RedDiceIcon } from './Icons';

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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-2.5">
          <RedDiceIcon className="w-8 h-8 animate-dice-roll" />
          <a href="#" className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-heading">
            <span className="text-red-500">MONOPOLY</span>
            <span className="text-amber-400">GO</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">REWARDS</span>
          </a>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
            {t.howItWorksTitle.split('(')[0]}
          </a>
          <a href="#packages" className="hover:text-amber-400 transition-colors">
            {t.choosePackageTitle}
          </a>
          <a href="#activity" className="hover:text-amber-400 transition-colors">
            {t.recentClaimsTitle}
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">
            {t.faqTitle}
          </a>
        </nav>

        {/* Zone 3: Language & CPA Link settings action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5" />
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLang === 'en'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLang === 'fr'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Français
            </button>
          </div>

          {/* Admin link configuration button (Discreet icon only) */}
          <button
            type="button"
            onClick={onOpenCpaSettings}
            title={t.cpaSettingsBtn}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
