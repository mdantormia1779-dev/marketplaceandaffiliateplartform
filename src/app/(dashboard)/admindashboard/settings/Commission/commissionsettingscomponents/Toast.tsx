"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";
import { ToastState } from "./types";

interface Props {
  toast: ToastState;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: Props) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;
  const ok = toast.type === "success";
  const Icon = ok ? CheckCircle2 : XCircle;

  return (
    <div
      role={ok ? "status" : "alert"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-lg"
    >
      <Icon size={18} className={ok ? "text-emerald-600" : "text-red-600"} />
      {toast.message}
    </div>
  );
}
