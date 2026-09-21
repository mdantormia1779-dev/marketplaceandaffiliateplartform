import React, { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';
import { ScreenType } from '../types';
import { StepPersonalDetails } from './affiliate/StepPersonalDetails';
import { StepPaymentWallet } from './affiliate/StepPaymentWallet';
import { StepAffiliateSuccess } from './affiliate/StepAffiliateSuccess';

interface ScreenAffiliateRegisterProps {
  onNavigate: (screen: ScreenType) => void;
  triggerToast?: (msg: string) => void;
}

export const ScreenAffiliateRegister: React.FC<ScreenAffiliateRegisterProps> = ({
  onNavigate,
  triggerToast,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep(2);
    triggerToast?.('Personal details saved. Proceeding to payout setup!');
  };

  const handleFinalSubmit = () => {
    setCurrentStep(3);
    triggerToast?.('Affiliate account created successfully!');
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-3xl bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10">
        
        {/* Header & Stepper - Only shown during Step 1 and Step 2 */}
        {currentStep < 3 && (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold tracking-wider uppercase">
                <LinkIcon className="w-3.5 h-3.5" />
                <span>AFFILIATE MARKETER</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">Step {currentStep} of 2</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your affiliate account
            </h1>
            <p className="text-xs text-slate-500 mt-1 mb-8">
              Zero joining fee · Instant link generator · Bi-weekly payouts
            </p>

            {/* Stepper Progress */}
            <div className="relative flex items-center justify-between mb-10 px-4">
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[1px] bg-slate-200 -z-0" />
              <div 
                className="absolute left-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-blue-600 transition-all duration-300 -z-0" 
                style={{ width: currentStep === 2 ? 'calc(100% - 4rem)' : '0%' }}
              />

              <div className="flex flex-col items-center gap-2 relative z-10 bg-white px-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === 1 ? 'bg-white border-2 border-blue-600 text-blue-600 shadow-xs' : 'bg-blue-600 text-white'
                }`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className={`text-xs ${currentStep === 1 ? 'font-bold text-blue-600' : 'font-medium text-slate-600'}`}>
                  Personal Details
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 relative z-10 bg-white px-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === 2 ? 'bg-white border-2 border-blue-600 text-blue-600 shadow-xs' : 'bg-slate-50 border border-slate-300 text-slate-400'
                }`}>
                  2
                </div>
                <span className={`text-xs ${currentStep === 2 ? 'font-bold text-blue-600' : 'font-medium text-slate-400'}`}>
                  Payment & Wallet
                </span>
              </div>
            </div>
          </>
        )}

        {/* Dynamic Component Render */}
        {currentStep === 1 && (
          <StepPersonalDetails onNext={handleNextStep} onNavigate={onNavigate} />
        )}
        {currentStep === 2 && (
          <StepPaymentWallet onBack={() => setCurrentStep(1)} onSubmit={handleFinalSubmit} />
        )}
        {currentStep === 3 && (
          <StepAffiliateSuccess onNavigate={onNavigate} triggerToast={triggerToast} />
        )}

        {/* Bottom Login Link - Only shown during Step 1 and Step 2 */}
        {currentStep < 3 && (
          <div className="text-center pt-6">
            <p className="text-xs text-slate-500 font-medium">
              Already have an affiliate account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in instead
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};