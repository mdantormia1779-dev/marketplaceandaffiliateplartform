"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Fee } from "../types";
import { formatMoney } from "../data";
import StatusBadge from "./StatusBadge";

interface FeeDrawerProps {
  fee: Fee | null; // null hole drawer bondho
  onClose: () => void;
}

export default function FeeDrawer({ fee, onClose }: FeeDrawerProps) {
  useEffect(() => {
    if (!fee) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fee, onClose]);

  if (!fee) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 print:hidden" onClick={onClose}>
      <aside
        className="h-full w-full max-w-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{fee.store}</h2>
            <p className="text-sm text-gray-500">
              {fee.plan} · {formatMoney(fee.amount)}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <dl className="px-6">
          <Row label="Store">{fee.store}</Row>
          <Row label="Plan">{fee.plan}</Row>
          <Row label="Amount">{formatMoney(fee.amount)}</Row>
          <Row label="Method">{fee.method}</Row>
          <Row label="Paid">{fee.paidOn ?? "—"}</Row>
          <Row label="Status"><StatusBadge status={fee.status} /></Row>
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