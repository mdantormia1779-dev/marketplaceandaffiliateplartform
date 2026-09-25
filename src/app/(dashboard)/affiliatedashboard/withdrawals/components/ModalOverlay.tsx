"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalOverlayProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export default function ModalOverlay({
  title,
  subtitle,
  onClose,
  children,
  footer,
  maxWidth = "max-w-md",
}: ModalOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-up"
      style={{ animationDuration: "180ms" }}
      onClick={onClose}
    >
      <div
        className={"w-full " + maxWidth + " bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {subtitle ? <p className="text-xs text-slate-500 mt-1">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto space-y-5">{children}</div>

        {footer ? (
          <div className="px-6 py-4 border-t border-slate-100 shrink-0">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}