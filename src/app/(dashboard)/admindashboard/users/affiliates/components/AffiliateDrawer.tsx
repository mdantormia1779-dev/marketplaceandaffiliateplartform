"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Pencil } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Affiliate } from "../types";

type Props = {
  affiliate: Affiliate;
  onClose: () => void;
  onEdit?: () => void;
};

export default function AffiliateDrawer({ affiliate: a, onClose, onEdit }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Name", value: a.name },
    { label: "Email", value: a.email },
    { label: "Code", value: a.code },
    { label: "Referrals", value: a.referrals },
    {
      label: "Earnings",
      value: a.earnings.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    },
    { label: "Status", value: <StatusBadge status={a.status} /> },
    { label: "Joined", value: a.joined },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="leading-tight">
            <h2 className="text-lg font-semibold text-slate-900">{a.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{a.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 text-sm"
            >
              <span className="text-slate-500">{r.label}</span>
              <span className="text-right font-medium text-slate-900">{r.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-[#1fa85a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#189a50]"
          >
            <Pencil className="h-4 w-4" />
            Edit record
          </button>
        </div>
      </aside>
    </div>,
    document.body
  );
}