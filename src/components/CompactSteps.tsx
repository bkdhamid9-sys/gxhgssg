import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { UserCheck, Sparkles, ShieldCheck, Gift, ChevronRight } from 'lucide-react';

interface CompactStepsProps {
  currentLang: Language;
  currentStep: number; // 1: Username, 2: Package, 3: Generation, 4: Locker
}

export const CompactSteps: React.FC<CompactStepsProps> = ({ currentLang, currentStep }) => {
  const t = translations[currentLang];

  const steps = [
    {
      num: 1,
      title: currentLang === 'fr' ? '1. Pack de Dés' : '1. Dice Bundle',
      sub: currentLang === 'fr' ? '3 Choix exclusifs' : 'Choose Rolls',
      icon: Sparkles,
    },
    {
      num: 2,
      title: currentLang === 'fr' ? '2. Appareil & Pseudo' : '2. Device & User',
      sub: currentLang === 'fr' ? 'Android / iOS / PC' : 'Android / iOS / PC',
      icon: UserCheck,
    },
    {
      num: 3,
      title: currentLang === 'fr' ? '3. Déblocage Immédiat' : '3. Instant Release',
      sub: currentLang === 'fr' ? 'Vérification 1 clic' : '1-Click Verification',
      icon: Gift,
      highlight: true,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 relative">
          {steps.map((st) => {
            const Icon = st.icon;
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <div
                key={st.num}
                className={`relative rounded-xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 transition-all ${
                  isCurrent
                    ? 'bg-amber-400/15 border border-amber-400/50 shadow-sm shadow-amber-500/10'
                    : isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'bg-slate-950/40 border border-slate-800/60 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : isCompleted
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : st.highlight
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <div className="text-center sm:text-left overflow-hidden">
                  <div className="flex items-center gap-1 justify-center sm:justify-start">
                    <span
                      className={`text-[11px] sm:text-xs font-black truncate ${
                        isCurrent
                          ? 'text-amber-400'
                          : isCompleted
                          ? 'text-emerald-400'
                          : st.highlight
                          ? 'text-purple-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {st.title}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 block truncate hidden xs:block">
                    {st.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
