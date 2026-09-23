"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "./types";

type Props = {
  open: boolean;
  products: Product[];
  onClose: () => void;
  onSubmit: (id: string, qty: number) => void;
};

export default function AddStockModal({ open, products, onClose, onSubmit }: Props) {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    const quantity = Number(qty);
    if (!productId || !quantity || quantity <= 0) return;
    onSubmit(productId, quantity);
    setProductId("");
    setQty("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Add stock</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Product</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku}) — {p.onHand} on hand
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Quantity to add
            </label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="e.g. 50"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add stock
          </button>
        </div>
      </div>
    </div>
  );
}