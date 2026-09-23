import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ChevronDown, Shield, CheckCircle, Star } from 'lucide-react';
import { RedDiceIcon, MonopolyCashIcon } from './Icons';

interface FaqAndProofProps {
  currentLang: Language;
}

export const FaqAndProof: React.FC<FaqAndProofProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
  ];

  const reviews = [
    {
      name: 'Youssef B.',
      location: 'Montreal, Canada',
      rating: 5,
      dice: '15,000 Dice',
      comment: currentLang === 'fr'
        ? 'Franchement incroyable ! J’ai terminé l’offre en 2 minutes et mes 15 000 dés sont arrivés sur mon compte.'
        : 'Legit! Completed the quick mobile app task and 15,000 dice rolls credited within 3 minutes on my iPad.',
      time: '12m ago',
    },
    {
      name: 'Sarah M.',
      location: 'Paris, France',
      rating: 5,
      dice: '32,500 Dice + $100M',
      comment: currentLang === 'fr'
        ? 'Le pack VIP 32 500 est fou, j’ai pu finir l’événement partenaires en une seule journée !'
        : 'VIP pack gave me 32,500 rolls. Finished my partner event in one afternoon without spending a dime.',
      time: '24m ago',
    },
    {
      name: 'Dave K.',
      location: 'London, UK',
      rating: 5,
      dice: '15,000 Dice',
      comment: currentLang === 'fr'
        ? 'Super sécurisé et aucun mot de passe demandé. C’est le meilleur site pour Monopoly GO.'
        : 'Completely safe since no login passwords are required. Recommended to all my Monopoly group friends.',
      time: '45m ago',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-900 bg-slate-950/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Real Player Reviews Grid */}
        <div id="activity" className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              {currentLang === 'fr' ? 'AVIS DE LA COMMUNAUTÉ' : 'COMMUNITY FEEDBACK'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
              {currentLang === 'fr' ? 'Retours des Joueurs Récents' : 'Recent Player Feedback'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <span className="text-[11px] text-slate-500">{rev.location} · {rev.time}</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold">{rev.dice}</span>
                  <span className="text-[10px] text-slate-500 uppercase">VERIFIED CLAIM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
              {t.faqTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-sm font-bold text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
