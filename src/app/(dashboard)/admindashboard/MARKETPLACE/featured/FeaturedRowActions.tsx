"use client";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FeaturedStatus } from "./types";

interface Props {
  status: FeaturedStatus;
  onEndNow: () => void;
  onRenew: () => void;
  onDelete: () => void;
}

export default function FeaturedRowActions({ status, onEndNow, onRenew, onDelete }: Props) {
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
        <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {status === "Active" && (
            <button className={`${item} text-amber-700`} onClick={run(onEndNow)}>End now</button>
          )}
          {status === "Expired" && (
            <button className={`${item} text-emerald-700`} onClick={run(onRenew)}>Renew for 30 days</button>
          )}
          <button className={`${item} text-red-600`} onClick={run(onDelete)}>Delete</button>
        </div>
      )}
    </div>
  );
}