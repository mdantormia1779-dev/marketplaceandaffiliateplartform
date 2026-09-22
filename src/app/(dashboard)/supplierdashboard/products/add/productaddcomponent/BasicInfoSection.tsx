import Card from "./ui/Card";
import Field from "./ui/Field";
import SelectBox from "./ui/SelectBox";
import { inputCls } from "./utils";
import { MAX_DESCRIPTION } from "./types";
import type { Form } from "./types";

export default function BasicInfoSection({
  form,
  set,
  errors,
  categories,
  brands,
}: {
  form: Form;
  set: <K extends keyof Form>(key: K, value: Form[K]) => void;
  errors: Record<string, string>;
  categories: readonly string[];
  brands: readonly string[];
}) {
  return (
    <Card title="Basic information" description="The essentials customers see first — name, description and category.">
      <div className="space-y-5">
        <Field
          label="Product title"
          required
          htmlFor="field-title"
          error={errors.title}
          hint="Use a clear, descriptive name that matches what shoppers search for."
        >
          <input
            id="field-title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Aurora Noise-Cancelling Headphones"
            className={inputCls(!!errors.title)}
          />
        </Field>

        <Field
          label="Description"
          required
          htmlFor="field-description"
          error={errors.description}
          aside={
            <span className="text-[11px] text-slate-400">
              {form.description.length}/{MAX_DESCRIPTION}
            </span>
          }
        >
          <textarea
            id="field-description"
            value={form.description}
            maxLength={MAX_DESCRIPTION}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the materials, features and what makes this product special…"
            rows={5}
            className={`min-h-[110px] w-full resize-y rounded-md border bg-white px-3 py-2.5 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.description
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" required htmlFor="field-category" error={errors.category}>
            <SelectBox
              id="field-category"
              value={form.category}
              onChange={(v) => set("category", v)}
              options={categories}
              placeholder="Select a category"
              error={!!errors.category}
            />
          </Field>
          <Field label="Brand" htmlFor="field-brand">
            <SelectBox
              id="field-brand"
              value={form.brand}
              onChange={(v) => set("brand", v)}
              options={brands}
              placeholder="Select a brand"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="SKU" htmlFor="field-sku" hint="Unique code used to track this product in your inventory.">
            <input
              id="field-sku"
              value={form.sku}
              onChange={(e) => set("sku", e.target.value)}
              placeholder="AUR-HP-001"
              className={inputCls()}
            />
          </Field>
          <Field label="Barcode (ISBN, UPC)" htmlFor="field-barcode">
            <input
              id="field-barcode"
              value={form.barcode}
              onChange={(e) => set("barcode", e.target.value)}
              placeholder="Enter barcode if you have one"
              className={inputCls()}
            />
          </Field>
        </div>

        <Field
          label="Tags"
          htmlFor="field-tags"
          hint="Separate tags with commas. Tags help customers discover your product."
        >
          <input
            id="field-tags"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="headphones, audio, wireless"
            className={inputCls()}
          />
        </Field>
      </div>
    </Card>
  );
}