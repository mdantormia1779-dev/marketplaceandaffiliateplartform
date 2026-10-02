"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastItem {
  id: number;
  message: string;
}

const ToastContext = createContext<{ toast: (message: string) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, message }]);
      setTimeout(() => dismiss(id), 3500);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-6 z-[100] flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-lg bg-[#10151c] px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{t.message}</span>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-white/50 hover:text-white">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}