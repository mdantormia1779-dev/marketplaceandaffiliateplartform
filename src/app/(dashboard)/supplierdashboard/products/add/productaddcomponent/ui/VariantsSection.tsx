"use client";

import { Info, Plus, X } from "lucide-react";
import { Card, Toggle, inputCls } from "./Primitives";
import type { Form, Variant } from "../types";

export default function VariantsSection({
  form,
  toggleVariants,
  updateVariant,
  addVariant,
  removeVariant,
}: {
  form: Form;
  toggleVariants: (on: boolean) => void;
  updateVariant: (id: string, patch: Partial<Variant>) => void;
  addVariant: () => void;
  removeVariant: (id: string) => void;
}) {
  return (
    <Card
      title="Variants"
      description="Offer sizes, colors or bundles with their own price and stock."
      right={
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium text-slate-800">
            {form.hasVariants ? "Has variants" : "Single option"}
          </span>
          <Toggle checked={form.hasVariants} onChange={toggleVariants} label="Enable variants" />
        </div>
      }
    >
      {!form.hasVariants ? (
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-[12px] text-slate-600">
          <Info className="h-4 w-4 shrink-0 text-slate-400" />
          This product is sold as a single option. Turn on variants to add size, color or bundle
          choices with their own pricing and inventory.
        </div>
      ) : (
        <div className="space-y-3">
          <div className="hidden grid-cols-[1fr_120px_120px_32px] gap-3 text-[11px] font-medium text-slate-500 sm:grid">
            <span>Variant name</span>
            <span>Price</span>
            <span>Stock</span>
            <span />
          </div>
          {form.variants.map((v) => (
            <div key={v.id} className="grid gap-3 sm:grid-cols-[1fr_120px_120px_32px]">
              <input
                value={v.name}
                onChange={(e) => updateVariant(v.id, { name: e.target.value })}
                placeholder="e.g. Black / Large"
                aria-label="Variant name"
                className={inputCls()}
              />
              <input
                inputMode="decimal"
                value={v.price}
                onChange={(e) => updateVariant(v.id, { price: e.target.value })}
                placeholder={form.price || "0.00"}
                aria-label="Variant price"
                className={inputCls()}
              />
              <input
                inputMode="numeric"
                value={v.stock}
                onChange={(e) => updateVariant(v.id, { stock: e.target.value.replace(/[^\d]/g, "") })}
                placeholder="0"
                aria-label="Variant stock"
                className={inputCls()}
              />
              <button
                type="button"
                onClick={() => removeVariant(v.id)}
                aria-label="Remove variant"
                className="flex h-10 w-8 items-center justify-center text-slate-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add variant
          </button>
        </div>
      )}
    </Card>
  );
}