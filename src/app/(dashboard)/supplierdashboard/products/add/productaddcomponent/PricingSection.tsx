import { TrendingUp } from "lucide-react";
import Card from "./ui/Card";
import Field from "./ui/Field";
import { inputCls, money } from "./utils";
import type { Form } from "./types";

export default function PricingSection({
  form,
  set,
  errors,
  price,
  margin,
  earn,
}: {
  form: Form;
  set: <K extends keyof Form>(key: K, value: Form[K]) => void;
  errors: Record<string, string>;
  price: number;
  margin: number | null;
  earn: number;
}) {
  return (
    <Card title="Pricing" description="Set your selling price, costs and profit margin.">
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Price" required htmlFor="field-price" error={errors.price}>
          <input
            id="field-price"
            inputMode="decimal"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="0.00"
            className={inputCls(!!errors.price)}
          />
        </Field>
        <Field label="Compare-at price" htmlFor="field-compare" hint="Show as original price">
          <input
            id="field-compare"
            inputMode="decimal"
            value={form.comparePrice}
            onChange={(e) => set("comparePrice", e.target.value)}
            placeholder="0.00"
            className={inputCls()}
          />
        </Field>
        <Field label="Cost per item" htmlFor="field-cost" hint="Not shown to customers">
          <input
            id="field-cost"
            inputMode="decimal"
            value={form.cost}
            onChange={(e) => set("cost", e.target.value)}
            placeholder="0.00"
            className={inputCls()}
          />
        </Field>
      </div>

      <div className="mt-5 flex items-center gap-5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <TrendingUp className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] text-slate-500">Profit margin</p>
          <p className={`text-[13px] font-semibold ${margin !== null && margin < 0 ? "text-red-600" : "text-slate-900"}`}>
            {margin === null ? "—" : `${margin.toFixed(1)}%`}
          </p>
        </div>
        <span className="h-8 w-px bg-slate-200" />
        <div>
          <p className="text-[10px] text-slate-500">You earn per sale</p>
          <p className={`text-[13px] font-semibold ${price > 0 && earn < 0 ? "text-red-600" : "text-slate-900"}`}>
            {price > 0 ? money(earn) : "—"}
          </p>
        </div>
      </div>
    </Card>
  );
}