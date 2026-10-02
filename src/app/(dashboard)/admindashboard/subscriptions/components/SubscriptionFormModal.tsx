"use client";

import { FormEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import { BILLINGS, Billing, PLANS, Plan, Subscription, SubscriptionInput } from "../types";

interface Props {
  open: boolean;
  initial?: Subscription | null; // null/undefined = add mode
  onClose: () => void;
  onSubmit: (values: SubscriptionInput) => void;
}

const empty = { store: "", plan: "Starter" as Plan, billing: "Monthly" as Billing, amount: "", started: "", renews: "" };

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

export default function SubscriptionFormModal({ open, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const isEdit = !!initial;

  useEffect(() => {
    if (!open) return;
    setError("");
    setForm(
      initial
        ? {
            store: initial.store,
            plan: initial.plan,
            billing: initial.billing,
            amount: String(initial.amount),
            started: initial.started,
            renews: initial.renews,
          }
        : empty
    );
  }, [open, initial]);

  const set = <K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount.replace(/[$,]/g, ""));
    if (!form.store.trim() || !form.started || !form.renews || Number.isNaN(amount) || amount < 0) {
      setError("Fill in every field with a valid value.");
      return;
    }
    onSubmit({ store: form.store.trim(), plan: form.plan, billing: form.billing, amount, started: form.started, renews: form.renews });
  };

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit Subscription" : "Add Subscription"}
      description={isEdit ? "Update the details below" : "Fill in the details below"}
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">
            Cancel
          </button>
          <button
            type="submit"
            form="subscription-form"
            className="rounded-lg bg-[#1fb06f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#189a60]"
          >
            {isEdit ? "Save changes" : "Create"}
          </button>
        </>
      }
    >
      <form id="subscription-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        <Field label="Store">
          <input className={inputCls} placeholder="Store" value={form.store} onChange={(e) => set("store", e.target.value)} />
        </Field>
        <Field label="Plan">
          <select className={inputCls} value={form.plan} onChange={(e) => set("plan", e.target.value as Plan)}>
            {PLANS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Billing">
          <select className={inputCls} value={form.billing} onChange={(e) => set("billing", e.target.value as Billing)}>
            {BILLINGS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Amount">
          <input className={inputCls} inputMode="decimal" placeholder="Amount" value={form.amount} onChange={(e) => set("amount", e.target.value)} />
        </Field>
        <Field label="Started">
          <input type="date" className={inputCls} value={form.started} onChange={(e) => set("started", e.target.value)} />
        </Field>
        <Field label="Renews">
          <input type="date" className={inputCls} value={form.renews} onChange={(e) => set("renews", e.target.value)} />
        </Field>
        {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      </form>
    </Modal>
  );
}