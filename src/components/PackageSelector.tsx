import React from 'react';
import { RewardPackage, Language } from '../types';
import { translations } from '../translations';
import { RedDiceIcon, MonopolyCashIcon, GoldDiceIcon } from './Icons';
import { Sparkles, Crown, Zap, Check, ArrowLeft, UserCheck } from 'lucide-react';

interface PackageSelectorProps {
  currentLang: Language;
  selectedPackage: RewardPackage | null;
  onSelectPackage: (pkg: RewardPackage) => void;
  onClaim: (pkg: RewardPackage) => void;
  isUnlocked: boolean;
  onBack?: () => void;
  username?: string;
}

export const packages: RewardPackage[] = [
  {
    id: 'pkg-1',
    name: 'Starter Bundle',
    diceCount: 3500,
    cashAmount: '$5,000,000',
    badge: 'STARTER PACK ⚡',
    popular: false,
    colorScheme: 'emerald',
  },
  {
    id: 'pkg-2',
    name: 'Tycoon Pack',
    diceCount: 15000,
    cashAmount: '$25,000,000',
    badge: 'MOST POPULAR 🔥',
    popular: true,
    colorScheme: 'amber',
  },
  {
    id: 'pkg-3',
    name: 'Billionaire VIP',
    diceCount: 32500,
    cashAmount: '$100,000,000',
    badge: 'VIP MAX PACK 👑',
    popular: false,
    colorScheme: 'purple',
  },
];

export const PackageSelector: React.FC<PackageSelectorProps> = ({
  currentLang,
  selectedPackage,
  onSelectPackage,
  onClaim,
  isUnlocked,
  onBack,
  username,
}) => {
  const t = translations[currentLang];

  return (
    <section id="packages" className="py-8 sm:py-10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation bar with back action and authenticated user pill */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-slate-900/80 border border-slate-800 rounded-xl p-3 backdrop-blur-sm">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 bg-slate-950/70 hover:bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentLang === 'fr' ? 'Modifier le pseudo' : 'Change Username'}</span>
            </button>
          ) : <div />}

          {username && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden xs:inline">{currentLang === 'fr' ? 'Compte sélectionné :' : 'Connected:'}</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                @{username}
              </span>
            </div>
          )}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">
            {currentLang === 'fr' ? '3 OPTIONS DISPONIBLES' : '3 AVAILABLE CHOICES'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
            {t.choosePackageTitle}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {t.choosePackageSub}
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg) => {
            const isSelected = selectedPackage?.id === pkg.id;
            const isPopular = pkg.popular;

            let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-900/80';
            let btnClass = 'bg-slate-800 text-white hover:bg-slate-700';

            if (pkg.colorScheme === 'emerald') {
              if (isSelected) {
                borderClass = 'border-emerald-500 bg-slate-900 ring-2 ring-emerald-500/30';
                btnClass = 'bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400';
              }
            } else if (pkg.colorScheme === 'amber') {
              borderClass = isSelected
                ? 'border-amber-400 bg-slate-900 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                : 'border-amber-500/40 bg-slate-900/90 hover:border-amber-400';
              btnClass = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold hover:brightness-110';
            } else if (pkg.colorScheme === 'purple') {
              if (isSelected) {
                borderClass = 'border-purple-500 bg-slate-900 ring-2 ring-purple-500/30';
                btnClass = 'bg-purple-500 text-white font-bold hover:bg-purple-400';
              }
            }

            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 transform ${
                  isPopular ? 'md:-translate-y-2' : ''
                } ${borderClass}`}
              >
                {/* Popular / VIP badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.mostPopular}</span>
                  </div>
                )}
                {pkg.colorScheme === 'purple' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1 whitespace-nowrap">
                    <Crown className="w-3.5 h-3.5" />
                    <span>{t.vipPack}</span>
                  </div>
                )}
                {pkg.colorScheme === 'emerald' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1 whitespace-nowrap">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t.starterPack}</span>
                  </div>
                )}

                <div>
                  {/* Top Dice visual */}
                  <div className="flex justify-center items-center py-4 my-2">
                    {pkg.popular ? (
                      <div className="relative">
                        <GoldDiceIcon className="w-16 h-16 animate-float" />
                        <span className="absolute -bottom-2 -right-2 bg-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded text-white shadow">
                          2x BONUS
                        </span>
                      </div>
                    ) : (
                      <RedDiceIcon className="w-16 h-16 animate-float" />
                    )}
                  </div>

                  {/* Dice Amount */}
                  <div className="text-center my-3">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                      {pkg.diceCount.toLocaleString()}
                    </span>
                    <span className="block text-sm font-bold text-amber-400 uppercase tracking-wider mt-1 font-heading">
                      {t.dice}
                    </span>
                  </div>

                  {/* Cash Bonus */}
                  <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6">
                    <MonopolyCashIcon className="w-6 h-4" />
                    <span className="text-xs font-semibold text-emerald-400 font-mono">
                      + {pkg.cashAmount} {t.cash}
                    </span>
                  </div>

                  {/* Bullet perks */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{currentLang === 'fr' ? 'Livraison directe et instantanée dans le jeu' : 'Instant in-game direct delivery'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{currentLang === 'fr' ? 'Sécurité 100% Anti-Ban garantie' : '100% Anti-Ban proxy safety'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{currentLang === 'fr' ? 'Aucun mot de passe requis' : 'No account password needed'}</span>
                    </li>
                  </ul>
                </div>

                {/* Claim Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage(pkg);
                    onClaim(pkg);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md ${btnClass} flex items-center justify-center gap-1.5`}
                >
                  <span>{t.claimNow}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
