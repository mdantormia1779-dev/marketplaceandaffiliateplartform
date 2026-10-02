"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Supplier } from "../types";
import StatusBadge from "./StatusBadge";

interface SupplierDrawerProps {
  supplier: Supplier | null; // null hole drawer bondho
  onClose: () => void;
}

export default function SupplierDrawer({ supplier, onClose }: SupplierDrawerProps) {
  useEffect(() => {
    if (!supplier) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [supplier, onClose]);

  if (!supplier) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 print:hidden" onClick={onClose}>
      <aside
        className="h-full w-full max-w-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{supplier.store}</h2>
            <p className="text-sm text-gray-500">{supplier.owner}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <dl className="px-6">
          <Row label="Store">{supplier.store}</Row>
          <Row label="Owner">{supplier.owner}</Row>
          <Row label="Email">{supplier.email}</Row>
          <Row label="Products">{supplier.products}</Row>
          <Row label="Revenue">${supplier.revenue.toLocaleString()}</Row>
          <Row label="Rating">{supplier.rating > 0 ? supplier.rating.toFixed(1) : "—"}</Row>
          <Row label="Status"><StatusBadge status={supplier.status} /></Row>
          <Row label="Joined">{supplier.joined}</Row>
        </dl>
      </aside>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-0">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{children}</dd>
    </div>
  );
}