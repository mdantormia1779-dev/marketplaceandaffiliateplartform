"use client";

import { Plus } from "lucide-react";

export default function PageHeader({ onInvite }: { onInvite: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Affiliates</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage affiliate accounts and their referral performance.
        </p>
      </div>
      <button
        type="button"
        onClick={onInvite}
        className="flex items-center gap-2 rounded-lg bg-[#1fa85a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#189a50]"
      >
        <Plus className="h-4 w-4" />
        Invite Affiliate
      </button>
    </div>
  );
}