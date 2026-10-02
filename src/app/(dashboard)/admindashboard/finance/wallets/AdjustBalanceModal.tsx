"use client";

import { FormEvent, useState } from "react";
import { money2 } from "./format";
import { AdjustMode, Wallet } from "./types";

interface Props {
  wallets: Wallet[];
  initialId: string;
  onClose: () => void;
  onAdjust: (id: string, mode: AdjustMode, amount: number) => string | null;
}

const input = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500";

export default function AdjustBalanceModal({ wallets, initialId, onClose, onAdjust }: Props) {
  const [id, setId] = useState(initialId || wallets[0]?.id || "");
  const [mode, setMode] = useState<AdjustMode>("Credit");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const wallet = wallets.find((w) => w.id === id);
  const value = Number(amount);
  const after = wallet && value > 0 ? wallet.balance + (mode === "Credit" ? value : -value) : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = onAdjust(id, mode, value);
    if (err) setError(err);
    else onClose();
  };

  const modeBtn = (m: AdjustMode) =>
    `flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
      mode === m ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Adjust balance</h2>

        <select
          className={input}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setError(null);
          }}
        >
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>
              {w.owner} ({w.id}){w.status === "Frozen" ? " - Frozen" : ""}
            </option>
          ))}
        </select>

        {wallet && (
          <p className="text-xs text-gray-500">
            Current balance: <span className="font-medium text-gray-900">{money2(wallet.balance)}</span>
          </p>
        )}

        <div className="flex gap-2">
          <button type="button" className={modeBtn("Credit")} onClick={() => { setMode("Credit"); setError(null); }}>
            Credit
          </button>
          <button type="button" className={modeBtn("Debit")} onClick={() => { setMode("Debit"); setError(null); }}>
            Debit
          </button>
        </div>

        <input
          required
          type="number"
          min="0.01"
          step="0.01"
          className={input}
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError(null);
          }}
        />

        {after !== null && (
          <p className="text-xs text-gray-500">
            New balance: <span className="font-medium text-gray-900">{money2(after)}</span>
          </p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            {mode === "Credit" ? "Add funds" : "Deduct funds"}
          </button>
        </div>
      </form>
    </div>
  );
}
