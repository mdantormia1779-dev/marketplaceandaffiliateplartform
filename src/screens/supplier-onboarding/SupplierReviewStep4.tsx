import React, { useState } from 'react';
import { Check, Send, ArrowLeft, Tag, Gift } from 'lucide-react';

interface SupplierReviewStep4Props {
  onBack: () => void;
  onSubmit: () => void;
  triggerToast?: (msg: string) => void;
}

export const SupplierReviewStep4: React.FC<SupplierReviewStep4Props> = ({
  onBack,
  onSubmit,
  triggerToast,
}) => {
  // Plan State: 'basic' | 'professional' | 'business'
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'professional' | 'business'>('professional');
  
  // Joining Fee Option: 'free_trial' | 'pay_now'
  const [joiningFeeOption, setJoiningFeeOption] = useState<'free_trial' | 'pay_now'>('free_trial');

  // Referral Code
  const [referralCode, setReferralCode] = useState<string>('');

  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: '৳500',
      period: '/mo',
      subtitle: 'For new stores testing the waters',
      features: [
        'Up to 20 product listings',
        'Basic sales analytics',
        'Standard marketplace placement',
        'Email support',
      ],
      isPopular: false,
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      price: '৳1,000',
      period: '/mo',
      subtitle: 'For growing stores scaling reach',
      features: [
        'Up to 100 product listings',
        'Affiliate campaign access',
        'Advanced analytics & reports',
        'Featured category placement',
        'Priority chat support',
      ],
      isPopular: true,
    },
    {
      id: 'business' as const,
      name: 'Business',
      price: '৳2,000',
      period: '/mo',
      subtitle: 'For high-volume brands & teams',
      features: [
        'Unlimited product listings',
        'Dedicated storefront',
        'Affiliate crew management',
        'Custom analytics exports',
        'Priority phone support',
      ],
      isPopular: false,
    },
  ];

  const handleSubmit = () => {
    triggerToast?.('Application submitted for Admin Review!');
    onSubmit();
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 font-sans">
      {/* Title & Step Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Subscription plan & joining fee
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Pick a plan and review your one-time joining fee.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400">Step 4 of 4</span>
      </div>

      {/* Special Offer Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
        <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600 shrink-0">
          <Gift className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-900">
            Special Offer: 7-Day Free Trial
          </h4>
          <p className="text-xs text-emerald-700 mt-0.5">
            Your trial activates automatically once admin verification is approved. No payment is taken today.
          </p>
        </div>
      </div>

      {/* Choose Subscription Plan Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          CHOOSE YOUR SUBSCRIPTION PLAN
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/20 shadow-md ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-6 bg-emerald-500 text-white font-bold text-[10px] tracking-wider px-3 py-0.5 rounded-full uppercase shadow-sm">
                    POPULAR
                  </div>
                )}

                <div>
                  {/* Card Top / Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{plan.name}</h4>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-xs font-medium text-slate-400">{plan.period}</span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 mb-5">{plan.subtitle}</p>

                  {/* Feature List */}
                  <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Joining Fee Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          JOINING FEE
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Free for Trial */}
          <div
            onClick={() => setJoiningFeeOption('free_trial')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              joiningFeeOption === 'free_trial'
                ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <h4 className="text-xs font-bold text-slate-900">Free for Trial</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Waived during the 7-day trial</p>
            </div>
            <span className="text-lg font-bold text-emerald-600">৳0</span>
          </div>

          {/* Option 2: Pay joining fee now */}
          <div
            onClick={() => setJoiningFeeOption('pay_now')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              joiningFeeOption === 'pay_now'
                ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <h4 className="text-xs font-bold text-slate-900">Pay joining fee now</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">One-time, unlocked instantly</p>
            </div>
            <span className="text-lg font-bold text-slate-900">৳1,000</span>
          </div>
        </div>
      </div>

      {/* Referral Code (Optional) */}
      <div className="relative">
        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Referral code (optional)"
          className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
        />
        <p className="text-[11px] text-slate-400 mt-1.5 pl-1">
          Referred by another supplier? Enter their code to unlock perks.
        </p>
      </div>

      {/* Joining Fee Summary Breakdown Box */}
      <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/60 pb-2">
          JOINING FEE SUMMARY BREAKDOWN
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>
              {selectedPlan === 'basic' ? 'Basic' : selectedPlan === 'professional' ? 'Professional' : 'Business'} plan
            </span>
            <span className="font-semibold text-slate-800">
              {selectedPlan === 'basic' ? '৳500/mo' : selectedPlan === 'professional' ? '৳1,000/mo' : '৳2,000/mo'}
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Joining fee</span>
            <span className="font-semibold text-slate-800">
              {joiningFeeOption === 'free_trial' ? 'Waived' : '৳1,000'}
            </span>
          </div>

          {joiningFeeOption === 'free_trial' && (
            <div className="flex justify-between text-emerald-600">
              <span>7-day free trial credit</span>
              <span className="font-semibold">-৳250</span>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200/80 pt-3 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-900">Total due today</span>
          <span className="text-xl font-black text-blue-600">
            {joiningFeeOption === 'free_trial' ? '৳0' : '৳1,000'}
          </span>
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
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
          onClick={handleSubmit}
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
        >
          <span>Submit for Admin Review</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};