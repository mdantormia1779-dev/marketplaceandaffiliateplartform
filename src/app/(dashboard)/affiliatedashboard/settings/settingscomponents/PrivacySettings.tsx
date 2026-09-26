"use client";

import { ShieldCheck } from "lucide-react";
import Toggle from "./Toggle";
import type { PrivacySettingsData } from "./types";

const ROWS: { key: keyof PrivacySettingsData; label: string; hint: string }[] = [
  {
    key: "publicProfile",
    label: "Public Profile Visibility",
    hint: "Show your affiliate profile in the marketplace directory.",
  },
  {
    key: "personalisedMarketing",
    label: "Personalised Marketing",
    hint: "Use my data to recommend products and campaigns.",
  },
  {
    key: "partnerDataSharing",
    label: "Partner Data Sharing",
    hint: "Share anonymised analytics with marketplace partners.",
  },
];

export default function PrivacySettings({
  data,
  onToggle,
}: {
  data: PrivacySettingsData;
  onToggle: (key: keyof PrivacySettingsData, value: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <ShieldCheck size={16} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900">Privacy</h3>
          <p className="mt-0.5 text-sm text-slate-500">Control how your profile and data are used.</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 px-6 py-5">
            <div>
              <p className="text-sm font-medium text-slate-800">{row.label}</p>
              <p className="mt-0.5 text-sm text-slate-500">{row.hint}</p>
            </div>
            <Toggle checked={data[row.key]} onChange={(v) => onToggle(row.key, v)} label={row.label} />
          </div>
        ))}
      </div>
    </div>
  );
}