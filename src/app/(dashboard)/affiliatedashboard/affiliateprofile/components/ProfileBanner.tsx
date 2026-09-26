"use client";

import { useState } from "react";
import { Fingerprint, Mail, Calendar, Phone, MapPin, User } from "lucide-react";
import { AffiliateProfile } from "../types";
import { CopyButton } from "./CopyButton";

export function ProfileBanner({ profile }: { profile: AffiliateProfile }) {
  const [imageError, setImageError] = useState(false);

  // Fallback Initials (e.g. "DP" for "Debraz Pul")
  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* আগের Indigo to Blue Gradient ব্যাকগ্রাউন্ড */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-500 sm:h-32">
        <div className="absolute -right-6 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute right-16 top-6 h-16 w-16 rounded-full bg-white/10" />
      </div>

      <div className="px-5 pb-5 sm:px-6">
        {/* Avatar + name row */}
        <div className="flex flex-wrap items-end justify-between gap-4 pt-0">
          <div className="relative z-10 -mt-10 flex items-end gap-4">
            {/* Avatar Container with Auto Fallback */}
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-indigo-50 shadow-md sm:h-24 sm:w-24">
              {!imageError && profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-500 text-lg font-bold text-white sm:text-xl">
                  {initials || <User size={24} />}
                </div>
              )}
            </div>

            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{profile.fullName}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {profile.tierLabel}
                </span>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Fingerprint size={13} className="text-slate-400" />
                  Affiliate ID: <span className="font-medium text-slate-700">{profile.affiliateId}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={13} className="text-slate-400" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" />
                  Member since {profile.memberSince}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Referral
                </p>
                <p className="text-sm font-bold text-slate-800">{profile.referralCode}</p>
              </div>
              <CopyButton value={profile.referralCode} label="Referral code copied" />
            </div>
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <Phone size={14} className="text-slate-400" />
            {profile.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-400" />
            {profile.address}
          </span>
        </div>
      </div>
    </div>
  );
}