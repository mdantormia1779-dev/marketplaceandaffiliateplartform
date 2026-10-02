"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string | null; // null hole kichu dekhabe na
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  // 3 second por nijei chole jabe
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    // kon kone dekhabe: bottom-6 right-6 (niche dan). Bodlate chaile:
    // upore dan -> top-6 right-6 | niche bam -> bottom-6 left-6 | upore bam -> top-6 left-6
    <div
      role="status"
      className="pointer-events-none fixed bottom-6 right-6 z-[60] print:hidden"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
        <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
        <span>{message}</span>
        <button onClick={onClose} aria-label="Dismiss" className="ml-2 text-gray-400 hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}