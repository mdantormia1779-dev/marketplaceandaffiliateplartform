import type { DiscountType } from "./data";
import type { CouponFormState } from "./couponForm";

interface CouponFormFieldsProps {
  form: CouponFormState;
  onFieldChange: <K extends keyof CouponFormState>(key: K, value: CouponFormState[K]) => void;
}

const TYPE_OPTIONS: Array<{ value: DiscountType; label: string }> = [
  { value: "percent", label: "Percentage off" },
  { value: "fixed", label: "Fixed amount off" },
  { value: "shipping", label: "Free shipping" },
];

export default function CouponFormFields({ form, onFieldChange }: CouponFormFieldsProps) {
  return (
    <div className="mt-5 max-h-[65vh] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600">Coupon code</label>
          <input
            value={form.code}
            onChange={(e) => onFieldChange("code", e.target.value.toUpperCase())}
            placeholder="e.g. WELCOME20"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600">Discount type</label>
          <select
            value={form.type}
            onChange={(e) => onFieldChange("type", e.target.value as DiscountType)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-slate-600">Coupon name</label>
        <input
          value={form.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          placeholder="e.g. Welcome Offer — 20% Off"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {form.type !== "shipping" && (
          <div>
            <label className="text-xs font-medium text-slate-600">
              {form.type === "percent" ? "Percent off" : "Amount off ($)"}
            </label>
            <input
              type="number"
              min={0}
              value={form.value}
              onChange={(e) => onFieldChange("value", e.target.value)}
              placeholder={form.type === "percent" ? "20" : "10"}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        )}
        <div className={form.type === "shipping" ? "col-span-2" : ""}>
          <label className="text-xs font-medium text-slate-600">Applies to</label>
          <input
            value={form.appliesTo}
            onChange={(e) => onFieldChange("appliesTo", e.target.value)}
            placeholder="All products, or a category"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600">Max uses (optional)</label>
          <input
            type="number"
            min={0}
            value={form.maxUses}
            onChange={(e) => onFieldChange("maxUses", e.target.value)}
            placeholder="Leave blank for unlimited"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600">Uses per customer</label>
          <input
            type="number"
            min={1}
            value={form.perCustomer}
            onChange={(e) => onFieldChange("perCustomer", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600">Start date</label>
          <input
            type="date"
            value={form.startsAt}
            onChange={(e) => onFieldChange("startsAt", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600">End date</label>
          <input
            type="date"
            value={form.endsAt}
            onChange={(e) => onFieldChange("endsAt", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.stackable}
          onChange={(e) => onFieldChange("stackable", e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        Stackable with other discounts
      </label>
    </div>
  );
}