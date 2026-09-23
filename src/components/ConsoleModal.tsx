import React, { useEffect, useState } from 'react';
import { RewardPackage, Platform, Language } from '../types';
import { translations } from '../translations';
import { RedDiceIcon } from './Icons';
import { Terminal, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';

interface ConsoleModalProps {
  currentLang: Language;
  username: string;
  platform: Platform;
  pkg: RewardPackage;
  onFinish: () => void;
}

export const ConsoleModal: React.FC<ConsoleModalProps> = ({
  currentLang,
  username,
  platform,
  pkg,
  onFinish,
}) => {
  const t = translations[currentLang];
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(10);
  const [diceCounter, setDiceCounter] = useState(0);

  useEffect(() => {
    // Stage 1: Connect
    const timer1 = setTimeout(() => {
      setStep(1);
      setProgress(35);
    }, 1200);

    // Stage 2: Account verified & inject
    const timer2 = setTimeout(() => {
      setStep(2);
      setProgress(70);
    }, 2400);

    // Stage 3: Dice count up
    const timer3 = setTimeout(() => {
      setStep(3);
      setProgress(90);
    }, 3600);

    // Stage 4: Trigger CPA Lock
    const timer4 = setTimeout(() => {
      setStep(4);
      setProgress(100);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Dice counter animation
  useEffect(() => {
    if (step >= 2) {
      let current = 0;
      const target = pkg.diceCount;
      const increment = Math.ceil(target / 25);
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDiceCounter(target);
          clearInterval(interval);
        } else {
          setDiceCounter(current);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, pkg.diceCount]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-pulse-glow">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              Monopoly GO™ Generator Console v4.2
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
        </div>

        {/* Center Visual */}
        <div className="text-center my-4">
          <div className="inline-block p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-3">
            <RedDiceIcon className="w-16 h-16 animate-spin" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
            {step < 4 ? t.generatorTitle : t.botDetected}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Target User: <span className="text-amber-400 font-bold">@{username || 'Guest'}</span> [{platform.toUpperCase()}]
          </p>
        </div>

        {/* Dice counting display */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 my-4 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
            {t.dice} Generating
          </span>
          <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tabular-nums">
            +{diceCounter.toLocaleString()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="my-4">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
            <span>{step === 4 ? 'VERIFICATION HOLD' : 'PROCESSING'}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                step === 4 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-400 to-emerald-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Log Items */}
        <div className="space-y-2 text-xs font-mono bg-slate-950/90 rounded-xl p-3 border border-slate-800 max-h-36 overflow-y-auto">
          <div className="flex items-center gap-2 text-slate-300">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Establishing handshake with Scopely Monopoly GO servers...</span>
          </div>

          {step >= 1 && (
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>User authenticated: {username} on {platform.toUpperCase()}</span>
            </div>
          )}

          {step >= 2 && (
            <div className="flex items-center gap-2 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Injecting payload: {pkg.diceCount.toLocaleString()} Dice + {pkg.cashAmount}</span>
            </div>
          )}

          {step >= 3 && (
            <div className="flex items-center gap-2 text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Anti-bot trigger: Human verification required before release.</span>
            </div>
          )}
        </div>

        {/* Action Button once step 4 arrives */}
        {step >= 4 ? (
          <button
            type="button"
            onClick={onFinish}
            className="w-full mt-6 py-3.5 px-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:brightness-110 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all animate-bounce"
          >
            <ShieldAlert className="w-5 h-5" />
            <span>{t.completeOfferBtn}</span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>{t.connecting}</span>
          </div>
        )}
      </div>
    </div>
  );
};
