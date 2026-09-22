import React, { useState } from 'react';
import { Smartphone, Wallet, Landmark, Info, ArrowLeft, Rocket } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

export const StepPaymentWallet: React.FC<Props> = ({ onBack, onSubmit }) => {
  const [payoutMethod, setPayoutMethod] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [accountNumber, setAccountNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          DEFAULT PAYOUT METHOD
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setPayoutMethod('bkash')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              payoutMethod === 'bkash' ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">bKash</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Instant MFS payout</p>
          </div>

          <div
            onClick={() => setPayoutMethod('nagad')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              payoutMethod === 'nagad' ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
              <Wallet className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Nagad</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Instant MFS payout</p>
          </div>

          <div
            onClick={() => setPayoutMethod('bank')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              payoutMethod === 'bank' ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
              <Landmark className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Bank Account</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">1–2 business days</p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="relative">
          <Smartphone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder={
              payoutMethod === 'bkash' ? 'bKash account number' : payoutMethod === 'nagad' ? 'Nagad account number' : 'Bank account number'
            }
            className="w-full pl-10 pr-4 py-3.5 text-xs bg-[#F8FAFC]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
            required
          />
        </div>
        <p className="text-[11px] text-slate-400 ml-1">The number that receives your commission payouts.</p>
      </div>

      <div className="bg-[#F8FAFC]/80 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3">
        <div className="p-1 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-900">Payout cycle</h5>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Commissions are confirmed after the 30-day return window, then paid out every two weeks once your balance reaches ৳1,000.
          </p>
        </div>
      </div>

      <div className="pt-1">
        <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-600 leading-normal">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
            required
          />
          <span>I agree to the Fraud Protection Policy, Cookie Attribution Rules and Affiliate Terms of Service.</span>
        </label>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous step</span>
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-xs"
        >
          <span>Create Affiliate Account</span>
          <Rocket className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};