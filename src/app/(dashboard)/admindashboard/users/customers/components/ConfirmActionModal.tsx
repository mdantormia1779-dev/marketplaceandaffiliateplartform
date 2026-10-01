"use client";

import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  type: "suspend" | "delete" | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmActionModal({
  isOpen,
  type,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen || !type) return null;

  const isSuspend = type === "suspend";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            {isSuspend ? "Suspend record" : "Delete record"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message */}
        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          {isSuspend
            ? "The selected record will be suspended and hidden from the public marketplace."
            : "This action permanently removes the selected record. This cannot be undone."}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition shadow-sm ${
              isSuspend
                ? "bg-[#c67d0a] hover:bg-[#b06f08]"
                : "bg-[#c67d0a] hover:bg-[#b06f08]" // screenshot onujayi ochre/amber color
            }`}
          >
            {isSuspend ? "Suspend" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}