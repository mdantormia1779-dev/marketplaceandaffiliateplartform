"use client";
import { FormEvent, useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: (name: string, company: string) => string | null;
}

const input = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500";

export default function AddBrandModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = onAdd(name, company);
    if (err) setError(err);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Add brand</h2>
        <input
          autoFocus
          required
          className={input}
          placeholder="Brand name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
        />
        <input className={input} placeholder="Company name (optional)" value={company} onChange={(e) => setCompany(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-gray-500">New brands start as Pending until you approve them.</p>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm">Cancel</button>
          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            Add brand
          </button>
        </div>
      </form>
    </div>
  );
}