"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Referral } from "../types";
import { plans, rewardByPlan } from "../data";

export interface ReferralFormData {
  referrer: string;
  referred: string;
  plan: string;
  reward: number;
  date: string;
}

interface ReferralFormModalProps {
  referral: Referral | null; // null hole modal bondho
  onClose: () => void;
  onSubmit: (data: ReferralFormData) => void;
}

// form e shob value string hishebe rakhi, submit er somoy reward number e convert kori
interface FormState {
  referrer: string;
  referred: string;
  plan: string;
  reward: string;
  date: string;
}

const empty: FormState = { referrer: "", referred: "", plan: plans[0], reward: "", date: "" };

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white";

export default function ReferralFormModal({ referral, onClose, onSubmit }: ReferralFormModalProps) {
  const [form, setForm] = useState<FormState>(empty);

  // modal khulle purano data diye form fill hobe
  useEffect(() => {
    if (!referral) return;
    setForm({
      referrer: referral.referrer,
      referred: referral.referred,
      plan: referral.plan,
      reward: String(referral.reward),
      date: referral.date,
    });
  }, [referral]);

  // Esc chaple bondho
  useEffect(() => {
    if (!referral) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [referral, onClose]);

  if (!referral) return null;

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Plan bodlale reward o plan er reward e set hoy (pore hater e bodlano jay)
  const changePlan = (name: string) =>
    setForm((f) => ({ ...f, plan: name, reward: String(rewardByPlan[name] ?? 0) }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      referrer: form.referrer,
      referred: form.referred,
      plan: form.plan,
      reward: Number(form.reward),
      date: form.date,
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
            <h2 className="text-lg font-semibold text-gray-900">Edit Supplier Referral</h2>
            <p className="text-sm text-gray-500">Update the details below</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 border-y border-gray-100 px-6 py-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Referrer
              <input required className={inputClass} placeholder="Referrer"
                value={form.referrer} onChange={(e) => update("referrer", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Referred
              <input required className={inputClass} placeholder="Referred"
                value={form.referred} onChange={(e) => update("referred", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Plan
              <select className={inputClass} value={form.plan} onChange={(e) => changePlan(e.target.value)}>
                {plans.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Reward
              <input required type="number" min="0" step="0.01" className={inputClass} placeholder="Reward"
                value={form.reward} onChange={(e) => update("reward", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Date
              <input required type="date" className={inputClass}
                value={form.date} onChange={(e) => update("date", e.target.value)} />
            </label>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4">
            <button type="button" onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit"
              className="rounded-lg bg-[#1fae6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#189a5d]">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}