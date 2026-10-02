"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Subscription } from "../types";
import { money } from "../utils";

export default function DetailsDrawer({ item, onClose }: { item: Subscription | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const rows: [string, React.ReactNode][] = [
    ["Store", item.store],
    ["Plan", item.plan],
    ["Billing", item.billing],
    ["Amount", money(item.amount)],
    ["Started", item.started],
    ["Renews", item.renews],
    ["Status", <StatusBadge key="s" status={item.status} />],
  ];

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40" onMouseDown={onClose}>
      <aside
        onMouseDown={(e) => e.stopPropagation()}
        className="h-full w-full max-w-[570px] bg-white shadow-2xl"
        aria-label="Subscription details"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-[17px] font-semibold text-slate-900">{item.store}</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {item.plan} · {item.billing}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded p-1 text-slate-500 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <dl className="px-6">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm">
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}