"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Referral } from "../types";
import { formatMoney } from "../data";
import StatusBadge from "./StatusBadge";

interface ReferralDrawerProps {
  referral: Referral | null; // null hole drawer bondho
  onClose: () => void;
}

export default function ReferralDrawer({ referral, onClose }: ReferralDrawerProps) {
  useEffect(() => {
    if (!referral) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [referral, onClose]);

  if (!referral) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 print:hidden" onClick={onClose}>
      <aside
        className="h-full w-full max-w-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{referral.referrer}</h2>
            <p className="text-sm text-gray-500">
              {referral.referred} · {formatMoney(referral.reward)}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <dl className="px-6">
          <Row label="Referrer">{referral.referrer}</Row>
          <Row label="Referred">{referral.referred}</Row>
          <Row label="Plan">{referral.plan}</Row>
          <Row label="Reward">{formatMoney(referral.reward)}</Row>
          <Row label="Status"><StatusBadge status={referral.status} /></Row>
          <Row label="Date">{referral.date}</Row>
        </dl>
      </aside>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-0">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{children}</dd>
    </div>
  );
}