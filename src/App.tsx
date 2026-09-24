import React, { useState } from 'react';
import { Language, CpaConfig, GameMode } from './types';
import { translations } from './translations';
import { Navbar } from './components/Navbar';
import { ArcadeGeneratorFlow } from './components/ArcadeGeneratorFlow';
import { LiveToasts } from './components/LiveToasts';
import { CpaConfigModal } from './components/CpaConfigModal';
import { FaqAndProof } from './components/FaqAndProof';
import { MonopolyDiceIcon, MonopolyDicePairIcon, FreeFireDiamondIcon } from './components/Icons';
import { ShieldCheck, Flame, Users, Sparkles } from 'lucide-react';

const STORAGE_CPA_KEY = 'monopoly_cpa_config';
const DEFAULT_CPA_URL =
  'https://app.trcefy.com/sl?id=6a2050db46d3cf0d62f32aa4&pid=2&sub2=u783751&sub6=s2smartLink&sub5=s1SUBID1HERE';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [gameMode, setGameMode] = useState<GameMode>('monopoly');
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
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden"
    >
      {/* Radiant Background Gradients like lmwo47.blogspot.com */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        gameMode={gameMode}
        onLanguageChange={setCurrentLang}
        onOpenCpaSettings={() => setShowConfigModal(true)}
      />

      {/* Hero Header Section (Inspired directly by lmwo47.blogspot.com) */}
      <section className="relative pt-8 pb-4 sm:pt-12 sm:pb-6 overflow-hidden z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Top Event Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold mb-4 shadow-md">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span>{t.badgeLimited}</span>
            <span className="text-slate-600">·</span>
            <span className="text-cyan-300 font-mono">
              {gameMode === 'monopoly' ? 'SCOPELY EVENT 2026' : 'GARENA FF EVENT'}
            </span>
          </div>

          {/* Main Headline H1 with Dice 🎲 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-tight sm:leading-tight">
            {gameMode === 'monopoly' ? (
              currentLang === 'ar' ? (
                <>
                  توليد <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">نرد MONOPOLY GO</span> مجاناً 🎲
                </>
              ) : (
                <>
                  MONOPOLY GO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">dice & rolls</span> 🎲
                </>
              )
            ) : (
              currentLang === 'ar' ? (
                <>
                  شحن <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">جواهر فري فاير مجاناً</span> 💎
                </>
              ) : (
                <>
                  Claim Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Free Fire Diamonds</span> Today
                </>
              )
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-3 leading-relaxed font-medium">
            {gameMode === 'monopoly' ? t.monopolySub : t.freefireSub}
          </p>

          {/* Trust Metrics Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.safeAntiBan}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.distributedTotal}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{t.noPasswordNeeded}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator Flow (Exact 4-Step interactive arcade sequence from lmwo47.blogspot.com) */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pb-12 w-full relative z-10">
        <ArcadeGeneratorFlow
          currentLang={currentLang}
          cpaConfig={cpaConfig}
          gameMode={gameMode}
          onGameModeChange={setGameMode}
        />

        {/* Social Proof & FAQ */}
        <div className="mt-14">
          <FaqAndProof currentLang={currentLang} gameMode={gameMode} />
        </div>
      </main>

      {/* Live Claims Notifications ("flamdigpage katih ich3art nas li khdaw جواهر / نرد") */}
      <LiveToasts currentLang={currentLang} gameMode={gameMode} />

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
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {gameMode === 'monopoly' ? (
              <MonopolyDiceIcon className="w-5 h-5" />
            ) : (
              <FreeFireDiamondIcon className="w-5 h-5" />
            )}
            <span className="font-bold text-slate-300">
              {gameMode === 'monopoly'
                ? 'Monopoly GO™ Dice Rolls Portal'
                : 'Free Fire™ Diamond Rewards Portal'}
            </span>
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
              className="text-slate-600 hover:text-slate-400 text-[10px] cursor-pointer"
            >
              CPA Smartlink Config
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-slate-900/60 text-[10px] text-slate-600 text-center sm:text-left leading-relaxed">
          Disclaimer: This web application is a promotional rewards portal for fans. Monopoly GO is a registered trademark of Scopely and Hasbro. Free Fire is a registered trademark of Garena International. This portal is not officially affiliated with or endorsed by Scopely, Hasbro, or Garena.
        </div>
      </footer>
    </div>
  );
}
