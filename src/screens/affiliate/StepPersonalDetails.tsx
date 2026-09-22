import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Eye, EyeOff, Link as LinkIcon, ArrowRight, ArrowLeft, Globe, CheckCircle2 } from 'lucide-react';

interface Props {
  onNext: () => void;
  onNavigate: (screen: any) => void;
}

export const StepPersonalDetails: React.FC<Props> = ({ onNext, onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [referralCode, setReferralCode] = useState('NX-SUP-2291');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [primaryLink, setPrimaryLink] = useState('');

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="w-full pl-10 pr-4 py-3.5 text-xs bg-[#F8FAFC]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
            required
          />
        </div>

        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full pl-10 pr-4 py-3.5 text-xs bg-[#F8FAFC]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
            required
          />
        </div>
      </div>

      <div className="relative">
        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full pl-10 pr-4 py-3.5 text-xs bg-[#F8FAFC]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
          required
        />
      </div>

      <div className="relative">
        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create password"
          className="w-full pl-10 pr-10 py-3.5 text-xs bg-[#F8FAFC]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="bg-[#F8FAFC]/80 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">Have an affiliate referral link or code?</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-700 text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3" />
            AUTO-DETECTED
          </span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3">
          <LinkIcon className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Referral code</p>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="font-extrabold text-slate-900 text-sm bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <p className="text-[11px] text-slate-400">Leave as-is or enter a code shared by an existing affiliate.</p>
      </div>

      <div className="pt-2 space-y-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          WHERE WILL YOU PROMOTE? <span className="font-normal text-slate-400">(select all that apply)</span>
        </label>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => togglePlatform('facebook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              selectedPlatforms.includes('facebook') ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook Page</span>
          </button>

          <button
            type="button"
            onClick={() => togglePlatform('youtube')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              selectedPlatforms.includes('youtube') ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <svg className="w-4 h-4 fill-red-600" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>YouTube</span>
          </button>

          <button
            type="button"
            onClick={() => togglePlatform('tiktok')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              selectedPlatforms.includes('tiktok') ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <span className="font-bold text-xs">🎵</span>
            <span>TikTok</span>
          </button>

          <button
            type="button"
            onClick={() => togglePlatform('website')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              selectedPlatforms.includes('website') ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Website / Blog</span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <div className="relative">
          <LinkIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={primaryLink}
            onChange={(e) => setPrimaryLink(e.target.value)}
            placeholder="Primary profile or page link"
            className="w-full pl-10 pr-4 py-3.5 text-xs bg-[#F8FAFC]/60 border border-slate-200/80 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 ml-1">Used to classify your affiliate tier.</p>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={() => onNavigate('gateway')}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to role selection</span>
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-xs"
        >
          <span>Continue to payout setup</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};