import React, { useState } from 'react';
import { Platform, Language } from '../types';
import { translations } from '../translations';
import { Smartphone, Apple, Monitor, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { RedDiceIcon } from './Icons';

interface UserFormProps {
  currentLang: Language;
  username: string;
  setUsername: (name: string) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  encryption: boolean;
  setEncryption: (enc: boolean) => void;
  isUnlocked: boolean;
  onProceed: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  currentLang,
  username,
  setUsername,
  platform,
  setPlatform,
  encryption,
  setEncryption,
  isUnlocked,
  onProceed,
}) => {
  const t = translations[currentLang];
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(
        currentLang === 'fr'
          ? 'Veuillez saisir votre nom d’utilisateur'
          : 'Please enter your username or player ID'
      );
      return;
    }
    setError('');
    onProceed();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-xl mx-auto backdrop-blur-sm relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400" />

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/10 border border-red-500/30 mb-3">
          <RedDiceIcon className="w-12 h-12" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
          {t.step1Title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.step1Desc}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
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
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border ${
                error ? 'border-red-500' : 'border-slate-700 focus:border-amber-400'
              } text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all`}
            />
            {username.trim().length >= 3 && (
              <div className="absolute right-3 top-3 text-emerald-400 flex items-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>
          {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            {t.selectPlatform}
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setPlatform('android')}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                platform === 'android'
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 ring-2 ring-emerald-500/20'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>{t.android}</span>
            </button>

            <button
              type="button"
              onClick={() => setPlatform('ios')}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                platform === 'ios'
                  ? 'border-amber-400 bg-amber-400/15 text-amber-300 ring-2 ring-amber-400/20'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Apple className="w-5 h-5" />
              <span>{t.ios}</span>
            </button>

            <button
              type="button"
              onClick={() => setPlatform('pc')}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                platform === 'pc'
                  ? 'border-cyan-400 bg-cyan-400/15 text-cyan-300 ring-2 ring-cyan-400/20'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-5 h-5" />
              <span>{t.pc}</span>
            </button>
          </div>
        </div>

        {/* Security toggle */}
        <div
          onClick={() => setEncryption(!encryption)}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Shield className={`w-4 h-4 ${encryption ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className="text-xs text-slate-300">{t.encryptionToggle}</span>
          </div>
          <div
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
              encryption ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 font-heading text-sm sm:text-base cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>{t.connectBtn}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </form>
    </div>
  );
};
