"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Coupon } from "./data";
import { computeCouponStatus } from "./lib";
import {
  emptyCouponFormState,
  validateCouponForm,
  buildCouponValue,
  type CouponFormState,
} from "./couponForm";
import CouponFormFields from "./CouponFormFields";

interface NewCodeDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (coupon: Coupon) => void;
  existingCodes: string[];
}

export default function NewCodeDialog({ open, onClose, onCreate, existingCodes }: NewCodeDialogProps) {
  const [form, setForm] = useState<CouponFormState>(emptyCouponFormState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(emptyCouponFormState);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function updateField<K extends keyof CouponFormState>(key: K, value: CouponFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit() {
    const validationError = validateCouponForm(form, existingCodes);
    if (validationError) return setError(validationError);

    const coupon: Coupon = {
      id: `c-${Date.now()}`,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      type: form.type,
      value: buildCouponValue(form),
      appliesTo: form.appliesTo.trim() || "All products",
      maxUses: form.maxUses.trim() ? Number(form.maxUses) : null,
      perCustomer: Number(form.perCustomer) || 1,
      stackable: form.stackable,
      startsAt: form.startsAt,
      endsAt: form.endsAt,
      redemptions: 0,
      customers: 0,
      revenue: null,
      lastUsedAt: null,
      status: computeCouponStatus(form.startsAt, form.endsAt),
    };

    onCreate(coupon);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">New coupon code</h3>
            <p className="mt-1 text-sm text-slate-500">
              Customers redeem this code at checkout, up to the limits you set.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <CouponFormFields form={form} onFieldChange={updateField} />

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            Create code
          </button>
        </div>
      </div>
    </div>
  );
}