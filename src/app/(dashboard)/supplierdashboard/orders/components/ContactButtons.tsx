"use client";

import { useState } from "react";
import { Check, Copy, Phone } from "lucide-react";

export function ContactButtons({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available, ignore
    }
  };

  const btn =
    "flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50";

  return (
    <div className="flex items-center gap-2">
      <a href={`tel:${phone}`} className={btn}>
        <Phone size={12} />
        Call
      </a>
      <button onClick={handleCopy} className={btn}>
        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}