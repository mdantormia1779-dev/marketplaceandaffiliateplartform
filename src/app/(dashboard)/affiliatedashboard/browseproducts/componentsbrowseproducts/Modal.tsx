"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

// Shared shell (backdrop + panel + header + footer) so GenerateLinkModal and
// ProductDetailsModal only need to supply their own body content.
export default function Modal({ title, subtitle, onClose, children, footer }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p> : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children}

        {footer ? (
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
