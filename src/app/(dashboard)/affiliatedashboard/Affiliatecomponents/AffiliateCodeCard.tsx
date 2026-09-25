"use client";

import { useState } from "react";
import { TrendingUp, Copy, Check } from "lucide-react";

export default function AffiliateCodeCard() {
  const [copied, setCopied] = useState(false);
  const code = "affiliate123";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-xs rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
          <TrendingUp className="h-3.5 w-3.5" />
          Gold Partner
        </span>
        <span className="text-[11px] font-medium tracking-wide text-gray-400">
          AFFILIATE CODE
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2.5">
        <span className="font-mono text-sm text-gray-800">{code}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-gray-400">
        Share your code with new marketers and earn a bonus on every signup.
      </p>
    </div>
  );
}