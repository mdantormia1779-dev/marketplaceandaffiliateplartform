"use client";
import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Eye, Truck, Printer, RotateCcw, XCircle } from "lucide-react";
import { Order } from "./types";

interface Props {
  order: Order;
  onView: () => void;
  onShip: () => void;
  onPrint: () => void;
  onRefund: () => void;
  onCancel: () => void;
}

const MENU_H = 215;

export default function ActionMenu({ order, onView, onShip, onPrint, onRefund, onCancel }: Props) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const open = pos !== null;

  useEffect(() => {
    if (!open) return;
    const close = () => setPos(null);
    const outside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", outside);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", outside);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (open) return setPos(null);
    const r = e.currentTarget.getBoundingClientRect();
    // niche jayga na thakle upore khulbe
    const top = r.bottom + MENU_H > window.innerHeight ? r.top - MENU_H - 4 : r.bottom + 4;
    setPos({ top, right: window.innerWidth - r.right });
  };

  const canShip = order.status === "Pending" || order.status === "Processing";
  const canRefund = order.payment === "Paid";
  const canCancel = canShip;

  const run = (fn: () => void) => () => { fn(); setPos(null); };
  const item =
    "flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div ref={ref}>
      <button onClick={toggle} className="rounded p-1 hover:bg-gray-100">
        <MoreHorizontal size={18} />
      </button>
      {pos && (
        <div
          style={{ top: pos.top, right: pos.right }}
          className="fixed z-50 w-48 rounded-lg border bg-white py-1 shadow-lg"
        >
          <button className={item} onClick={run(onView)}><Eye size={16} /> View details</button>
          <button className={item} disabled={!canShip} onClick={run(onShip)}><Truck size={16} /> Mark as shipped</button>
          <button className={item} onClick={run(onPrint)}><Printer size={16} /> Print invoice</button>
          <button className={item} disabled={!canRefund} onClick={run(onRefund)}><RotateCcw size={16} /> Issue refund</button>
          <button className={`${item} text-orange-600`} disabled={!canCancel} onClick={run(onCancel)}>
            <XCircle size={16} /> Cancel order
          </button>
        </div>
      )}
    </div>
  );
}