"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Coupon } from "./data";
import { computeCouponStatus } from "./lib";
import {
  stateFromCoupon,
  validateCouponForm,
  buildCouponValue,
  type CouponFormState,
} from "./couponForm";
import CouponFormFields from "./CouponFormFields";

interface EditCodeDialogProps {
  coupon: Coupon | null;
  onClose: () => void;
  onUpdate: (coupon: Coupon) => void;
  existingCodes: string[];
}

export default function EditCodeDialog({ coupon, onClose, onUpdate, existingCodes }: EditCodeDialogProps) {
  const [form, setForm] = useState<CouponFormState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (coupon) {
      setForm(stateFromCoupon(coupon));
      setError(null);
    } else {
      setForm(null);
    }
  }, [coupon]);

  useEffect(() => {
    if (!coupon) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [coupon, onClose]);

  if (!coupon || !form) return null;

  function updateField<K extends keyof CouponFormState>(key: K, value: CouponFormState[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function handleSubmit() {
    if (!form || !coupon) return;
    // Exclude the coupon's own current code from the duplicate check.
    const otherCodes = existingCodes.filter((code) => code !== coupon.code.toUpperCase());
    const validationError = validateCouponForm(form, otherCodes);
    if (validationError) return setError(validationError);

    const updated: Coupon = {
      ...coupon,
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
      // A manually-disabled code stays disabled; otherwise recompute from the new dates.
      status: coupon.status === "disabled" ? "disabled" : computeCouponStatus(form.startsAt, form.endsAt),
    };

    onUpdate(updated);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Edit coupon code</h3>
            <p className="mt-1 text-sm text-slate-500">
              Changes apply the next time this code is used at checkout.
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}