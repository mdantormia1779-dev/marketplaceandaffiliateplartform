"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RefundStatus } from "./types";

interface Props {
  status: RefundStatus;
  refundId: string;
  onStatus: (status: RefundStatus) => void;
}

export default function RefundRowActions({ status, refundId, onStatus }: Props) {
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
          {status === "Pending" && (
            <>
              <button className={`${item} text-emerald-700`} onClick={run(() => onStatus("Approved"))}>Approve</button>
              <button className={`${item} text-red-600`} onClick={run(() => onStatus("Rejected"))}>Reject</button>
            </>
          )}
          {status === "Approved" && (
            <button className={`${item} text-emerald-700`} onClick={run(() => onStatus("Refunded"))}>Mark as refunded</button>
          )}
          {status === "Rejected" && (
            <button className={`${item} text-amber-700`} onClick={run(() => onStatus("Pending"))}>Reopen request</button>
          )}
          <button className={item} onClick={run(() => navigator.clipboard?.writeText(refundId))}>Copy refund ID</button>
        </div>
      )}
    </div>
  );
}
