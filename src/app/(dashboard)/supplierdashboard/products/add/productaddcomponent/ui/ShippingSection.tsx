"use client";

import { Card, Field, SelectBox, inputCls } from "./Primitives";
import { SHIPPING_METHODS, RETURN_POLICIES } from "../types";
import type { Form } from "../types";

export default function ShippingSection({
  form,
  set,
}: {
  form: Form;
  set: <K extends keyof Form>(key: K, value: Form[K]) => void;
}) {
  return (
    <Card title="Shipping & returns" description="Set physical details, delivery options and your return policy.">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Weight" htmlFor="field-weight" hint="Measured in kilograms (kg)">
            <input id="field-weight" inputMode="decimal" value={form.weight} onChange={(e) => set("weight", e.target.value)} placeholder="0.5" className={inputCls()} />
          </Field>
          <Field label="Dimensions (L × W × H)" htmlFor="field-dimensions" hint="Measured in centimeters (cm)">
            <input id="field-dimensions" value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} placeholder="30 × 20 × 10" className={inputCls()} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Shipping method" htmlFor="field-method">
            <SelectBox id="field-method" value={form.shippingMethod} onChange={(v) => set("shippingMethod", v)} options={SHIPPING_METHODS} />
          </Field>
          <Field label="Shipping fee" htmlFor="field-fee" hint="Leave 0.00 for free shipping">
            <input id="field-fee" inputMode="decimal" value={form.shippingFee} onChange={(e) => set("shippingFee", e.target.value)} placeholder="0.00" className={inputCls()} />
          </Field>
        </div>

        <Field label="Delivery estimate" htmlFor="field-delivery">
          <input id="field-delivery" value={form.delivery} onChange={(e) => set("delivery", e.target.value)} placeholder="e.g. Arrives in 3–5 business days" className={inputCls()} />
        </Field>

        <Field label="Return policy" htmlFor="field-returns">
          <SelectBox id="field-returns" value={form.returnPolicy} onChange={(v) => set("returnPolicy", v)} options={RETURN_POLICIES} />
        </Field>
      </div>
    </Card>
  );
}