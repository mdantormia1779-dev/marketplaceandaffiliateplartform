"use client";

import { useState } from "react";
import type { GeneralSettingsData } from "./types";

const COUNTRIES = ["Bangladesh", "India", "Pakistan", "United States", "United Kingdom"];
const LANGUAGES = ["English", "Bengali", "Hindi"];
const TIMEZONES = [
  "(GMT+06:00) Dhaka",
  "(GMT+05:30) Kolkata",
  "(GMT+00:00) London",
  "(GMT-05:00) New York",
];

const inputCls =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function GeneralSettings({
  data,
  onChange,
  onSave,
}: {
  data: GeneralSettingsData;
  onChange: <K extends keyof GeneralSettingsData>(key: K, value: GeneralSettingsData[K]) => void;
  onSave: () => void;
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900">General Settings</h3>
          <p className="mt-0.5 text-sm text-slate-500">Update your basic account information.</p>
        </div>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-slate-700">Full Name</label>
          <input
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-700">Phone</label>
          <input
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-700">Country</label>
          <select
            value={data.country}
            onChange={(e) => onChange("country", e.target.value)}
            className={inputCls}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-700">Language</label>
          <select
            value={data.language}
            onChange={(e) => onChange("language", e.target.value)}
            className={inputCls}
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-700">Timezone</label>
          <select
            value={data.timezone}
            onChange={(e) => onChange("timezone", e.target.value)}
            className={inputCls}
          >
            {TIMEZONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}