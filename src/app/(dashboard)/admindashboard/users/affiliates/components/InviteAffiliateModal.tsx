"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { AffiliateStatus, InviteForm } from "../types";

type Props = {
  onClose: () => void;
  onInvite: (form: InviteForm) => Promise<void>;
};

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#1fa85a]";

export default function InviteAffiliateModal({ onClose, onInvite }: Props) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<InviteForm>({
    name: "",
    email: "",
    code: "",
    status: "Active",
  });

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (k: keyof InviteForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setLoading(true);
    try {
      await onInvite(form);
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-all"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[512px] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4">
          <div className="leading-tight">
            <h2 className="text-base font-semibold text-slate-900">Add Affiliate</h2>
            <p className="mt-1 text-xs text-slate-500">Fill in the details below</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-4 border-y border-slate-100 px-5 py-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Full name</label>
            <input
              className={inputCls}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Email address</label>
            <input
              type="email"
              className={inputCls}
              placeholder="Email address"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Referral code</label>
            <input
              className={inputCls}
              placeholder="Referral code"
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="rounded-lg bg-[#1fa85a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#189a50] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}