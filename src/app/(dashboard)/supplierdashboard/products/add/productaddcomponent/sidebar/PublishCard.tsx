"use client";

import { Save, Send } from "lucide-react";
import { SelectBox, Field, Toggle } from "../ui/Primitives";
import { VISIBILITY, type Form } from "../types";

export default function PublishCard({
  form,
  set,
  onPublish,
  onSaveDraft,
}: {
  form: Form;
  set: <K extends keyof Form>(key: K, value: Form[K]) => void;
  onPublish: () => void;
  onSaveDraft: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-900">Publish</h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
            form.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {form.status}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <Field label="Product status" htmlFor="field-status" hint="Publishing sends the product for a quick quality review.">
          <SelectBox id="field-status" value={form.status} onChange={(v) => set("status", v as Form["status"])} options={["Draft", "Published"]} />
        </Field>
        <Field label="Visibility" htmlFor="field-visibility">
          <SelectBox id="field-visibility" value={form.visibility} onChange={(v) => set("visibility", v)} options={VISIBILITY} />
        </Field>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-[12px] font-medium text-slate-800">Feature this product</p>
          <p className="mt-0.5 text-[11px] text-slate-400">Pin to the top of your storefront and homepage.</p>
        </div>
        <Toggle checked={form.featured} onChange={(v) => set("featured", v)} label="Feature this product" />
      </div>

      <div className="mt-5 space-y-2.5">
        <button
          type="button"
          onClick={onPublish}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Send className="h-3.5 w-3.5" />
          Publish product
        </button>
        <button
          type="button"
          onClick={onSaveDraft}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Save className="h-3.5 w-3.5" />
          Save as draft
        </button>
      </div>
    </section>
  );
}