import React, { useState } from 'react';
import { RewardPackage, Platform, Language, CpaConfig } from '../types';
import { translations } from '../translations';
import { packages } from './PackageSelector';
import { RedDiceIcon, MonopolyCashIcon, GoldDiceIcon } from './Icons';
import { Smartphone, Apple, Monitor, Shield, CheckCircle2, Sparkles, Crown, Zap, ArrowRight, ExternalLink, AlertTriangle } from 'lucide-react';

interface DirectClaimFlowProps {
  currentLang: Language;
  username: string;
  setUsername: (name: string) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  selectedPackage: RewardPackage;
  onSelectPackage: (pkg: RewardPackage) => void;
  cpaConfig: CpaConfig;
}

export const DirectClaimFlow: React.FC<DirectClaimFlowProps> = ({
  currentLang,
  username,
  setUsername,
  platform,
  setPlatform,
  selectedPackage,
  onSelectPackage,
  cpaConfig,
}) => {
  const t = translations[currentLang];
  const [error, setError] = useState('');
  const [encryption, setEncryption] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  const handleClaim = () => {
    if (!username.trim()) {
      setError(
        currentLang === 'fr'
          ? 'Veuillez saisir votre pseudo ou ID Monopoly GO'
          : 'Please enter your Monopoly GO username or player ID'
      );
      return;
    }
    setError('');
    setIsOpening(true);

    // Build the dynamic CPA URL with user details in sub5
    let targetUrl =
      cpaConfig.lockerUrl ||
      'https://app.trcefy.com/click?pid=2&offer_id=23755&sub2=u783751&sub5=s1SUBID1HERE';

    const safeSub = encodeURIComponent(
      (username.trim() || 'player') + `_${platform}_${selectedPackage.diceCount}`
    );

    if (targetUrl.includes('sub5=s1SUBID1HERE')) {
      targetUrl = targetUrl.replace('sub5=s1SUBID1HERE', `sub5=${safeSub}`);
    } else if (targetUrl.includes('sub5=')) {
      if (targetUrl.endsWith('sub5=')) {
        targetUrl = targetUrl + safeSub;
      }
    }

    // Redirect to the CPA offer
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsOpening(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step A: Choose Dice Package (3 Choices) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block mb-2">
            {currentLang === 'fr' ? 'ÉTAPE 1 : CHOISISSEZ VOS DÉS' : 'STEP 1: SELECT DICE AMOUNT'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
            {t.choosePackageTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {currentLang === 'fr'
              ? 'Choisissez le nombre de lancers que vous souhaitez recevoir sur votre compte :'
              : 'Choose the amount of free dice rolls you want sent to your account:'}
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {packages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            const isPopular = pkg.popular;

            let cardClasses =
              'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300';
            let badgeText = '';
            let badgeBg = '';

            if (pkg.colorScheme === 'emerald') {
              badgeText = t.starterPack;
              badgeBg = 'bg-emerald-600';
              if (isSelected) {
                cardClasses =
                  'border-emerald-500 bg-emerald-950/20 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10 text-white';
              }
            } else if (pkg.colorScheme === 'amber') {
              badgeText = t.mostPopular;
              badgeBg = 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500';
              if (isSelected) {
                cardClasses =
                  'border-amber-400 bg-amber-950/20 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/15 text-white';
              }
            } else if (pkg.colorScheme === 'purple') {
              badgeText = t.vipPack;
              badgeBg = 'bg-purple-600';
              if (isSelected) {
                cardClasses =
                  'border-purple-500 bg-purple-950/20 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/10 text-white';
              }
            }

            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 transform ${
                  isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                } ${cardClasses}`}
              >
                {/* Badge */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow ${badgeBg}`}
                >
                  {badgeText}
                </div>

                <div className="text-center pt-2">
                  {/* Icon */}
                  <div className="flex justify-center mb-2">
                    {isPopular ? (
                      <GoldDiceIcon className="w-12 h-12 animate-float" />
                    ) : (
                      <RedDiceIcon className="w-12 h-12" />
                    )}
                  </div>

                  {/* Dice Count */}
                  <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mb-1">
                    {pkg.diceCount.toLocaleString()}
                  </div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3 font-heading">
                    {t.dice}
                  </span>

                  {/* Cash amount */}
                  <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold mb-3">
                    <MonopolyCashIcon className="w-4 h-3" />
                    <span>+ {pkg.cashAmount}</span>
                  </div>
                </div>

                {/* Selection indicator radio */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs font-bold">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400 text-slate-950'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </div>
                  <span className={isSelected ? 'text-amber-400' : 'text-slate-400'}>
                    {isSelected
                      ? currentLang === 'fr'
                        ? 'Pack Sélectionné'
                        : 'Selected'
                      : currentLang === 'fr'
                      ? 'Choisir ce pack'
                      : 'Choose this'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step B: Player Identification & Platform (Android / iOS / PC) + Main Direct CTA Button */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400" />

        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full inline-block mb-2">
            {currentLang === 'fr' ? 'ÉTAPE 2 : JOUEUR & APPAREIL' : 'STEP 2: PLAYER & DEVICE'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            {currentLang === 'fr'
              ? 'Où devons-nous envoyer vos dés ?'
              : 'Where should we send your dice rolls?'}
          </h3>
        </div>

        <div className="max-w-xl mx-auto space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              {t.usernameLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t.usernamePlaceholder}
                className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border ${
                  error ? 'border-red-500' : 'border-slate-700 focus:border-amber-400'
                } text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all`}
              />
              {username.trim().length >= 3 && (
                <div className="absolute right-3.5 top-3.5 text-emerald-400 flex items-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
            {error && <p className="text-xs text-red-400 mt-1.5 font-medium">{error}</p>}
          </div>

          {/* Operating System / Platform selector (Android / iOS / PC) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              {t.selectPlatform}
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPlatform('android')}
                className={`flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  platform === 'android'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30'
                    : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span>{t.android}</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('ios')}
                className={`flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  platform === 'ios'
                    ? 'border-amber-400 bg-amber-400/20 text-amber-300 ring-2 ring-amber-400/30'
                    : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Apple className="w-6 h-6" />
                <span>{t.ios}</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('pc')}
                className={`flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  platform === 'pc'
                    ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 ring-2 ring-cyan-400/30'
                    : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-6 h-6" />
                <span>{t.pc}</span>
              </button>
            </div>
          </div>

          {/* Security proxy toggle */}
          <div
            onClick={() => setEncryption(!encryption)}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Shield
                className={`w-4 h-4 ${encryption ? 'text-emerald-400' : 'text-slate-500'}`}
              />
              <span className="text-xs text-slate-300 font-medium">{t.encryptionToggle}</span>
            </div>
            <div
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                encryption ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {currentLang === 'fr' ? 'Pack prêt pour envoi :' : 'Bundle ready to deliver:'}{' '}
                <strong className="text-white font-mono">
                  {selectedPackage.diceCount.toLocaleString()} {t.dice}
                </strong>
              </span>
            </div>
            <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {platform.toUpperCase()}
            </span>
          </div>

          {/* MAIN CTA BUTTON -> Direct link to Trcefy CPA offer */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-4 px-6 rounded-2xl font-black text-slate-950 text-base sm:text-lg uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] font-heading"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>
                {currentLang === 'fr'
                  ? `Recevoir mes ${selectedPackage.diceCount.toLocaleString()} Dés Maintenant`
                  : `Get My ${selectedPackage.diceCount.toLocaleString()} Dice Rolls Now`}
              </span>
              <ExternalLink className="w-5 h-5" />
            </button>

            {/* High-Impact Mandatory Warning Box */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-amber-950/40 to-red-950/70 border-2 border-red-500/50 shadow-lg text-left">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-500/20 text-red-400 shrink-0 mt-0.5 border border-red-500/40 animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-red-400">
                      {currentLang === 'fr' ? '⚠️ ATTENTION OBLIGATOIRE :' : '⚠️ MANDATORY REQUIREMENT:'}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                      {currentLang === 'fr' ? 'Action Requise' : 'Action Required'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {currentLang === 'fr' ? (
                      <>
                        Une fois que vous avez cliqué sur le bouton ci-dessus, vous <strong className="text-amber-300 underline font-bold">DEVEZ impérativement compléter la tâche sponsorisée affichée</strong> pour que vos dés soient validés et envoyés sur votre compte. <span className="text-red-300 font-bold">Si vous ne terminez pas cette étape jusqu’au bout, vos dés ne vous parviendront pas !</span>
                      </>
                    ) : (
                      <>
                        Once you click the button above, you <strong className="text-amber-300 underline font-bold">MUST complete the sponsor task shown</strong> to validate and release your dice rolls. <span className="text-red-300 font-bold">If you do not complete it, your dice rolls will NOT be delivered!</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
