import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ShoppingBag, Truck, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { ScreenType } from '../types';

interface ScreenCustomerRegisterProps {
  onNavigate: (screen: ScreenType) => void;
  triggerToast: (msg: string) => void;
}

export const ScreenCustomerRegister: React.FC<ScreenCustomerRegisterProps> = ({
  onNavigate,
  triggerToast,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      triggerToast('Please agree to the Terms of Service to continue.');
      return;
    }
    triggerToast('Customer account created successfully!');
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Informational Side */}
        <div className="lg:col-span-6 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs text-slate-600 text-xs font-semibold tracking-wider uppercase">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
            <span>CUSTOMER ACCOUNT</span>
          </div>

          {/* Headline & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              One account,<br />a whole marketplace.
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Create your customer profile in a single step. Save favourites, track orders across every supplier, and get first access to affiliate-boosted deals.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-5 pt-2">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Nationwide delivery</h4>
                <p className="text-xs text-slate-500 mt-0.5">Track every order in real time from checkout to doorstep.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Member pricing</h4>
                <p className="text-xs text-slate-500 mt-0.5">Unlock subscriber-only drops and bundle discounts.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Buyer protection</h4>
                <p className="text-xs text-slate-500 mt-0.5">Every purchase is covered by marketplace escrow rules.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-6">
          <div className="bg-[#F8FAFC]/50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs backdrop-blur-xs">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full pl-11 pr-4 py-3.5 text-xs bg-[#F1F5F9]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Email / Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Email or phone number"
                  className="w-full pl-11 pr-4 py-3.5 text-xs bg-[#F1F5F9]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full pl-11 pr-11 py-3.5 text-xs bg-[#F1F5F9]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-500 leading-normal">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                    required
                  />
                  <span>
                    I agree to the Terms of Service, Privacy Policy and fair-use marketplace rules.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-xs mt-4"
              >
                <span>Create Customer Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Bottom Link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Already registered?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign in instead
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};