"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Affiliate, AffiliateForm, AffiliateStatus } from "../types";

type Props = {
  affiliate: Affiliate;
  onClose: () => void;
  onSave: (form: AffiliateForm) => void;
};

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#1fa85a]";

export default function EditAffiliateModal({ affiliate: a, onClose, onSave }: Props) {
  const [form, setForm] = useState<AffiliateForm>({
    name: a.name,
    email: a.email,
    code: a.code,
    status: a.status,
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (k: keyof AffiliateForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => onSave(form);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/40" />

      <div className="relative w-full max-w-[520px] rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between px-6 py-5">
          <div className="leading-tight">
            <h2 className="text-lg font-semibold text-slate-900">Edit Affiliate</h2>
            <p className="mt-1 text-xs text-slate-500">Update the details below</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-slate-100 px-6 py-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Full name</label>
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Email address</label>
            <input
              type="email"
              className={inputCls}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Referral code</label>
            <input
              className={inputCls}
              value={form.code}
              onChange={(e) => set("code", e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Status</label>
            <select
              className={inputCls}
              value={form.status}
              onChange={(e) => set("status", e.target.value as AffiliateStatus)}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            className="rounded-lg bg-[#1fa85a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#189a50]"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}