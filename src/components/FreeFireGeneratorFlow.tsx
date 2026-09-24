import React, { useState } from 'react';
import { Platform, Language, CpaConfig, DiamondPackage } from '../types';
import { translations } from '../translations';
import { FreeFireDiamondIcon, FreeFireFlameBadge, BooyahIcon } from './Icons';
import {
  Smartphone,
  Apple,
  Monitor,
  Shield,
  CheckCircle2,
  Sparkles,
  Crown,
  Zap,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  AlertTriangle,
  Flame,
  User,
} from 'lucide-react';

export const diamondPackages: DiamondPackage[] = [
  {
    id: 'ff-1060',
    name: 'Starter Pack',
    diamondCount: 1060,
    bonusCount: 100,
    popular: false,
    colorScheme: 'cyan',
  },
  {
    id: 'ff-2180',
    name: 'Royale Pack',
    diamondCount: 2180,
    bonusCount: 250,
    popular: true,
    colorScheme: 'amber',
  },
  {
    id: 'ff-5600',
    name: 'Pro VIP Pack',
    diamondCount: 5600,
    bonusCount: 650,
    popular: false,
    colorScheme: 'purple',
  },
  {
    id: 'ff-11500',
    name: 'Elite Legend Pack',
    diamondCount: 11500,
    bonusCount: 1500,
    popular: false,
    colorScheme: 'red',
  },
];

interface FreeFireGeneratorFlowProps {
  currentLang: Language;
  cpaConfig: CpaConfig;
}

export const FreeFireGeneratorFlow: React.FC<FreeFireGeneratorFlowProps> = ({
  currentLang,
  cpaConfig,
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  // Screen state: 1 = Enter ID & Device, 2 = Select Diamonds & Direct CTA
  const [currentScreen, setCurrentScreen] = useState<1 | 2>(1);

  // User input states
  const [playerId, setPlayerId] = useState('');
  const [platform, setPlatform] = useState<Platform>('android');
  const [encryption, setEncryption] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage>(diamondPackages[1]);
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Proceed from Screen 1 to Screen 2
  const handleProceedToScreen2 = () => {
    const cleanId = playerId.trim();
    if (!cleanId || cleanId.length < 5) {
      setError(t.idError);
      return;
    }
    setError('');
    setCurrentScreen(2);
    // Smooth scroll to top of card
    window.scrollTo({ top: 140, behavior: 'smooth' });
  };

  // Direct Click to CPA Smartlink with mandatory warning notice
  const handleClaimDiamonds = () => {
    setIsRedirecting(true);

    const defaultUrl =
      'https://app.trcefy.com/sl?id=6a2050db46d3cf0d62f32aa4&pid=2&sub2=u783751&sub6=s2smartLink&sub5=s1SUBID1HERE';

    let targetUrl = cpaConfig.lockerUrl || defaultUrl;

    const trackingValue = encodeURIComponent(
      `FF_${playerId.trim()}_${platform}_${selectedPackage.diamondCount}`
    );

    if (targetUrl.includes('sub5=s1SUBID1HERE')) {
      targetUrl = targetUrl.replace('sub5=s1SUBID1HERE', `sub5=${trackingValue}`);
    } else if (targetUrl.includes('sub5=')) {
      if (targetUrl.endsWith('sub5=')) {
        targetUrl = targetUrl + trackingValue;
      }
    }

    // Open link directly
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsRedirecting(false);
    }, 2500);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* 2-Step Interactive Breadcrumb */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {/* Step 1 Tab */}
          <button
            type="button"
            onClick={() => setCurrentScreen(1)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              currentScreen === 1
                ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'bg-slate-950/50 border-slate-800/80 opacity-70 hover:opacity-100'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                currentScreen === 1
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-emerald-400'
              }`}
            >
              {currentScreen > 1 ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : '1'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs sm:text-sm font-bold text-white truncate">
                {t.step1Title}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                {t.step1Sub}
              </div>
            </div>
          </button>

          {/* Step 2 Tab */}
          <div
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              currentScreen === 2
                ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'bg-slate-950/50 border-slate-800/80 opacity-50'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                currentScreen === 2
                  ? 'bg-cyan-400 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </div>
            <div className="overflow-hidden">
              <div className="text-xs sm:text-sm font-bold text-white truncate">
                {t.step2Title}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                {t.step2Sub}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCREEN 1: Enter Free Fire ID & Select Platform (Device) */}
      {/* ======================================================== */}
      {currentScreen === 1 && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Top Fire Gradient Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400" />

          {/* Header Title */}
          <div className="text-center max-w-xl mx-auto mb-7">
            <span className="text-[11px] font-black tracking-wider uppercase text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>{t.screen1Title}</span>
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white font-heading">
              {currentLang === 'ar'
                ? 'أدخل مُعرّف حسابك (UID) واختر نظام تشغيل جهازك'
                : currentLang === 'fr'
                ? 'Entrez votre ID Free Fire & Choisissez votre appareil'
                : 'Enter Your Free Fire ID & Select Device'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {t.screen1Desc}
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            {/* Free Fire ID Input */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 mb-2">
                {t.idLabel}
              </label>
              <div className="relative">
                <div className={`absolute top-3.5 ${isRtl ? 'right-4' : 'left-4'} text-slate-500`}>
                  <User className="w-5 h-5 text-amber-400" />
                </div>
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => {
                    setPlayerId(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t.idPlaceholder}
                  className={`w-full py-3.5 rounded-xl bg-slate-950 border ${
                    isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  } ${
                    error
                      ? 'border-red-500 ring-2 ring-red-500/20'
                      : 'border-slate-700 focus:border-amber-400'
                  } text-white font-mono text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all`}
                />
                {playerId.trim().length >= 5 && (
                  <div
                    className={`absolute top-3.5 ${
                      isRtl ? 'left-4' : 'right-4'
                    } text-emerald-400 flex items-center gap-1`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>
              {error ? (
                <p className="text-xs text-red-400 mt-2 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 mt-1.5">
                  {currentLang === 'ar'
                    ? '💡 يمكنك العثور على مُعرّف اللاعب (UID) داخل ملفك الشخصي في لعبة فري فاير'
                    : '💡 You can find your Player UID in your Free Fire in-game profile'}
                </p>
              )}
            </div>

            {/* Platform Selector (Android, iOS, PC / Emulator) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 mb-2.5">
                {t.selectPlatform}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Android */}
                <button
                  type="button"
                  onClick={() => setPlatform('android')}
                  className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    platform === 'android'
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-7 h-7 text-emerald-400" />
                  <span className="font-heading tracking-wide">{t.android}</span>
                </button>

                {/* iOS */}
                <button
                  type="button"
                  onClick={() => setPlatform('ios')}
                  className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    platform === 'ios'
                      ? 'border-amber-400 bg-amber-400/20 text-amber-300 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10 scale-[1.02]'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Apple className="w-7 h-7 text-amber-300" />
                  <span className="font-heading tracking-wide">{t.ios}</span>
                </button>

                {/* PC / Emulator */}
                <button
                  type="button"
                  onClick={() => setPlatform('pc')}
                  className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    platform === 'pc'
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-7 h-7 text-cyan-400" />
                  <span className="font-heading tracking-wide">{t.pc}</span>
                </button>
              </div>
            </div>

            {/* Anti-Ban Proxy Toggle */}
            <div
              onClick={() => setEncryption(!encryption)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield
                  className={`w-5 h-5 ${encryption ? 'text-emerald-400' : 'text-slate-500'}`}
                />
                <div>
                  <span className="text-xs sm:text-sm text-slate-200 font-bold block">
                    {t.antiBanLabel}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Garena Anti-Detection 2026 ACTIVE
                  </span>
                </div>
              </div>
              <div
                className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors ${
                  encryption ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md" />
              </div>
            </div>

            {/* Proceed to Screen 2 Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleProceedToScreen2}
                className="w-full py-4 px-6 rounded-2xl font-black text-slate-950 text-base sm:text-lg uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] font-heading"
              >
                <span>{t.proceedToStep2Btn}</span>
                {isRtl ? (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCREEN 2: Select Diamonds & Direct Link to CPA with Warning Notice  */}
      {/* =================================================================== */}
      {currentScreen === 2 && (
        <div className="space-y-6">
          {/* Header Summary & Back Button */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setCurrentScreen(1)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-amber-400 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.changeAccount}</span>
            </button>

            {/* Verified Player Badge */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden xs:inline">{t.playerAccountCard}</span>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>UID: {playerId}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 uppercase">
                  {platform}
                </span>
              </div>
            </div>
          </div>

          {/* Diamonds Pack Selection Card */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            {/* Cyan Glow Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600" />

            <div className="text-center max-w-xl mx-auto mb-7">
              <span className="text-[11px] font-black tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2.5">
                <FreeFireDiamondIcon className="w-4 h-4" />
                <span>{t.screen2Title}</span>
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white font-heading">
                {currentLang === 'ar'
                  ? 'اختر باقة جواهر فري فاير المناسبة لك'
                  : currentLang === 'fr'
                  ? 'Choisissez votre pack de Diamants Free Fire'
                  : 'Choose Your Free Fire Diamond Bundle'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                {t.screen2Desc}
              </p>
            </div>

            {/* 4 Free Fire Diamond Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
              {diamondPackages.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;

                let cardBorder =
                  'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300';
                let badgeBg = 'bg-slate-800 text-slate-300';
                let badgeText = pkg.name;

                if (pkg.id === 'ff-1060') {
                  badgeText = t.starterPack;
                  badgeBg = 'bg-cyan-600 text-white';
                  if (isSelected) {
                    cardBorder =
                      'border-cyan-400 bg-cyan-950/20 ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/15 text-white';
                  }
                } else if (pkg.id === 'ff-2180') {
                  badgeText = t.mostPopular;
                  badgeBg = 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-white';
                  if (isSelected) {
                    cardBorder =
                      'border-amber-400 bg-amber-950/20 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/20 text-white';
                  }
                } else if (pkg.id === 'ff-5600') {
                  badgeText = t.vipPack;
                  badgeBg = 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white';
                  if (isSelected) {
                    cardBorder =
                      'border-purple-500 bg-purple-950/20 ring-2 ring-purple-500/50 shadow-xl shadow-purple-500/15 text-white';
                  }
                } else if (pkg.id === 'ff-11500') {
                  badgeText = t.legendPack;
                  badgeBg = 'bg-gradient-to-r from-rose-600 to-red-600 text-white';
                  if (isSelected) {
                    cardBorder =
                      'border-rose-500 bg-rose-950/20 ring-2 ring-rose-500/50 shadow-xl shadow-rose-500/20 text-white';
                  }
                }

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 transform ${
                      isSelected ? 'scale-[1.03]' : 'hover:scale-[1.01]'
                    } ${cardBorder}`}
                  >
                    {/* Top Package Badge */}
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow whitespace-nowrap ${badgeBg}`}
                    >
                      {badgeText}
                    </div>

                    <div className="text-center pt-2">
                      {/* Glowing Diamond Icon */}
                      <div className="flex justify-center mb-3">
                        <FreeFireDiamondIcon className="w-14 h-14 animate-float" />
                      </div>

                      {/* Diamond Count */}
                      <div className="text-3xl font-black font-mono tracking-tight text-white mb-0.5">
                        {pkg.diamondCount.toLocaleString()}
                      </div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2 font-heading">
                        {t.diamonds}
                      </span>

                      {/* Bonus diamonds pill */}
                      <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-400 font-bold mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>+{pkg.bonusCount} Bonus</span>
                      </div>
                    </div>

                    {/* Radio Select indicator */}
                    <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs font-bold">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                            : 'border-slate-600 bg-slate-900'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span className={isSelected ? 'text-cyan-400' : 'text-slate-400'}>
                        {isSelected ? t.selectedBadge : t.selectBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <FreeFireDiamondIcon className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>
                  {t.bundleReady}{' '}
                  <strong className="text-white font-mono text-sm sm:text-base">
                    {selectedPackage.diamondCount.toLocaleString()} {t.diamonds}
                  </strong>{' '}
                  <span className="text-amber-300 font-bold font-mono">
                    (+{selectedPackage.bonusCount} {currentLang === 'ar' ? 'مكافأة إضافية مجانية' : currentLang === 'fr' ? 'Bonus Gratuit' : 'Free Bonus'})
                  </span>
                </span>
              </div>
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                UID: {playerId}
              </span>
            </div>

            {/* ======================================================== */}
            {/* MAIN DIRECT CTA BUTTON (Linked directly to CPA SmartLink)*/}
            {/* ======================================================== */}
            <div>
              <button
                type="button"
                onClick={handleClaimDiamonds}
                className="w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-slate-950 text-base sm:text-xl uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-amber-400 to-yellow-400 hover:brightness-110 shadow-2xl shadow-cyan-500/25 flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] font-heading"
              >
                <FreeFireDiamondIcon className="w-7 h-7 text-slate-950" />
                <span>
                  {t.claimDiamondsBtn.replace(
                    '{count}',
                    selectedPackage.diamondCount.toLocaleString()
                  )}
                </span>
                <ExternalLink className="w-6 h-6 text-slate-950" />
              </button>

              {/* ======================================================== */}
              {/* HIGH CONVERSION MANDATORY WARNING BOX (UNDER THE BUTTON) */}
              {/* ======================================================== */}
              <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/80 via-amber-950/60 to-red-950/80 border-2 border-red-500/70 shadow-2xl">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 shrink-0 mt-0.5 border border-red-500/50 animate-pulse">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-red-400">
                        {t.mandatoryWarningTitle}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-red-500/30 text-red-200 font-extrabold border border-red-500/40">
                        {t.actionRequiredBadge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                      {currentLang === 'ar' ? (
                        <>
                          بمجرد الضغط على الزر أعلاه،{' '}
                          <strong className="text-amber-300 underline font-extrabold">
                            يجب عليك إكمال المهمة التأكيدية المطلوبة منك كاملة حتى النهاية
                          </strong>{' '}
                          ليتم التحقق من هويتك وتأكيد إرسال الجواهر بنجاح إلى حسابك عبر سيرفرات فري فاير الرسمية.{' '}
                          <span className="text-red-300 font-extrabold block sm:inline mt-1 sm:mt-0">
                            تنبيه إلزامي: إذا لم تكمل هذه الخطوة بالكامل فلن تتمكن من استلام أي جواهر!
                          </span>
                        </>
                      ) : (
                        t.mandatoryWarningText
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
