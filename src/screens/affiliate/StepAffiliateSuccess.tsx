import React, { useState } from 'react';
import { Gift, Percent, Calendar, Clock, Fingerprint, Link as LinkIcon, Copy, Check, ArrowLeft, Share2 } from 'lucide-react';

interface Props {
  userName?: string;
  onNavigate: (screen: any) => void;
  triggerToast?: (msg: string) => void;
}

export const StepAffiliateSuccess: React.FC<Props> = ({ userName = 'wahu', onNavigate, triggerToast }) => {
  const [copied, setCopied] = useState(false);
  const affiliateId = 'NX-AFF-84219';
  const referralLink = 'https://nexora.market/r/AFF84219';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    triggerToast?.('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center space-y-6 py-2">
      {/* Top Green Icon */}
      <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-600">
        <Gift className="w-7 h-7" />
      </div>

      {/* Header Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Your Affiliate Dashboard is Ready!
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Welcome aboard, {userName}. Share your link and start earning on every verified sale.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="bg-[#F8FAFC]/80 border border-slate-200/60 rounded-2xl p-4 text-left space-y-1">
          <Percent className="w-4 h-4 text-blue-600 mb-2" />
          <h4 className="text-sm font-black text-slate-900">10% – 20%</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">COMMISSION</p>
        </div>

        <div className="bg-[#F8FAFC]/80 border border-slate-200/60 rounded-2xl p-4 text-left space-y-1">
          <Calendar className="w-4 h-4 text-blue-600 mb-2" />
          <h4 className="text-sm font-black text-slate-900">Bi-weekly</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PAYOUT CYCLE</p>
        </div>

        <div className="bg-[#F8FAFC]/80 border border-slate-200/60 rounded-2xl p-4 text-left space-y-1">
          <Clock className="w-4 h-4 text-blue-600 mb-2" />
          <h4 className="text-sm font-black text-slate-900">30 days</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">COOKIE WINDOW</p>
        </div>
      </div>

      {/* Blue Link Box */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-left space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
            <Fingerprint className="w-4 h-4 text-blue-600" />
            <span>AFFILIATE ID</span>
          </div>
          <span className="font-extrabold text-xs text-slate-900">{affiliateId}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex items-center gap-2 overflow-hidden shadow-xs">
            <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full text-xs font-medium text-slate-700 bg-transparent outline-none truncate"
            />
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-blue-600/20"
          >
            {copied ? (
              <>
                <span>Copied</span>
                <Check className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Copy Link</span>
                <Copy className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full py-3 px-4 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-xl font-bold text-xs text-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to sign in</span>
        </button>

        <button
          type="button"
          onClick={() => triggerToast?.('Sharing options opened!')}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Share on social</span>
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};