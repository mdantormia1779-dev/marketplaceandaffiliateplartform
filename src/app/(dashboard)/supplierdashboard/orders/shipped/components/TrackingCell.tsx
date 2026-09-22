// app/(dashboard)/supplierdashboard/orders/shipped/components/TrackingCell.tsx

"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

export function TrackingCell({ courier, trackingId }: { courier: string; trackingId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  return (
    <div>
      <p className="text-xs font-medium text-slate-700">{courier}</p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <span className="font-mono text-[11px] text-slate-400">{trackingId}</span>
        <button
          onClick={handleCopy}
          title="Copy tracking ID"
          className="text-slate-300 transition hover:text-indigo-600"
        >
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        </button>
        <button title="Track shipment" className="text-slate-300 transition hover:text-indigo-600">
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}