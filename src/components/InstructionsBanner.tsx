import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { UserCheck, Sparkles, ShieldCheck, Gift } from 'lucide-react';

interface InstructionsBannerProps {
  currentLang: Language;
}

export const InstructionsBanner: React.FC<InstructionsBannerProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const steps = [
    {
      num: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      icon: UserCheck,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400',
    },
    {
      num: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      icon: Sparkles,
      color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
    },
    {
      num: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    },
    {
      num: '04',
      title: t.step4Title,
      desc: t.step4Desc,
      icon: Gift,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-8 border-b border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            {currentLang === 'fr' ? 'GUIDE RAPIDE' : 'QUICK GUIDE'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-heading">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {t.howItWorksSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-xl border bg-gradient-to-b ${step.color} p-5 transition-transform hover:-translate-y-1 shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-slate-300">
                      STEP {step.num}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300/90 mb-3">
                    {step.desc}
                  </p>
                </div>
                {idx === 3 && (
                  <div className="mt-2 pt-2 border-t border-purple-500/30 flex items-center justify-between text-[11px] font-bold text-purple-300">
                    <span>{currentLang === 'fr' ? '1 seule offre requise' : 'Only 1 offer required'}</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase font-mono text-[10px]">
                      {currentLang === 'fr' ? 'Instantané' : 'Instant Unlock'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
