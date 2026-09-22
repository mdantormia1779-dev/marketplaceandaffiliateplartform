import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, Star, ArrowRight, Check, Info } from 'lucide-react';
import { RoleType, ScreenType } from '../types';

interface ScreenLoginProps {
  selectedRole: RoleType;
  setSelectedRole: (role: RoleType) => void;
  onNavigate: (screen: ScreenType) => void;
  triggerToast: (msg: string) => void;
}

export const ScreenLogin: React.FC<ScreenLoginProps> = ({
  selectedRole,
  setSelectedRole,
  onNavigate,
  triggerToast,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const getRoleDescription = (role: RoleType) => {
    switch (role) {
      case 'customer':
        return 'Track orders, saved carts and exclusive member deals.';
      case 'affiliate':
        return 'Access referral links, real-time commission metrics and payouts.';
      case 'supplier':
        return 'Manage catalog, order fulfillment, and automated settlement logs.';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
      
      {/* Left Dark Hero Panel */}
      <div className="lg:col-span-6 bg-[#031525] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none" />

        <div className="relative z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-[11px] font-bold text-blue-400 mb-8 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            LIVE COMMERCE ECOSYSTEM
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
            Powering Commerce, Suppliers & Affiliates in <span className="text-emerald-400">One Unified Ecosystem.</span>
          </h1>
          <p className="text-slate-400 text-sm font-normal leading-relaxed max-w-lg mb-8">
            One dashboard for shoppers, affiliate marketers and suppliers — transparent commissions, verified vendors, and payouts you can actually track.
          </p>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-[#082035]/80 border border-slate-800/80 rounded-2xl p-4">
              <p className="text-xl sm:text-2xl font-black text-white tracking-tight">৳10M+</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">PAID TO AFFILIATES</p>
            </div>
            <div className="bg-[#082035]/80 border border-slate-800/80 rounded-2xl p-4">
              <p className="text-xl sm:text-2xl font-black text-white tracking-tight">500+</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">VERIFIED SUPPLIERS</p>
            </div>
            <div className="bg-[#082035]/80 border border-slate-800/80 rounded-2xl p-4">
              <p className="text-xl sm:text-2xl font-black text-white tracking-tight">12K+</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">ACTIVE BUYERS</p>
            </div>
          </div>

          {/* Testimonial Quote Box */}
          <div className="bg-[#082035]/60 border border-slate-800/80 rounded-2xl p-5 relative">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" 
                alt="Ayesha Rahman" 
                className="w-10 h-10 rounded-full object-cover border border-blue-500/30"
              />
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex text-emerald-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-emerald-400" />
                    ))}
                  </div>
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-semibold border border-emerald-500/20">
                    Verified supplier
                  </span>
                </div>
                <p className="text-xs font-bold text-white mt-0.5">Ayesha Rahman <span className="text-slate-400 font-normal">Founder, Loom & Thread</span></p>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "I switched my whole store to Nexora and my affiliate crew pushed sales 3x in one quarter. Payouts hit my bKash every other week without me chasing anyone."
            </p>
          </div>
        </div>

        {/* Footer Security Tags */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>PCI-DSS Ready</span>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-1">Sign in to access your marketplace dashboard.</p>
          </div>

          {/* Role Tabs */}
          <div className="bg-slate-100/80 p-1 rounded-2xl mb-3 grid grid-cols-3 gap-1 border border-slate-200/80 text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'customer' ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🛒 Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('affiliate')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'affiliate' ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🔗 Affiliate Marketer</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('supplier')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'supplier' ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >

               <span>🛒 Super Admin</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('affiliate')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'affiliate' ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏪 Supplier / Seller</span>
            </button>
          </div>

          {/* Dynamic Role Description Helper */}
          <div className="flex items-start gap-1.5 text-[11px] text-slate-500 mb-6 px-1">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <span>{getRoleDescription(selectedRole)}</span>
          </div>

          {/* Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            triggerToast(`Signed in successfully as ${selectedRole.toUpperCase()}`);
          }} className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Email or phone number"
                  className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>Remember me for 30 days</span>
              </label>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-xs mt-2"
            >
              <span>Sign In To Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Login Separator */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              OR CONTINUE WITH
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => triggerToast("Google Login Triggered")}
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Bottom Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-medium">
              New to the platform?{' '}
              <button
                onClick={() => onNavigate('gateway')}
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create an account ▾
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};