"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { PaymentAccount, PaymentMethodType } from "./types";

const METHODS: PaymentMethodType[] = ["bKash", "Nagad", "Bank Transfer"];

const inputCls =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function AddPaymentMethodModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (account: Omit<PaymentAccount, "id">) => void;
}) {
  const [method, setMethod] = useState<PaymentMethodType>("bKash");
  const [detail, setDetail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!detail.trim() || !ownerName.trim()) {
      setError("Fill in the account detail and account holder name.");
      return;
    }
    onAdd({ method, detail: detail.trim(), ownerName: ownerName.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-base font-semibold text-slate-900">Add payment method</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-sm text-slate-700">Method</label>
            <div className="grid grid-cols-3 gap-2">
              {METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                    method === m
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-700">
              {method === "Bank Transfer" ? "Bank name & account number" : "Mobile number"}
            </label>
            <input
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={method === "Bank Transfer" ? "City Bank · 0123456789" : "01712-345678"}
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-700">Account holder name</label>
            <input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Debraz Pul"
              className={inputCls}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add account
          </button>
        </div>
      </div>
    </div>
  );
}