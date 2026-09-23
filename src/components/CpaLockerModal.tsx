import React, { useState, useEffect } from 'react';
import { RewardPackage, Language, CpaConfig } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Clock, ExternalLink, CheckCircle, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { RedDiceIcon, MonopolyCashIcon } from './Icons';

interface CpaLockerModalProps {
  currentLang: Language;
  username: string;
  pkg: RewardPackage;
  cpaConfig: CpaConfig;
  onOpenSettings: () => void;
  onClose: () => void;
}

export const CpaLockerModal: React.FC<CpaLockerModalProps> = ({
  currentLang,
  username,
  pkg,
  cpaConfig,
  onOpenSettings,
  onClose,
}) => {
  const t = translations[currentLang];
  const [secondsLeft, setSecondsLeft] = useState(285); // 4 mins 45 secs
  const [isVerifying, setIsVerifying] = useState(false);
  const [clickedOffer, setClickedOffer] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenCpa = (offerIndex?: number) => {
    if (offerIndex !== undefined) {
      setClickedOffer(offerIndex);
    }
    setIsVerifying(true);

    let targetUrl = cpaConfig.lockerUrl || 'https://app.trcefy.com/click?pid=2&offer_id=23755&sub2=u783751&sub5=s1SUBID1HERE';

    // If URL contains sub5=s1SUBID1HERE or ends with sub5=, append/replace with sanitized username
    const safeSub = encodeURIComponent((username.trim() || 'player') + (offerIndex !== undefined ? `_off${offerIndex + 1}` : '_main'));
    if (targetUrl.includes('sub5=s1SUBID1HERE')) {
      targetUrl = targetUrl.replace('sub5=s1SUBID1HERE', `sub5=${safeSub}`);
    } else if (targetUrl.includes('sub5=')) {
      if (targetUrl.endsWith('sub5=')) {
        targetUrl = targetUrl + safeSub;
      }
    }

    if (targetUrl && targetUrl !== '#') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Prompt user that they can set their custom link
      alert(
        currentLang === 'fr'
          ? 'Remarque : Vous pouvez configurer votre lien CPA personnalisé via le bouton Paramètres CPA.'
          : 'Notice: You can configure your actual CPA locker URL via the CPA settings button.'
      );
    }
  };

  const sampleOffers = [
    {
      id: 1,
      title: t.offer1Title,
      desc: t.offer1Desc,
      tag: 'FASTEST ⚡',
      payout: 'FREE',
    },
    {
      id: 2,
      title: t.offer2Title,
      desc: t.offer2Desc,
      tag: 'EASY 🎯',
      payout: 'FREE',
    },
    {
      id: 3,
      title: t.offer3Title,
      desc: t.offer3Desc,
      tag: 'SURVEY 📋',
      payout: 'FREE',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-5 sm:p-7 my-8">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Anti-Bot Human Verification
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(secondsLeft)}</span>
          </div>
        </div>

        {/* Reward Summary Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RedDiceIcon className="w-10 h-10 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block">
                Reserved For: <strong className="text-white">@{username || 'Player'}</strong>
              </span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {pkg.diceCount.toLocaleString()} {t.dice}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-400 font-mono block">
              + {pkg.cashAmount}
            </span>
            <span className="text-[10px] text-slate-500 uppercase">Status: PENDING</span>
          </div>
        </div>

        {/* Locker Title and Instructions */}
        <div className="text-center mb-5">
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            {t.lockerTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {t.lockerDesc}
          </p>
        </div>

        {/* Primary Action Button (Direct Link to CPA Locker) */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => handleOpenCpa()}
            className="w-full py-4 px-4 rounded-xl font-black text-slate-950 text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{t.completeOfferBtn}</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Interactive Offers List */}
        <div className="space-y-2.5 mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            {currentLang === 'fr' ? 'Ou choisissez l’une des méthodes de validation ci-dessous :' : 'Or select one of the quick verification tasks below:'}
          </span>
          {sampleOffers.map((offer, idx) => (
            <div
              key={offer.id}
              onClick={() => handleOpenCpa(idx)}
              className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-950 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {offer.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {offer.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {offer.tag}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Verification Status & Refresh */}
        {isVerifying && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>{t.waitingVerification}</span>
            </div>
            <button
              type="button"
              onClick={() => handleOpenCpa()}
              className="underline text-[11px] hover:text-white"
            >
              {currentLang === 'fr' ? 'Réouvrir' : 'Re-open'}
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p className="text-center sm:text-left">
            {t.afterOfferNotice}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-300"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
