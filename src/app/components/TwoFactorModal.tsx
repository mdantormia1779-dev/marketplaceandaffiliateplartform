import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface TwoFactorModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ onClose, onSuccess }) => {
  const [otp, setOtp] = useState<string[]>(['8', '2', '9', '1', '0', '4']);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Two-Factor Security</h3>
          <p className="text-xs text-slate-500 mt-1">Enter code sent to +880 17****5678</p>
        </div>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[idx] = e.target.value;
                setOtp(newOtp);
              }}
              className="w-10 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-mono"
            />
          ))}
        </div>

        <button
          onClick={onSuccess}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-blue-600/20"
        >
          Verify Code
        </button>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          Didn't receive code? <a href="#" className="text-blue-600 font-bold">Resend SMS</a>
        </p>
      </div>
    </div>
  );
};