"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export type ToastData = { message: string; undo?: () => void };

export function PendingToast({
  toast,
  onClose,
}: {
  toast: ToastData;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:right-8 sm:top-6">
      <CheckCircle2 size={18} className="text-emerald-500" />
      <p className="text-sm text-slate-700">{toast.message}</p>
      {toast.undo && (
        <button
          onClick={() => {
            toast.undo?.();
            onClose();
          }}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Undo
        </button>
      )}
    </div>
  );
}