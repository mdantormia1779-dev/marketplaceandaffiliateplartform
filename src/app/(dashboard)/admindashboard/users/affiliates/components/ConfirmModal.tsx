"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalType = "suspend" | "activate" | "delete";

type Props = {
  type: ModalType;
  name?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const config = {
  suspend: {
    title: "Suspend record",
    text: "The selected record will be suspended and hidden from the public marketplace.",
    btn: "Suspend",
    loadingBtn: "Suspending...",
  },
  activate: {
    title: "Activate record",
    text: "The selected record will be activated and visible on the public marketplace.",
    btn: "Activate",
    loadingBtn: "Activating...",
  },
  delete: {
    title: "Delete record",
    text: "This action permanently removes the selected record. This cannot be undone.",
    btn: "Delete",
    loadingBtn: "Deleting...",
  },
};

export default function ConfirmModal({ type, loading, onCancel, onConfirm }: Props) {
  const [mounted, setMounted] = useState(false);
  const c = config[type];

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with Blur Effect */}
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-all"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-[512px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-base font-semibold text-slate-900">{c.title}</h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm leading-relaxed text-slate-600">{c.text}</p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-[#c77c02] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#b06d02] disabled:opacity-60"
          >
            {loading ? c.loadingBtn : c.btn}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}