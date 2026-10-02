"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Fee } from "../types";
import { methods, plans } from "../data";

export interface FeeFormData {
  store: string;
  plan: string;
  amount: number;
  method: string;
  paidOn: string | null;
}

interface FeeFormModalProps {
  open: boolean;
  fee: Fee | null; // thakle Edit mode, na thakle Add mode
  onClose: () => void;
  onSubmit: (data: FeeFormData) => void;
}

// form e shob value string hishebe rakhi, submit er somoy number e convert kori
interface FormState {
  store: string;
  plan: string;
  amount: string;
  method: string;
  paidOn: string;
}

const empty: FormState = {
  store: "",
  plan: plans[0].name,
  amount: String(plans[0].price),
  method: methods[0],
  paidOn: "",
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white";

export default function FeeFormModal({ open, fee, onClose, onSubmit }: FeeFormModalProps) {
  const isEdit = !!fee;
  const [form, setForm] = useState<FormState>(empty);

  // modal khulle form fill hobe (Edit hole purano data, Add hole faka)
  useEffect(() => {
    if (!open) return;
    setForm(
      fee
        ? {
            store: fee.store,
            plan: fee.plan,
            amount: String(fee.amount),
            method: fee.method,
            paidOn: fee.paidOn ?? "",
          }
        : empty
    );
  }, [open, fee]);

  // Esc chaple bondho
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Plan bodlale amount o plan er price e set hoye jay (pore hater e bodlano jay)
  const changePlan = (name: string) => {
    const price = plans.find((p) => p.name === name)?.price ?? 0;
    setForm((f) => ({ ...f, plan: name, amount: String(price) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      store: form.store,
      plan: form.plan,
      amount: Number(form.amount),
      method: form.method,
      paidOn: form.paidOn || null,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 print:hidden"
      onClick={onClose}
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Joining Fee" : "Add Joining Fee"}
            </h2>
            <p className="text-sm text-gray-500">
              {isEdit ? "Update the details below" : "Fill in the details below"}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 border-y border-gray-100 px-6 py-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Store
              <input required className={inputClass} placeholder="Store"
                value={form.store} onChange={(e) => update("store", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Plan
              <select className={inputClass} value={form.plan} onChange={(e) => changePlan(e.target.value)}>
                {plans.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Amount
              <input required type="number" min="0" step="0.01" className={inputClass} placeholder="Amount"
                value={form.amount} onChange={(e) => update("amount", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Method
              <select className={inputClass} value={form.method} onChange={(e) => update("method", e.target.value)}>
                {methods.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Paid
              <input type="date" className={inputClass}
                value={form.paidOn} onChange={(e) => update("paidOn", e.target.value)} />
            </label>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4">
            <button type="button" onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit"
              className="rounded-lg bg-[#1fae6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#189a5d]">
              {isEdit ? "Save changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}