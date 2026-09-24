import React, { useState } from 'react';
import { Language, CpaConfig } from '../types';
import { translations } from '../translations';
import { Link2, Save, X, ExternalLink, Check, Info } from 'lucide-react';

interface CpaConfigModalProps {
  currentLang: Language;
  config: CpaConfig;
  onSave: (newConfig: CpaConfig) => void;
  onClose: () => void;
}

export const CpaConfigModal: React.FC<CpaConfigModalProps> = ({
  currentLang,
  config,
  onSave,
  onClose,
}) => {
  const t = translations[currentLang];
  const [url, setUrl] = useState(config.lockerUrl);
  const [network, setNetwork] = useState(config.networkName || 'CPABuild / OGAds / AdWork');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      lockerUrl: url.trim(),
      networkName: network.trim(),
      autoRedirect: true,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestLink = () => {
    if (url.trim()) {
      window.open(url.trim(), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-heading">
              {t.cpaSettingsTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          {t.cpaSettingsDesc}
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.cpaLinkInput}
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-cpa-locker-link.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {currentLang === 'ar'
                  ? 'متوافق مع Trcefy و CPAGrip و CPABuild و OGAds و AdBlueMedia أو أي شبكة عروض CPA.'
                  : currentLang === 'fr'
                  ? 'Compatible avec Trcefy, CPAGrip, CPABuild, OGAds ou toute offre CPA.'
                  : 'Works with Trcefy, CPAGrip, CPABuild, OGAds, AdBlueMedia or any CPA offer.'}
              </span>
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {currentLang === 'ar'
                ? 'اسم شبكة CPA (اختياري):'
                : currentLang === 'fr'
                ? 'Nom du réseau CPA (Optionnel) :'
                : 'CPA Network Name (Optional):'}
            </label>
            <input
              type="text"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              placeholder="e.g. CPAGrip / OGAds"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs placeholder:text-slate-600 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestLink}
              disabled={!url.trim()}
              className="py-2.5 px-3 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'ar'
                  ? 'تجربة الرابط'
                  : currentLang === 'fr'
                  ? 'Tester le lien'
                  : 'Test Link'}
              </span>
            </button>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>
                    {currentLang === 'ar'
                      ? 'تم الحفظ بنجاح!'
                      : currentLang === 'fr'
                      ? 'Enregistré avec succès !'
                      : 'Saved!'}
                  </span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.saveLink}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
