"use client";

import { Bell, CreditCard, Lock, Settings as SettingsIcon, ShieldCheck } from "lucide-react";
import type { TabId } from "./types";

const TABS: { id: TabId; label: string; icon: typeof SettingsIcon }[] = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "privacy", label: "Privacy", icon: Lock },
];

export default function SettingsTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white p-1.5 sm:grid-cols-5">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            active === id
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
}