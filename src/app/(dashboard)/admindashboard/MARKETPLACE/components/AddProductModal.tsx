"use client";
import { FormEvent, useState } from "react";
import { Product } from "./types";

type NewProduct = Omit<Product, "id" | "status" | "submitted">;
const EMPTY = { name: "", sku: "", category: "", supplier: "", price: "", stock: "" };

export default function AddProductModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: NewProduct) => void }) {
  const [f, setF] = useState(EMPTY);
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onAdd({ ...f, price: Number(f.price), stock: Number(f.stock) });
    onClose();
  };

  const input = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Add product</h2>
        <input required className={input} placeholder="Product name" value={f.name} onChange={set("name")} />
        <div className="grid grid-cols-2 gap-3">
          <input required className={input} placeholder="SKU" value={f.sku} onChange={set("sku")} />
          <input required className={input} placeholder="Category" value={f.category} onChange={set("category")} />
        </div>
        <input required className={input} placeholder="Supplier" value={f.supplier} onChange={set("supplier")} />
        <div className="grid grid-cols-2 gap-3">
          <input required type="number" min="0" step="0.01" className={input} placeholder="Price" value={f.price} onChange={set("price")} />
          <input required type="number" min="0" className={input} placeholder="Stock" value={f.stock} onChange={set("stock")} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm">Cancel</button>
          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Add product</button>
        </div>
      </form>
    </div>
  );
}