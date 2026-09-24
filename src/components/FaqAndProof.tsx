import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ChevronDown, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FreeFireDiamondIcon } from './Icons';

interface FaqAndProofProps {
  currentLang: Language;
}

export const FaqAndProof: React.FC<FaqAndProofProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
  ];

  const reviews = [
    {
      name: currentLang === 'ar' ? 'أمين العمراني' : 'Amine El Amrani',
      location: currentLang === 'ar' ? 'الدار البيضاء، المغرب 🇲🇦' : 'Casablanca, Morocco 🇲🇦',
      rating: 5,
      diamonds: currentLang === 'ar' ? '2,180 💎 جوهرة' : '2,180 💎 Diamonds',
      comment:
        currentLang === 'ar'
          ? 'خدمة ممتازة وسريعة للغاية! قمت بإدخال مُعرّف حسابي (UID) وأكملت المهمة المطلوبة، فوصلتني 2,180 جوهرة لحسابي في أقل من 3 دقائق.'
          : currentLang === 'fr'
          ? 'Franchement incroyable ! J’ai mis mon UID, complété la tâche et j’ai reçu mes 2 180 diamants sur mon compte Free Fire.'
          : 'Amazing service! Entered my UID, finished the sponsor task and 2,180 diamonds credited to my account in 3 minutes.',
      time: currentLang === 'ar' ? 'منذ 10 دقائق' : '10m ago',
    },
    {
      name: currentLang === 'ar' ? 'ياسين الجزائري' : 'Yassine FF Booyah',
      location: currentLang === 'ar' ? 'الجزائر العاصمة، الجزائر 🇩🇿' : 'Algiers, Algeria 🇩🇿',
      rating: 5,
      diamonds: currentLang === 'ar' ? '5,600 💎 باقة VIP' : '5,600 💎 VIP Pack',
      comment:
        currentLang === 'ar'
          ? 'أفضل موقع صادق لشحن جواهر فري فاير بدون منازع! شحنت باقة 5,600 جوهرة وفتحت الفاير باس وسكن الكوبرا فوراً، شكراً جزيلاً لكم.'
          : currentLang === 'fr'
          ? 'Le pack VIP 5 600 m’a permis de débloquer le pass élite et l’événement sans dépenser un centime !'
          : 'Got the 5,600 VIP bundle! Unlocked the elite pass instantly without any problems.',
      time: currentLang === 'ar' ? 'منذ 25 دقيقة' : '25m ago',
    },
    {
      name: currentLang === 'ar' ? 'كريم التونسي' : 'Karim_Heroic',
      location: currentLang === 'ar' ? 'تونس العاصمة، تونس 🇹🇳' : 'Tunis, Tunisia 🇹🇳',
      rating: 5,
      diamonds: currentLang === 'ar' ? '11,500 💎 باقة النخبة' : '11,500 💎 Elite',
      comment:
        currentLang === 'ar'
          ? 'الموقع آمن وموثوق بنسبة 100% لأنه يطلب مُعرّف اللاعب فقط ولا يطلب كلمة المرور إطلاقاً. أنصح به جميع لاعبي فري فاير.'
          : currentLang === 'fr'
          ? '100% sécurisé car aucun mot de passe n’est requis, juste le Player ID. Recommandé à toute ma guilde.'
          : 'Completely secure since it only asks for the player ID, no passwords. Highly recommended!',
      time: currentLang === 'ar' ? 'منذ 42 دقيقة' : '42m ago',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-900 bg-slate-950/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Real Player Reviews Grid */}
        <div id="activity" className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              {currentLang === 'ar'
                ? 'آراء وتقييمات اللاعبين'
                : currentLang === 'fr'
                ? 'AVIS DE LA COMMUNAUTÉ'
                : 'PLAYER REVIEWS'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-heading">
              {currentLang === 'ar'
                ? 'تقييمات مجتمع Free Fire'
                : currentLang === 'fr'
                ? 'Retours des Joueurs Récents'
                : 'Recent Player Feedback'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {rev.location} · {rev.time}
                      </span>
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
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <FreeFireDiamondIcon className="w-4 h-4" />
                    {rev.diamonds}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {currentLang === 'ar' ? 'لاعب موثق' : currentLang === 'fr' ? 'VÉRIFIÉ' : 'VERIFIED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
              FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-heading">
              {t.faqTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                  >
                    <span
                      className={`text-sm sm:text-base font-bold text-white ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/50 ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    >
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
