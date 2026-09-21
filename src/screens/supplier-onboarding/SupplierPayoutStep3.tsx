import React, { useState } from 'react';
import { 
  Smartphone, 
  Building2, 
  Building, 
  CreditCard, 
  Wallet, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';

interface SupplierPayoutStep3Props {
  onBack?: () => void;
  onNext?: () => void;
  triggerToast?: (msg: string) => void;
}

type PayoutMethod = 'bkash' | 'nagad' | 'bank';

export const SupplierPayoutStep3: React.FC<SupplierPayoutStep3Props> = ({
  onBack,
  onNext,
  triggerToast,
}) => {
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod>('bank');

  // MFS Data
  const [mfsNumber, setMfsNumber] = useState('');

  // Bank Data
  const [bankData, setBankData] = useState({
    bankName: '',
    branchName: '',
    accountNumber: '',
  });

  const handleBankInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAndContinue = () => {
    if (payoutMethod === 'bkash' || payoutMethod === 'nagad') {
      if (!mfsNumber.trim()) {
        triggerToast?.(`${payoutMethod === 'bkash' ? 'bKash' : 'Nagad'} mobile number enter করুন`);
        return;
      }
    } else if (payoutMethod === 'bank') {
      if (!bankData.bankName.trim()) {
        triggerToast?.('Bank name enter করুন');
        return;
      }
      if (!bankData.branchName.trim()) {
        triggerToast?.('Branch name enter করুন');
        return;
      }
      if (!bankData.accountNumber.trim()) {
        triggerToast?.('Bank account number enter করুন');
        return;
      }
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Form Body */}
      <div className="p-6 sm:p-10 space-y-8 flex-1">
        {/* Section Heading */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Payout & financial setup
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose where your sales balance should be withdrawn.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Step 3 of 4</span>
        </div>

        {/* Withdrawal Method Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            WITHDRAWAL METHOD
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* bKash Option */}
            <div
              onClick={() => {
                setPayoutMethod('bkash');
                setMfsNumber('');
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                payoutMethod === 'bkash'
                  ? 'bg-blue-50/50 border-blue-500 shadow-2xs'
                  : 'bg-[#F8FAFC]/50 border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                payoutMethod === 'bkash' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">bKash</h4>
                <p className="text-[11px] text-slate-500 font-medium">Withdraw balance to MFS</p>
              </div>
            </div>

            {/* Nagad Option */}
            <div
              onClick={() => {
                setPayoutMethod('nagad');
                setMfsNumber('');
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                payoutMethod === 'nagad'
                  ? 'bg-blue-50/50 border-blue-500 shadow-2xs'
                  : 'bg-[#F8FAFC]/50 border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                payoutMethod === 'nagad' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Nagad</h4>
                <p className="text-[11px] text-slate-500 font-medium">Withdraw balance to MFS</p>
              </div>
            </div>

            {/* Bank Account Option */}
            <div
              onClick={() => setPayoutMethod('bank')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                payoutMethod === 'bank'
                  ? 'bg-blue-50/50 border-blue-500 shadow-2xs'
                  : 'bg-[#F8FAFC]/50 border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                payoutMethod === 'bank' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Bank Account</h4>
                <p className="text-[11px] text-slate-500 font-medium">Ledger withdrawals to bank</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Inputs Based on Selection */}
        {payoutMethod === 'bank' ? (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="bankName"
                  value={bankData.bankName}
                  onChange={handleBankInputChange}
                  placeholder="Bank name"
                  className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                />
              </div>

              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="branchName"
                  value={bankData.branchName}
                  onChange={handleBankInputChange}
                  placeholder="Branch name"
                  className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="accountNumber"
                value={bankData.accountNumber}
                onChange={handleBankInputChange}
                placeholder="Bank account number"
                className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-1">
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={mfsNumber}
                onChange={(e) => setMfsNumber(e.target.value)}
                placeholder={`${payoutMethod === 'bkash' ? 'bKash' : 'Nagad'} mobile number`}
                className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 pl-1 font-medium">
              Commission and sales balance is withdrawn to this number.
            </p>
          </div>
        )}

        {/* Ledger-based Balance Notice Banner */}
        <div className="flex items-start gap-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 text-xs text-slate-600">
          <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-100 shrink-0 text-blue-600 mt-0.5">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs">
              Ledger-based balance withdrawals
            </h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Sales settle into your supplier ledger after delivery confirmation. Request a withdrawal any time once your balance clears ৳500.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-6 sm:px-10 bg-[#FAFCFF] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous step</span>
        </button>

        <button
          type="button"
          onClick={handleSaveAndContinue}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Save & continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};