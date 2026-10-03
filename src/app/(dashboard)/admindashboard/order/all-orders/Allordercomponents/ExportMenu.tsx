"use client";
import { useEffect, useRef, useState } from "react";
import { Printer, FileSpreadsheet, FileJson } from "lucide-react";
import { Order } from "./types";
import { downloadCSV, downloadJSON } from "./exportUtils";

export default function ExportMenu({ orders }: { orders: Order[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const run = (fn: () => void) => () => { fn(); setOpen(false); };
  const item =
    "flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:border-gray-900"
      >
        <Printer size={16} /> Export
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-30 w-56 rounded-lg border bg-white py-1 shadow-lg">
          <p className="px-4 py-2 text-xs text-gray-500">{orders.length} orders will be exported</p>
          <button className={item} disabled={!orders.length} onClick={run(() => downloadCSV(orders))}>
            <FileSpreadsheet size={16} /> Export as CSV
          </button>
          <button className={item} disabled={!orders.length} onClick={run(() => downloadJSON(orders))}>
            <FileJson size={16} /> Export as JSON
          </button>
          <button className={item} onClick={run(() => window.print())}>
            <Printer size={16} /> Print list
          </button>
        </div>
      )}
    </div>
  );
}