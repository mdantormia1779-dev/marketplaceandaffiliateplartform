"use client";
import { FormEvent, useState } from "react";
import { PLACEMENTS, TODAY } from "./data";
import { addDays } from "./status";
import { Featured, Placement } from "./types";

interface Props {
  onClose: () => void;
  onAdd: (data: Omit<Featured, "id">) => string | null;
}

const input = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500";

export default function FeatureProductModal({ onClose, onAdd }: Props) {
  const [product, setProduct] = useState("");
  const [supplier, setSupplier] = useState("");
  const [placement, setPlacement] = useState<Placement>("Home Hero");
  const [start, setStart] = useState(TODAY);
  const [end, setEnd] = useState(addDays(TODAY, 30));
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = onAdd({ product, supplier, placement, start, end });
    if (err) setError(err);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Feature a product</h2>
        <input autoFocus required className={input} placeholder="Product name" value={product} onChange={(e) => setProduct(e.target.value)} />
        <input required className={input} placeholder="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
        <select className={input} value={placement} onChange={(e) => setPlacement(e.target.value as Placement)}>
          {PLACEMENTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-gray-600">
            Start date
            <input required type="date" className={`${input} mt-1`} value={start} onChange={(e) => { setStart(e.target.value); setError(null); }} />
          </label>
          <label className="text-xs text-gray-600">
            End date
            <input required type="date" className={`${input} mt-1`} value={end} onChange={(e) => { setEnd(e.target.value); setError(null); }} />
          </label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm">Cancel</button>
          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            Feature product
          </button>
        </div>
      </form>
    </div>
  );
}