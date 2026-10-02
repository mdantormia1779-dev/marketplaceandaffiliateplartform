'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Star,
  ArrowRight,
  Check,
  Info,
  ShieldCheck,
  ShoppingBag,
  Link2,
  Store,
  UserCog,
} from 'lucide-react';
import { RoleType, ScreenType } from '@/types';
import { saveAuthUser } from '@/lib/auth';
// Admin login er por ei path e jabe ((dashboard) route group URL e ashe na)
const ADMIN_DASHBOARD_PATH = '/admindashboard';

// Admin er fixed email/password (shudhu testing er jonno)
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '12345678';

interface ScreenLoginProps {
  selectedRole: RoleType;
  setSelectedRole: (role: RoleType) => void;
  onNavigate: (screen: ScreenType) => void;
  triggerToast: (msg: string) => void;
}

// Role tab gulo ekhane thakle code choto thake. Notun role dile shudhu ekhane add korlei hobe
const ROLES: { key: RoleType; label: string; icon: React.ElementType }[] = [
  { key: 'customer', label: 'Customer', icon: ShoppingBag },
  { key: 'affiliate', label: 'Affiliate', icon: Link2 },
  { key: 'supplier', label: 'Supplier', icon: Store },
  { key: 'admin', label: 'Admin', icon: UserCog },
];

export const ScreenLogin: React.FC<ScreenLoginProps> = ({
  selectedRole,
  setSelectedRole,
  onNavigate,
  triggerToast,
}) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const isAdmin = selectedRole === 'admin';

  const roleIndex = Math.max(
    0,
    ROLES.findIndex((r) => r.key === selectedRole)
  );

  const getRoleDescription = (role: RoleType) => {
    switch (role) {
      case 'customer':
        return 'Track orders, saved carts and exclusive member deals.';
      case 'affiliate':
        return 'Access referral links, real-time commission metrics and payouts.';
      case 'supplier':
        return 'Manage catalog, order fulfillment, and automated settlement logs.';
      case 'admin':
        return 'Manage suppliers, approvals, payouts and platform-wide settings.';
      default:
        return '';
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput.trim() || !passwordInput.trim()) {
      triggerToast('Email/phone এবং password পূরণ করুন');
      return;
    }

    // Admin tab: email/password mele kina age check kori
    if (isAdmin) {
      const isValidAdmin =
        emailInput.trim().toLowerCase() === ADMIN_EMAIL && passwordInput === ADMIN_PASSWORD;

      if (!isValidAdmin) {
        triggerToast('Invalid admin email or password');
        return; // vul hole kichu save hobe na, dashboard e jabe na
      }

      saveAuthUser({
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
      });

      triggerToast('Signed in successfully as ADMIN');
      router.push(ADMIN_DASHBOARD_PATH);
      return;
    }

    // Customer / Affiliate / Supplier
    saveAuthUser({
      name: emailInput.split('@')[0] || 'User',
      email: emailInput,
      role: selectedRole,
    });

    triggerToast(`Signed in successfully as ${selectedRole.toUpperCase()}`);

    // Chaile onno role er dashboard e pathate paro:
    // if (selectedRole === 'affiliate') router.push('/affiliatedashboard');
    // if (selectedRole === 'supplier') router.push('/supplierdashboard');
  };

  const inputClass =
    'w-full h-12 pl-11 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 transition-all focus:outline-none focus:bg-white focus:border-[#4a63e7] focus:ring-4 focus:ring-[#4a63e7]/10';

  return (
    <div className="w-full max-w-6xl bg-white rounded-[2rem] border border-slate-200/70 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.18)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
      {/* ───────────── Left: Hero panel (light) ───────────── */}
      <div className="lg:col-span-7 relative overflow-hidden bg-gradient-to-br from-[#f5f6fb] via-white to-[#eefaf3] p-8 sm:p-12 flex flex-col justify-between">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] opacity-40 [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-emerald-300/30 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-sm pl-2.5 pr-4 py-2 mb-8">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Trusted by 2.4M+ shoppers across Bangladesh
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.5rem] sm:text-5xl xl:text-[3.5rem] font-black tracking-tighter leading-[1.02] text-slate-950">
            One marketplace.
            <br />
            <span className="text-[#4a63e7]">Endless opportunity</span>
            <br />
            to shop, sell &amp; earn.
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-500">
            Discover millions of products from verified suppliers, promote them through
            trackable affiliate links, and grow with transparent commissions, wallets and
            payouts — all in one platform.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-9">
            {[
              { value: '৳10M+', label: 'Paid to affiliates' },
              { value: '500+', label: 'Verified suppliers' },
              { value: '12K+', label: 'Active buyers' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/70 backdrop-blur border border-white ring-1 ring-slate-900/5 shadow-sm p-4"
              >
                <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  {s.value}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-4 rounded-2xl bg-white/80 backdrop-blur border border-white ring-1 ring-slate-900/5 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                alt=""
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow"
              />
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                    Verified supplier
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Founder, Loom &amp; Thread</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              &ldquo;I switched my whole store to Nexora and my affiliate crew pushed sales 3x in
              one quarter. Payouts hit my bKash every other week without me chasing anyone.&rdquo;
            </p>
          </div>
        </div>

        {/* Footer trust tags */}
        <div className="relative z-10 mt-8 pt-5 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4a63e7]" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Verified Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4a63e7]" />
            <span>PCI-DSS Ready</span>
          </div>
        </div>
      </div>

      {/* ───────────── Right: Form panel ───────────── */}
      <div className="lg:col-span-5 bg-white p-8 sm:p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Title */}
          <div className="mb-7">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isAdmin ? 'Admin sign in' : 'Welcome back'}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              {isAdmin
                ? 'Restricted area. Authorized administrators only.'
                : 'Sign in to access your marketplace dashboard.'}
            </p>
          </div>

          {/* Role tabs (4ta, sliding indicator) */}
          <div className="relative grid grid-cols-4 p-1 rounded-2xl bg-slate-100 border border-slate-200/70">
            <div
              className="absolute top-1 bottom-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${roleIndex * 100}%)` }}
            />
            {ROLES.map(({ key, label, icon: Icon }) => {
              const active = selectedRole === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedRole(key)}
                  className={`relative z-10 flex items-center justify-center gap-1 py-2.5 text-[11px] sm:text-xs font-semibold transition-colors ${
                    active ? 'text-[#4a63e7]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Role description */}
          <div className="flex items-start gap-2 mt-3 mb-6 rounded-xl bg-indigo-50/70 px-3 py-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-[#4a63e7] shrink-0 mt-px" />
            <span>{getRoleDescription(selectedRole)}</span>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={isAdmin ? 'Admin email' : 'Email or phone number'}
                autoComplete="username"
                className={inputClass}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#4a63e7] focus:ring-[#4a63e7]/30"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-semibold text-[#4a63e7] hover:text-[#3a50d0]">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full h-12 rounded-xl bg-[#4a63e7] hover:bg-[#3e55d6] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-[#4a63e7]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isAdmin ? 'Sign in to admin panel' : 'Sign in to dashboard'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Google login + Create account: Admin er jonno dekhabe na */}
          {!isAdmin && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">or continue with</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={() => triggerToast('Google Login Triggered')}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Bottom link */}
              <p className="mt-8 text-center text-sm text-slate-500">
                New to the platform?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('gateway')}
                  className="font-bold text-[#4a63e7] hover:text-[#3a50d0] transition-colors"
                >
                  Create an account ▾
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};