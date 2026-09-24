import React, { useState, useEffect, useRef } from 'react';
import { Platform, Language, CpaConfig, RewardBundle, GameMode } from '../types';
import { translations } from '../translations';
import { MonopolyDiceIcon, MonopolyDicePairIcon, FreeFireDiamondIcon, BooyahIcon } from './Icons';
import { sounds } from '../utils/sound';
import {
  Smartphone,
  Apple,
  Monitor,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Flame,
  User,
  Settings2,
  RotateCw,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const monopolyBundles: RewardBundle[] = [
  {
    id: 'mg-2500',
    name: 'Rolls Starter Pack',
    count: 2500,
    bonusCount: 250,
    popular: false,
    colorScheme: 'cyan',
  },
  {
    id: 'mg-4200',
    name: 'Tournament Roll Pack',
    count: 4200,
    bonusCount: 500,
    popular: false,
    colorScheme: 'amber',
  },
  {
    id: 'mg-8250',
    name: 'Tycoon High Roller Pack',
    count: 8250,
    bonusCount: 1000,
    popular: false,
    colorScheme: 'purple',
  },
  {
    id: 'mg-13500',
    name: 'Mega Board Dominator Pack',
    count: 13500,
    bonusCount: 2500,
    popular: true,
    colorScheme: 'red',
  },
];

export const freefireBundles: RewardBundle[] = [
  {
    id: 'ff-1060',
    name: 'Starter Bundle',
    count: 1060,
    bonusCount: 100,
    popular: false,
    colorScheme: 'cyan',
  },
  {
    id: 'ff-2180',
    name: 'Royale Pass Bundle',
    count: 2180,
    bonusCount: 250,
    popular: true,
    colorScheme: 'amber',
  },
  {
    id: 'ff-5600',
    name: 'Pro VIP Bundle',
    count: 5600,
    bonusCount: 650,
    popular: false,
    colorScheme: 'purple',
  },
  {
    id: 'ff-11500',
    name: 'Elite Legend Pack',
    count: 11500,
    bonusCount: 1500,
    popular: false,
    colorScheme: 'red',
  },
];

interface ArcadeGeneratorFlowProps {
  currentLang: Language;
  cpaConfig: CpaConfig;
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
}

export const ArcadeGeneratorFlow: React.FC<ArcadeGeneratorFlowProps> = ({
  currentLang,
  cpaConfig,
  gameMode,
  onGameModeChange,
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  // Step 1 = Account & Platform, Step 2 = Select Amount, Step 3 = Sync Animation, Step 4 = Last Step (Locker CTA)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Inputs
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<Platform>('android');
  const [inputError, setInputError] = useState('');

  // Selected bundle
  const activeBundles = gameMode === 'monopoly' ? monopolyBundles : freefireBundles;
  const [selectedBundle, setSelectedBundle] = useState<RewardBundle>(activeBundles[3]); // default 13500 or 11500

  // Whenever gameMode changes, pick the popular bundle from that game
  useEffect(() => {
    const list = gameMode === 'monopoly' ? monopolyBundles : freefireBundles;
    const popular = list.find((b) => b.popular) || list[0];
    setSelectedBundle(popular);
  }, [gameMode]);

  // Console syncing animation state (Step 3)
  const [syncPhase, setSyncPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [syncCounter, setSyncCounter] = useState(0);
  const [syncProgress, setSyncProgress] = useState(10);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timerRefs.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Step 1 -> Step 2 validation
  const handleProceedToStep2 = () => {
    sounds.playClick();
    const clean = username.trim();
    if (!clean || clean.length < 3) {
      sounds.playClick();
      setInputError(gameMode === 'monopoly' ? t.usernameErrorMonopoly : t.usernameErrorFreefire);
      return;
    }
    setInputError('');
    setCurrentStep(2);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Step 2 -> Step 3 trigger interactive generator
  const handleProceedToStep3 = () => {
    sounds.playSelect();
    setCurrentStep(3);
    setSyncPhase(1);
    setSyncCounter(0);
    setSyncProgress(15);
    window.scrollTo({ top: 180, behavior: 'smooth' });

    // Step 3 Phase 1: Server connection (1.2s)
    const t1 = setTimeout(() => {
      setSyncPhase(2);
      setSyncProgress(35);
      sounds.playClick();

      // Step 3 Phase 2: Found Account (1.5s)
      const t2 = setTimeout(() => {
        setSyncPhase(3);
        setSyncProgress(50);
        sounds.playClick();

        // Step 3 Phase 3: Counting up to target amount!
        const target = selectedBundle.count;
        const duration = 2500; // ms
        const steps = 30;
        const intervalTime = duration / steps;
        let currentVal = 0;

        const counterInterval = setInterval(() => {
          currentVal += Math.ceil(target / steps);
          if (currentVal >= target) {
            currentVal = target;
            clearInterval(counterInterval);
            sounds.playSuccess();
            setSyncCounter(target);
            setSyncProgress(88);
            setSyncPhase(4);

            // Step 3 Phase 4: Finalizing & Securing
            const t3 = setTimeout(() => {
              setSyncPhase(5);
              setSyncProgress(100);

              // Step 3 Phase 5: Transition to Step 4 Last Step
              const t4 = setTimeout(() => {
                setCurrentStep(4);
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }, 1200);
              timerRefs.current.push(t4);
            }, 1400);
            timerRefs.current.push(t3);
          } else {
            sounds.playTick();
            setSyncCounter(currentVal);
          }
        }, intervalTime);
      }, 1600);
      timerRefs.current.push(t2);
    }, 1200);
    timerRefs.current.push(t1);
  };

  // Action Button in Step 4 -> Direct Redirect to CPA Smartlink with Tracking!
  const handleClaimReward = () => {
    sounds.playSuccess();

    const defaultUrl =
      'https://app.trcefy.com/sl?id=6a2050db46d3cf0d62f32aa4&pid=2&sub2=u783751&sub6=s2smartLink&sub5=s1SUBID1HERE';

    let targetUrl = cpaConfig.lockerUrl || defaultUrl;

    const trackingValue = encodeURIComponent(
      `${gameMode.toUpperCase()}_${username.trim()}_${platform}_${selectedBundle.count}`
    );

    if (targetUrl.includes('sub5=s1SUBID1HERE')) {
      targetUrl = targetUrl.replace('sub5=s1SUBID1HERE', `sub5=${trackingValue}`);
    } else if (targetUrl.includes('sub5=')) {
      if (targetUrl.endsWith('sub5=')) {
        targetUrl = targetUrl + trackingValue;
      }
    }

    // Direct redirect to smartlink
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const resourceWord = gameMode === 'monopoly' ? t.diceUnit : t.diamondUnit;
  const platformName = platform === 'pc' ? t.windowsPc : platform === 'ios' ? t.ios : t.android;

  return (
    <div className={`w-full max-w-3xl mx-auto space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Game Mode Switcher Tab (Monopoly GO 🎲 <-> Free Fire 💎) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs font-bold text-slate-300">{t.switchGameMode}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onGameModeChange('monopoly');
              setCurrentStep(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${
              gameMode === 'monopoly'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 ring-2 ring-red-400'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MonopolyDiceIcon className="w-4 h-4" />
            <span>{t.modeMonopoly}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onGameModeChange('freefire');
              setCurrentStep(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${
              gameMode === 'freefire'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FreeFireDiamondIcon className="w-4 h-4" />
            <span>{t.modeFreefire}</span>
          </button>
        </div>
      </div>

      {/* Main Authentic Polygon Arcade Card Wrapper */}
      <div className="relative pt-6">
        {/* Step Circular Badge Sitting on the top edge (Authentic .sipo-s from lmwo47.blogspot.com) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="w-14 h-14 rounded-full step-circle-badge flex items-center justify-center font-black text-2xl shadow-2xl">
            {currentStep === 4 ? (
              <CheckCircle2 className="w-8 h-8 text-slate-950 stroke-[2.5]" />
            ) : (
              <span>{currentStep}</span>
            )}
          </div>
        </div>

        {/* 3D Offset Shadow Background */}
        <div className="absolute inset-0 top-6 bg-black/40 rounded-3xl -rotate-0.5 translate-y-1.5 translate-x-1 blur-[1px] pointer-events-none" />

        {/* The Card Body */}
        <div className="relative bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-950 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-10 pt-12 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Glow inside Card */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-500/10 via-red-500/10 to-transparent blur-2xl pointer-events-none" />

          {/* ======================================================== */}
          {/* STEP 1: USERNAME & PLATFORM (Exact clone of lmwo47.blogspot.com) */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Step Title / Prompt */}
              <div className="text-center space-y-2">
                <h2 className="text-lg sm:text-2xl font-black text-white font-heading">
                  {gameMode === 'monopoly' ? t.step1PromptMonopoly : t.step1PromptFreefire}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {gameMode === 'monopoly'
                    ? 'أدخل اسمك داخل Monopoly Go لاكتشاف حسابك وإرسال رولات النرد'
                    : 'أدخل مُعرّف الـ UID الخاص بك في فري فاير لتجهيز الجواهر'}
                </p>
              </div>

              {/* Username Input Field with Face / User Icon */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-amber-400">
                    <User className="w-6 h-6 opacity-75" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (inputError) setInputError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleProceedToStep2();
                    }}
                    placeholder={
                      gameMode === 'monopoly'
                        ? t.usernamePlaceholderMonopoly
                        : t.usernamePlaceholderFreefire
                    }
                    className="w-full h-16 ps-14 pe-4 bg-slate-950/90 border-2 border-slate-700 focus:border-amber-400 text-white font-bold text-base sm:text-lg rounded-2xl placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all font-mono"
                  />
                </div>

                {inputError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{inputError}</span>
                  </div>
                )}
              </div>

              {/* Platform Selector Boxes (.psiw-w from lmwo47.blogspot.com) */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-slate-300 text-center sm:text-start">
                  {t.platformPrompt}
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {/* Windows PC */}
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSelect();
                      setPlatform('pc');
                    }}
                    className={`h-20 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-bold cursor-pointer transition-all transform active:scale-95 ${
                      platform === 'pc'
                        ? 'border-amber-400 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 scale-[1.03]'
                        : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <Monitor className={`w-7 h-7 sm:w-8 sm:h-8 ${platform === 'pc' ? 'text-amber-400' : ''}`} />
                    <span className="text-xs sm:text-sm">{t.windowsPc}</span>
                  </button>

                  {/* Android */}
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSelect();
                      setPlatform('android');
                    }}
                    className={`h-20 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-bold cursor-pointer transition-all transform active:scale-95 ${
                      platform === 'android'
                        ? 'border-amber-400 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 scale-[1.03]'
                        : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className={`w-7 h-7 sm:w-8 sm:h-8 ${platform === 'android' ? 'text-amber-400' : ''}`} />
                    <span className="text-xs sm:text-sm">{t.android}</span>
                  </button>

                  {/* Apple iOS */}
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSelect();
                      setPlatform('ios');
                    }}
                    className={`h-20 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-bold cursor-pointer transition-all transform active:scale-95 ${
                      platform === 'ios'
                        ? 'border-amber-400 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 scale-[1.03]'
                        : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <Apple className={`w-7 h-7 sm:w-8 sm:h-8 ${platform === 'ios' ? 'text-amber-400' : ''}`} />
                    <span className="text-xs sm:text-sm">{t.ios}</span>
                  </button>
                </div>
              </div>

              {/* 3D Yellow Arcade Proceed Button */}
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-slate-950 text-base sm:text-xl uppercase tracking-wider arcade-btn-yellow flex items-center justify-center gap-3 cursor-pointer font-heading mt-6"
              >
                <span>{t.proceedBtn}</span>
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: SELECT AMOUNT (Exact clone of lmwo47.blogspot.com) */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Step Title */}
              <div className="text-center space-y-1.5">
                <h2 className="text-lg sm:text-2xl font-black text-white font-heading">
                  {gameMode === 'monopoly' ? t.step2TitleMonopoly : t.step2TitleFreefire}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-300 font-mono font-bold">
                  <User className="w-3.5 h-3.5" />
                  <span>{username}</span>
                  <span className="text-slate-500">|</span>
                  <span>{platformName}</span>
                </div>
              </div>

              {/* 4 Cards Grid (2500, 4200, 8250, 13500) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeBundles.map((bundle) => {
                  const isSelected = selectedBundle.id === bundle.id;

                  return (
                    <button
                      key={bundle.id}
                      type="button"
                      onClick={() => {
                        sounds.playSelect();
                        setSelectedBundle(bundle);
                      }}
                      className={`relative rounded-2xl border-2 p-3 sm:p-4 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 transform ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/15 shadow-xl shadow-amber-500/20 scale-[1.04]'
                          : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Popular / Best Value Badge */}
                      {bundle.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-500 text-white shadow">
                          {t.mostPopularBadge}
                        </div>
                      )}

                      <div className="flex flex-col items-center pt-2">
                        {/* Icon */}
                        <div className="mb-2">
                          {gameMode === 'monopoly' ? (
                            <MonopolyDiceIcon className="w-12 h-12 animate-float" />
                          ) : (
                            <FreeFireDiamondIcon className="w-12 h-12 animate-float" />
                          )}
                        </div>

                        {/* Amount */}
                        <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">
                          {bundle.count.toLocaleString()}
                        </div>
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                          {resourceWord}
                        </div>

                        {/* Bonus */}
                        <div className="mt-2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          +{bundle.bonusCount} {t.bonusText}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-400 bg-amber-400 text-slate-950'
                              : 'border-slate-600 bg-slate-900'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                        <span className={isSelected ? 'text-amber-400' : 'text-slate-500'}>
                          {isSelected ? '✓' : ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Amount Preview Card (from lmwo47.blogspot.com) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-red-500/10 to-amber-500/15 border-2 border-amber-400/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {gameMode === 'monopoly' ? (
                    <MonopolyDicePairIcon className="w-12 h-12" />
                  ) : (
                    <FreeFireDiamondIcon className="w-12 h-12" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-300">{t.selectedAmountLabel}</div>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                      {selectedBundle.count.toLocaleString()}{' '}
                      <span className="text-amber-400 text-lg sm:text-xl">{resourceWord}</span>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    +{selectedBundle.bonusCount} {t.bonusText}
                  </span>
                </div>
              </div>

              {/* 3D Yellow Arcade Proceed Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setCurrentStep(1);
                  }}
                  className="py-4 px-5 rounded-2xl border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-bold cursor-pointer transition-all"
                >
                  ← {isRtl ? 'الرجوع' : 'Back'}
                </button>

                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="flex-1 py-4 sm:py-5 px-6 rounded-2xl font-black text-slate-950 text-base sm:text-xl uppercase tracking-wider arcade-btn-yellow flex items-center justify-center gap-3 cursor-pointer font-heading"
                >
                  <span>{t.proceedToSyncBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: LIVE GENERATOR CONSOLE (Interactive count & gear) */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 text-center py-4">
              {/* Spinning Gear / Loader Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-400/40 flex items-center justify-center animate-spin">
                  <Settings2 className="w-10 h-10 text-amber-400" />
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-2 max-w-md mx-auto">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
                  <span>PROGRESS</span>
                  <span className="text-amber-400">{syncProgress}%</span>
                </div>
                <div className="w-full h-4 bg-slate-950 border border-slate-700 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-300"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>

              {/* Status Message based on syncPhase */}
              <div className="min-h-16 flex items-center justify-center">
                {syncPhase === 1 && (
                  <p className="text-sm sm:text-base font-bold text-slate-200 animate-pulse">
                    {t.syncStep1}
                  </p>
                )}
                {syncPhase === 2 && (
                  <p className="text-sm sm:text-base font-bold text-slate-200">
                    {t.syncStep2
                      .replace('{username}', username)
                      .replace('{platform}', platformName)}
                  </p>
                )}
                {syncPhase === 3 && (
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-bold text-emerald-400">
                      {t.syncStep2Found}
                    </p>
                    <p className="text-base sm:text-lg font-black text-amber-300">
                      {t.syncStep3
                        .replace('{amount}', syncCounter.toLocaleString())
                        .replace('{resource}', resourceWord)
                        .replace('{username}', username)}
                    </p>
                  </div>
                )}
                {syncPhase === 4 && (
                  <p className="text-sm sm:text-base font-bold text-emerald-300 animate-pulse">
                    {t.syncStep4}
                  </p>
                )}
                {syncPhase === 5 && (
                  <p className="text-sm sm:text-base font-bold text-amber-300 animate-pulse">
                    {t.syncStep5}
                  </p>
                )}
              </div>

              {/* Animated Live Counter Badge */}
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono shadow-inner">
                {gameMode === 'monopoly' ? (
                  <MonopolyDiceIcon className="w-8 h-8 animate-bounce" />
                ) : (
                  <FreeFireDiamondIcon className="w-8 h-8 animate-bounce" />
                )}
                <div className="text-start">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">GENERATED</div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {syncCounter.toLocaleString()}{' '}
                    <span className="text-amber-400 text-sm">{resourceWord}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: LAST STEP (VERIFICATION & DIRECT SMARTLINK CTA)  */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Header Title & Greeting */}
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-3xl font-black text-white font-heading">
                  {t.lastStepTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
                  {t.lastStepGreeting
                    .replace('{username}', username)
                    .replace('{amount}', selectedBundle.count.toLocaleString())
                    .replace('{resource}', resourceWord)}
                </p>
              </div>

              {/* Summary Card (Icon, Quantity, Username, Platform, Status) */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border-2 border-amber-400/50 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    {gameMode === 'monopoly' ? (
                      <MonopolyDicePairIcon className="w-14 h-14" />
                    ) : (
                      <FreeFireDiamondIcon className="w-14 h-14" />
                    )}
                    <div>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                        {selectedBundle.count.toLocaleString()}{' '}
                        <span className="text-amber-400 text-lg">{resourceWord}</span>
                      </div>
                      <div className="text-xs text-emerald-400 font-bold font-mono">
                        +{selectedBundle.bonusCount} {t.bonusText}
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.summaryStatusReady}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-500 font-bold">{t.summaryAccountLabel}</div>
                    <div className="text-white font-mono font-bold truncate text-sm mt-0.5">
                      {username}
                    </div>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-slate-500 font-bold">{t.summaryPlatformLabel}</div>
                    <div className="text-white font-mono font-bold text-sm mt-0.5">
                      {platformName}
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* THE BIG ACTION BUTTON - DIRECT LINK TO TRCEFY SMARTLINK   */}
              {/* ======================================================== */}
              <div>
                <button
                  type="button"
                  onClick={handleClaimReward}
                  className="w-full py-5 sm:py-6 px-6 rounded-2xl font-black text-slate-950 text-lg sm:text-2xl uppercase tracking-wider arcade-btn-yellow flex items-center justify-center gap-3 cursor-pointer font-heading transform hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  {gameMode === 'monopoly' ? (
                    <MonopolyDiceIcon className="w-8 h-8" />
                  ) : (
                    <FreeFireDiamondIcon className="w-8 h-8" />
                  )}
                  <span>
                    {gameMode === 'monopoly'
                      ? t.verifyNowBtnMonopoly.replace(
                          '{amount}',
                          selectedBundle.count.toLocaleString()
                        )
                      : t.verifyNowBtnFreefire.replace(
                          '{amount}',
                          selectedBundle.count.toLocaleString()
                        )}
                  </span>
                  <ExternalLink className="w-6 h-6 stroke-[2.5]" />
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
                            ليتم التحقق من هويتك وتأكيد إرسال النرد / الجواهر بنجاح إلى حسابك عبر السيرفرات الرسمية.{' '}
                            <span className="text-red-300 font-extrabold block sm:inline mt-1 sm:mt-0">
                              تنبيه إلزامي: إذا لم تكمل هذه الخطوة بالكامل فلن تتمكن من استلام أي شيء!
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
          )}
        </div>
      </div>
    </div>
  );
};
