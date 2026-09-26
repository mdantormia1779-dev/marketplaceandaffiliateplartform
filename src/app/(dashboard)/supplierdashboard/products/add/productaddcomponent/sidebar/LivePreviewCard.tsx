"use client";

import { ImageIcon, TrendingUp } from "lucide-react";
import { num } from "../utils";
import type { Form } from "../types";

export default function LivePreviewCard({ form, price }: { form: Form; price: number }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-[14px] font-semibold text-slate-900">Live preview</h3>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-slate-400">
          {form.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.images[0]} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-slate-900">{form.title.trim() || "Product title"}</p>
          <p className="text-[10px] text-slate-400">{form.category || "No category yet"}</p>
          <p className="mt-0.5 text-[13px] font-semibold text-slate-900">
            ${price.toFixed(2)}
            {num(form.comparePrice) > price && price > 0 && (
              <span className="ml-1.5 text-[10px] font-normal text-slate-400 line-through">
                ${num(form.comparePrice).toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </div>
      {form.affiliate && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800">
          <TrendingUp className="h-3.5 w-3.5" />
          Affiliates earn {form.commission}% on this product
        </div>
      )}
    </section>
  );
}