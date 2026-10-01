"use client";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ReviewStatus } from "./types";

interface Props {
  status: ReviewStatus;
  onStatus: (status: ReviewStatus) => void;
  onDelete: () => void;
}

export default function ReviewRowActions({ status, onStatus, onDelete }: Props) {
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
        <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {status !== "Approved" && (
            <button className={`${item} text-emerald-700`} onClick={run(() => onStatus("Approved"))}>
              {status === "Hidden" ? "Restore" : "Approve"}
            </button>
          )}
          {status !== "Hidden" && (
            <button className={`${item} text-amber-700`} onClick={run(() => onStatus("Hidden"))}>Hide</button>
          )}
          <button className={`${item} text-red-600`} onClick={run(onDelete)}>Delete</button>
        </div>
      )}
    </div>
  );
}