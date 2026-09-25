'use client';
import { useState } from 'react';
import { Copy, Check, Send } from 'lucide-react';

export default function ReferralHero() {
  const referralLink = 'https://marketplace.com/register?ref=DEBRAZ25';
  const referralCode = 'DEBRAZ25';
  
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Join using my referral link: ' + referralLink)}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join using my referral link!')}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join this amazing platform using my referral link!')}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`, '_blank');
  };

  return (
    <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <span>👥</span> Affiliate Referral Program
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Invite Friends & Earn</h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            Share your referral link and earn rewards when your referrals become active affiliates.
          </p>

          <div className="inline-flex items-center gap-3 rounded-xl bg-white/10 p-2.5 backdrop-blur-md border border-white/20">
            <span className="text-[11px] font-semibold tracking-wider text-blue-200 pl-1">REFERRAL CODE</span>
            <span className="font-bold tracking-wide">{referralCode}</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-medium hover:bg-white/30 transition-colors"
            >
              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedCode ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="w-full max-w-md rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Your Referral Link</h3>
          
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full bg-transparent text-xs text-slate-600 focus:outline-none px-1"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shrink-0"
            >
              {copiedCode || copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedLink ? 'Copied' : 'Copy Link'}
            </button>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">SHARE TO</p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={shareToFacebook}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="h-3.5 w-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg> 
                Facebook
              </button>
              <button 
                onClick={shareToWhatsApp}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                💬 WhatsApp
              </button>
              <button 
                onClick={shareToTelegram}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Send className="h-3.5 w-3.5 text-sky-500" /> Telegram
              </button>
              <button 
                onClick={shareToTwitter}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                𝕏 X
              </button>
              <button 
                onClick={shareToLinkedIn}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="h-3.5 w-3.5 text-blue-700 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}