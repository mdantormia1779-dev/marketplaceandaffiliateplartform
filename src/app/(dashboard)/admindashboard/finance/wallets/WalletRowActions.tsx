"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WalletStatus } from "./types";

interface Props {
  status: WalletStatus;
  walletId: string;
  onAdjust: () => void;
  onToggleFreeze: () => void;
}

export default function WalletRowActions({ status, walletId, onAdjust, onToggleFreeze }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const item = "block w-full px-3 py-2 text-left text-sm hover:bg-gray-50";
  const run = (fn: () => void) => () => {
    fn();
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-label="Row actions" className="rounded p-1 text-gray-500 hover:bg-gray-100">
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <button className={item} onClick={run(onAdjust)}>
            Adjust balance
          </button>
          {status === "Active" ? (
            <button className={`${item} text-amber-700`} onClick={run(onToggleFreeze)}>
              Freeze wallet
            </button>
          ) : (
            <button className={`${item} text-emerald-700`} onClick={run(onToggleFreeze)}>
              Unfreeze wallet
            </button>
          )}
          <button className={item} onClick={run(() => navigator.clipboard?.writeText(walletId))}>
            Copy wallet ID
          </button>
        </div>
      )}
    </div>
  );
}
