"use client";

import Toggle from "./Toggle";
import type { NotificationSettingsData } from "./types";

const ROWS: { key: keyof NotificationSettingsData; label: string; hint: string }[] = [
  { key: "email", label: "Email Notifications", hint: "Receive account updates by email." },
  { key: "commission", label: "Commission Notifications", hint: "Alerts when a commission is approved or paid." },
  { key: "sales", label: "Sales Notifications", hint: "Get notified on every new affiliate sale." },
  { key: "bonus", label: "Bonus Notifications", hint: "Know when you unlock a bonus reward." },
  { key: "referral", label: "Referral Notifications", hint: "Updates when a referral joins or becomes active." },
  { key: "withdrawal", label: "Withdrawal Notifications", hint: "Status changes on your payout requests." },
  { key: "marketing", label: "Marketing Emails", hint: "Promotions, campaigns and product tips." },
];

export default function NotificationSettings({
  data,
  onToggle,
}: {
  data: NotificationSettingsData;
  onToggle: (key: keyof NotificationSettingsData, value: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-6 py-5">
        <h3 className="text-base font-semibold text-slate-900">Notification Settings</h3>
        <p className="mt-0.5 text-sm text-slate-500">Choose which updates you want to receive.</p>
      </div>

      <div className="divide-y divide-slate-100">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 px-6 py-5">
            <div>
              <p className="text-sm font-medium text-slate-800">{row.label}</p>
              <p className="mt-0.5 text-sm text-slate-500">{row.hint}</p>
            </div>
            <Toggle
              checked={data[row.key]}
              onChange={(v) => onToggle(row.key, v)}
              label={row.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}