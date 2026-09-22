import Card from "./ui/Card";
import Field from "./ui/Field";
import Toggle from "./ui/Toggle";
import { inputCls } from "./utils";
import type { Form } from "./types";

export default function InventorySection({
  form,
  set,
  totalStock,
}: {
  form: Form;
  set: <K extends keyof Form>(key: K, value: Form[K]) => void;
  totalStock: number;
}) {
  return (
    <Card title="Inventory" description="Track how many units you have and get warned before you run out.">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Stock quantity"
          htmlFor="field-stock"
          hint={form.hasVariants ? "Stock is the total of your variants." : undefined}
        >
          <input
            id="field-stock"
            inputMode="numeric"
            disabled={form.hasVariants}
            value={form.hasVariants ? String(totalStock) : form.stock}
            onChange={(e) => set("stock", e.target.value.replace(/[^\d]/g, ""))}
            placeholder="0"
            className={inputCls()}
          />
        </Field>
        <Field label="Low stock alert" htmlFor="field-low" hint="We'll notify you at this level">
          <input
            id="field-low"
            inputMode="numeric"
            value={form.lowStock}
            onChange={(e) => set("lowStock", e.target.value.replace(/[^\d]/g, ""))}
            className={inputCls()}
          />
        </Field>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-[12px] font-medium text-slate-800">Track inventory for this product</p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Automatically reduce stock as orders come in and pause sales at zero.
          </p>
        </div>
        <Toggle checked={form.track} onChange={(v) => set("track", v)} label="Track inventory" />
      </div>
    </Card>
  );
}