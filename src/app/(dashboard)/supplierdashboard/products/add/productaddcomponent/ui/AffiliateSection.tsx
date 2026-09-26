"use client";

import { Card, Field, SelectBox, Toggle } from "./Primitives";
import { money } from "../utils";
import { WINDOWS } from "../types";
import type { Form } from "../types";

export default function AffiliateSection({
  form,
  set,
  price,
  affiliateAmount,
}: {
  form: Form;
  set: <K extends keyof Form>(key: K, value: Form[K]) => void;
  price: number;
  affiliateAmount: number;
}) {
  return (
    <Card title="Affiliate commission" description="Let affiliates promote this product and earn a commission on each sale.">
      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-[12px] font-medium text-slate-800">Enable affiliate commission for this product</p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Affiliates can generate trackable links and earn from every delivered order.
          </p>
        </div>
        <Toggle checked={form.affiliate} onChange={(v) => set("affiliate", v)} label="Enable affiliate commission" />
      </div>

      <div className={`mt-5 space-y-5 transition-opacity ${form.affiliate ? "" : "pointer-events-none opacity-50"}`}>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="commission" className="text-[12px] font-medium text-slate-800">
              Commission rate
            </label>
            <span className="text-[15px] font-semibold text-emerald-700">{form.commission}%</span>
          </div>
          <input
            id="commission"
            type="range"
            min={1}
            max={40}
            step={1}
            value={form.commission}
            onChange={(e) => set("commission", Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-emerald-600"
          />
          <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
            <span>1%</span>
            <span>Recommended 10–15%</span>
            <span>40%</span>
          </div>
        </div>

        <Field label="Affiliate attribution window" htmlFor="field-window" hint="How long an affiliate keeps credit after a customer clicks their link.">
          <SelectBox id="field-window" value={form.window} onChange={(v) => set("window", v)} options={WINDOWS} />
        </Field>

        <div className="grid grid-cols-3 gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
          <div>
            <p className="text-[10px] text-slate-500">Affiliate earns</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-900">{price > 0 ? money(affiliateAmount) : "—"}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Your payout</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-900">{price > 0 ? money(price - affiliateAmount) : "—"}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Attribution</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-900">{form.window}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}