"use client";

import { AlertTriangle, X } from "lucide-react";
import type { Coupon } from "./data";

interface DeleteConfirmDialogProps {
  coupon: Coupon | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({ coupon, onCancel, onConfirm }: DeleteConfirmDialogProps) {
  if (!coupon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onCancel} />

      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-50 text-rose-600">
          <AlertTriangle className="h-5 w-5" />
        </span>

        <h3 className="mt-3 text-base font-semibold text-slate-900">Delete this code?</h3>
        <p className="mt-1 text-sm text-slate-500">
          <span className="font-mono font-medium text-slate-700">{coupon.code}</span> will stop
          working at checkout immediately. This can&apos;t be undone.
        </p>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700"
          >
            Delete code
          </button>
        </div>
      </div>
    </div>
  );
}