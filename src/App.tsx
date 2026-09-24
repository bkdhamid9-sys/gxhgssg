import React, { useState, useEffect } from 'react';
import { Language, CpaConfig } from './types';
import { translations } from './translations';
import { Navbar } from './components/Navbar';
import { FreeFireGeneratorFlow } from './components/FreeFireGeneratorFlow';
import { LiveToasts } from './components/LiveToasts';
import { CpaConfigModal } from './components/CpaConfigModal';
import { FaqAndProof } from './components/FaqAndProof';
import { FreeFireDiamondIcon, FreeFireFlameBadge } from './components/Icons';
import { ShieldCheck, Flame, Users, Sparkles, Zap } from 'lucide-react';

const STORAGE_CPA_KEY = 'freefire_cpa_config';
const DEFAULT_CPA_URL =
  'https://app.trcefy.com/sl?id=6a2050db46d3cf0d62f32aa4&pid=2&sub2=u783751&sub6=s2smartLink&sub5=s1SUBID1HERE';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [showConfigModal, setShowConfigModal] = useState(false);

  // CPA link configuration
  const [cpaConfig, setCpaConfig] = useState<CpaConfig>(() => {
    const saved = localStorage.getItem(STORAGE_CPA_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          parsed.lockerUrl &&
          !parsed.lockerUrl.includes('example.com')
        ) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return {
      lockerUrl: DEFAULT_CPA_URL,
      networkName: 'Trcefy Smartlink',
      autoRedirect: true,
    };
  });

  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const handleSaveCpaConfig = (newConfig: CpaConfig) => {
    setCpaConfig(newConfig);
    localStorage.setItem(STORAGE_CPA_KEY, JSON.stringify(newConfig));
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950"
    >
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenCpaSettings={() => setShowConfigModal(true)}
      />

      {/* Hero Header Section */}
      <section className="relative pt-8 pb-6 sm:pt-12 sm:pb-8 overflow-hidden">
        {/* Glowing Fire & Cyan Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-red-600/20 via-amber-500/15 to-cyan-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Top Gaming Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold mb-4 shadow-md">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span>{t.badgeLimited}</span>
            <span className="text-slate-600">·</span>
            <span className="text-cyan-300 font-mono">GARENA FF EVENT</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-tight sm:leading-tight">
            {currentLang === 'ar' ? (
              <>
                شحن <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">جواهر فري فاير مجاناً</span> (Free Fire 2026)
              </>
            ) : currentLang === 'fr' ? (
              <>
                Générateur de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Diamants Free Fire Gratuits</span>
              </>
            ) : (
              <>
                Claim Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Free Fire Diamonds</span> Today
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-3.5 leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>

          {/* Trust Metrics Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 mt-6 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.safeAntiBan}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.distributedTotal}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{t.noPasswordNeeded}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Free Fire 2-Screen Flow */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <FreeFireGeneratorFlow
          currentLang={currentLang}
          cpaConfig={cpaConfig}
        />

        {/* Social Proof & FAQ */}
        <div className="mt-14">
          <FaqAndProof currentLang={currentLang} />
        </div>
      </main>

      {/* Live Claims Notifications in the corner ("flamdigpage katih ich3art nas li khdaw جواهر") */}
      <LiveToasts currentLang={currentLang} />

      {/* CPA Settings Modal */}
      {showConfigModal && (
        <CpaConfigModal
          currentLang={currentLang}
          config={cpaConfig}
          onSave={handleSaveCpaConfig}
          onClose={() => setShowConfigModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FreeFireDiamondIcon className="w-5 h-5" />
            <span className="font-bold text-slate-300">Free Fire™ Diamond Rewards Portal</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="#activity" className="hover:text-slate-300 transition-colors">
              {t.recentClaimsTitle}
            </a>
            <a href="#faq" className="hover:text-slate-300 transition-colors">
              {t.faqTitle}
            </a>
            <span className="text-slate-800">·</span>
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="text-slate-600 hover:text-slate-400 text-[10px]"
            >
              CPA Smartlink Config
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-slate-900/60 text-[10px] text-slate-600 text-center sm:text-left leading-relaxed">
          Disclaimer: This web application is a promotional rewards portal for Garena Free Fire fans. Free Fire is a registered trademark of Garena International. This portal is not officially affiliated with or endorsed by Garena.
        </div>
      </footer>
    </div>
  );
}
