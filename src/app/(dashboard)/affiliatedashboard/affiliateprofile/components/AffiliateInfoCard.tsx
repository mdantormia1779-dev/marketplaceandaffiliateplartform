import type { ReactNode } from "react";
import { AffiliateProfile } from "../types";

function InfoBox({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-1 text-sm font-bold text-slate-900">{children}</div>
    </div>
  );
}

export function AffiliateInfoCard({ profile }: { profile: AffiliateProfile }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 border-b border-slate-100 pb-4">
        <h3 className="text-sm font-bold text-slate-900">Affiliate Information</h3>
        <p className="text-xs text-slate-400">Your affiliate identity and commission tier.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InfoBox label="Affiliate ID">{profile.affiliateId}</InfoBox>
        <InfoBox label="Referral Code">{profile.referralCode}</InfoBox>
        <InfoBox label="Commission Tier">{profile.commissionTier}</InfoBox>
        <InfoBox label="Joined Date">{profile.joinedDate}</InfoBox>
        <InfoBox label="Account Status">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        </InfoBox>
      </div>
    </div>
  );
}