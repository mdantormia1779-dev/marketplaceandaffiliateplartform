"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

export interface RowMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
  hidden?: boolean;
}

export default function RowMenu({ items }: { items: RowMenuItem[] }) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pos) return setPos(null);
    const rect = btnRef.current!.getBoundingClientRect();
    setPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label="Row actions"
        className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
      >
        <MoreHorizontal size={18} />
      </button>
      {pos && (
        <div
          style={{ top: pos.top, right: pos.right }}
          className="fixed z-30 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {items
            .filter((i) => !i.hidden)
            .map((i) => (
              <button
                key={i.label}
                onClick={() => {
                  setPos(null);
                  i.onClick();
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                  i.danger ? "text-red-600" : "text-slate-700"
                }`}
              >
                {i.label}
              </button>
            ))}
        </div>
      )}
    </>
  );
}