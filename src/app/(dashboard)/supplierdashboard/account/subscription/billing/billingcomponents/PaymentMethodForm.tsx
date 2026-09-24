"use client";

import { useState } from "react";

interface Props {
  initialProvider?: string;
  onSubmit: (v: { provider: string; number: string }) => Promise<void>;
  onCancel: () => void;
}

const PROVIDERS = ["bKash", "Nagad", "Rocket", "Card"];
const field = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500";

export default function PaymentMethodForm({ initialProvider = "bKash", onSubmit, onCancel }: Props) {
  const [provider, setProvider] = useState(initialProvider);
  const [number, setNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSubmit({ provider, number: number.replace(/\s/g, "") });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
      setSaving(false);
    }
  };

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-slate-200 p-4">
      <select value={provider} onChange={(e) => setProvider(e.target.value)} className={field}>
        {PROVIDERS.map((p) => <option key={p}>{p}</option>)}
      </select>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        inputMode="numeric"
        placeholder={provider === "Card" ? "Card number" : "Wallet number"}
        className={field}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onCancel} className="rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
        <button onClick={submit} disabled={saving} className="rounded-md bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}