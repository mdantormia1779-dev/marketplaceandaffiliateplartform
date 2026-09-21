import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface OtpVerificationProps {
  phone: string;
  otpValues: string[];
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onVerify: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  phone,
  otpValues,
  otpInputRefs,
  handleOtpChange,
  handleOtpKeyDown,
  onCancel,
  onVerify,
}) => {
  return (
    <div className="bg-[#F8FAFC]/80 border border-slate-200/90 rounded-2xl p-6 text-center space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
      <p className="text-xs text-slate-600 font-medium">
        Enter the 6-digit code sent to <span className="font-bold text-slate-800">{phone || 'your mobile'}</span>
      </p>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {otpValues.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => {
              otpInputRefs.current[idx] = el;
            }}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleOtpChange(idx, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
            className={`w-10 h-12 sm:w-12 sm:h-14 text-center font-bold text-slate-800 text-lg rounded-xl border bg-white outline-none transition-all ${
              val
                ? 'border-blue-600 ring-2 ring-blue-500/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onVerify}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
        >
          <span>Verify number</span>
          <ShieldCheck className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};