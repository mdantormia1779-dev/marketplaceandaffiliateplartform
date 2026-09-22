import React from 'react';

interface OnboardingStepperProps {
  currentStep?: number;
}

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Account & Store' },
    { id: 2, label: 'Verification' },
    { id: 3, label: 'Payout Setup' },
    { id: 4, label: 'Plan & Review' },
  ];

  return (
    <div className="p-6 sm:p-8 border-b border-slate-100 bg-[#FAFCFF]">
      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
        <div className="absolute left-8 right-8 top-5 h-[1px] bg-slate-200 -z-0" />

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-50 border-2 border-blue-600 text-blue-600 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-xs ${
                  isActive ? 'font-bold text-blue-600' : 'font-semibold text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};