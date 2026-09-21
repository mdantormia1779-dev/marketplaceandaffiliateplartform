"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Cloud,
  ImageIcon,
  ImagePlus,
  Info,
  Plus,
  Save,
  Send,
  TrendingUp,
  X,
} from "lucide-react";
import TopBar from "@/app/(dashboard)/supplierdashboard/components/TopBar";
import {
  BRANDS,
  CATEGORIES,
  fileToDataUrl,
  useProducts,
} from "@/app/(dashboard)/supplierdashboard/lib/products-store";

/* --------------------------------- Types ---------------------------------- */

const PRODUCTS_URL = "/supplierdashboard/products";

type Variant = { id: string; name: string; price: string; stock: string };

type Form = {
  title: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  barcode: string;
  tags: string;
  price: string;
  comparePrice: string;
  cost: string;
  stock: string;
  lowStock: string;
  track: boolean;
  hasVariants: boolean;
  variants: Variant[];
  images: string[];
  affiliate: boolean;
  commission: number;
  window: string;
  weight: string;
  dimensions: string;
  shippingMethod: string;
  shippingFee: string;
  delivery: string;
  returnPolicy: string;
  status: "Draft" | "Published";
  visibility: string;
  featured: boolean;
};

const EMPTY: Form = {
  title: "",
  description: "",
  category: "",
  brand: "",
  sku: "",
  barcode: "",
  tags: "",
  price: "",
  comparePrice: "",
  cost: "",
  stock: "",
  lowStock: "5",
  track: true,
  hasVariants: false,
  variants: [],
  images: [],
  affiliate: true,
  commission: 10,
  window: "30 days",
  weight: "",
  dimensions: "",
  shippingMethod: "Standard shipping (5–7 days)",
  shippingFee: "",
  delivery: "",
  returnPolicy: "30-day returns",
  status: "Draft",
  visibility: "Public — visible in marketplace",
  featured: false,
};

const DRAFT_KEY = "shop.product-draft.v1";
const MAX_IMAGES = 6;
const MAX_DESCRIPTION = 500;

const VISIBILITY = ["Public — visible in marketplace", "Unlisted — only people with the link", "Private — only you"];
const WINDOWS = ["7 days", "14 days", "30 days", "60 days", "90 days"];
const SHIPPING_METHODS = ["Standard shipping (5–7 days)", "Express shipping (2–3 days)", "Free shipping", "Local pickup"];
const RETURN_POLICIES = ["No returns", "7-day returns", "14-day returns", "30-day returns"];

/* -------------------------------- Helpers -------------------------------- */

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};
const money = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(n).toFixed(2)}`;
const newVariant = (): Variant => ({
  id: `v-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  price: "",
  stock: "",
});

/* ------------------------------- Small UI -------------------------------- */

const inputCls = (error?: boolean) =>
  `h-10 w-full rounded-md border bg-white px-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
  }`;

function Card({
  title,
  description,
  right,
  children,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[14px] font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-[12px] text-slate-500">{description}</p>}
        </div>
        {right}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  htmlFor,
  aside,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  htmlFor?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-[12px] font-medium text-slate-800">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 text-[11px] text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-[11px] text-slate-400">{hint}</p>
      )}
    </div>
  );
}

function SelectBox({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls(error)} appearance-none pr-9 ${value === "" ? "text-slate-500" : ""}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
        checked ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct, setNotice } = useProducts();

  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mediaError, setMediaError] = useState("");
  const [savedAt, setSavedAt] = useState("");

  const loaded = useRef(false);
  const dirty = useRef(false);
  const submitted = useRef(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    dirty.current = true;
    setForm((f) => ({ ...f, [key]: value }));
  };

  /* ---- Autosave: restore an unfinished draft, then save as the user types ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setForm({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current || !dirty.current || submitted.current) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
        setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch {
        /* storage full: skip */
      }
    }, 600);
    return () => clearTimeout(t);
  }, [form]);

  /* --------------------------- Derived numbers --------------------------- */
  const price = num(form.price);
  const cost = num(form.cost);
  const affiliateAmount = form.affiliate ? (price * form.commission) / 100 : 0;
  const earn = price - cost - affiliateAmount;
  const margin = price > 0 ? (earn / price) * 100 : null;

  const totalStock = form.hasVariants
    ? form.variants.reduce((sum, v) => sum + Math.max(0, Math.floor(num(v.stock))), 0)
    : Math.max(0, Math.floor(num(form.stock)));

  const checklist = [
    { label: "Product title", done: form.title.trim().length > 0 },
    { label: "Description", done: form.description.trim().length > 0 },
    { label: "Category selected", done: form.category !== "" },
    { label: "Price set", done: price > 0 },
    { label: "Stock added", done: totalStock > 0 },
    { label: "At least 1 image", done: form.images.length > 0 },
  ];
  const completeness = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);

  /* ------------------------------ Media ------------------------------ */
  async function addImages(files: FileList | File[]) {
    setMediaError("");
    const room = MAX_IMAGES - form.images.length;
    const picked = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, room);
    if (picked.length === 0) return;
    try {
      const urls = await Promise.all(picked.map((f) => fileToDataUrl(f)));
      dirty.current = true;
      setForm((f) => ({ ...f, images: [...f.images, ...urls].slice(0, MAX_IMAGES) }));
    } catch {
      setMediaError("One of those files couldn't be read. Try a JPG or PNG.");
    }
  }

  const removeImage = (i: number) =>
    set(
      "images",
      form.images.filter((_, idx) => idx !== i)
    );

  /* ----------------------------- Variants ----------------------------- */
  function toggleVariants(on: boolean) {
    dirty.current = true;
    setForm((f) => ({
      ...f,
      hasVariants: on,
      variants: on && f.variants.length === 0 ? [newVariant()] : f.variants,
    }));
  }

  const updateVariant = (id: string, patch: Partial<Variant>) =>
    set(
      "variants",
      form.variants.map((v) => (v.id === id ? { ...v, ...patch } : v))
    );

  /* ----------------------------- Submit ----------------------------- */
  function validate(publishing: boolean) {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Add a product title.";
    if (publishing) {
      if (!form.description.trim()) e.description = "Add a description so shoppers know what they're buying.";
      if (!form.category) e.category = "Choose a category.";
      if (!(price > 0)) e.price = "Enter a price above 0.";
    }
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    return !first;
  }

  function submit(status: "Published" | "Draft") {
    if (!validate(status === "Published")) return;

    const name = form.title.trim();
    const skuBase = (form.brand || name).replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase() || "PRD";

    addProduct({
      name,
      description: form.description.trim(),
      sku: form.sku.trim() || `${skuBase}-${Math.floor(100 + Math.random() * 900)}`,
      brand: form.brand,
      variants: form.hasVariants ? form.variants.filter((v) => v.name.trim()).length || undefined : undefined,
      category: form.category || "Uncategorized",
      price,
      comparePrice: num(form.comparePrice) > 0 ? num(form.comparePrice) : undefined,
      cost: cost > 0 ? cost : undefined,
      stock: totalStock,
      commission: form.affiliate ? form.commission : 0,
      status,
      featured: form.featured,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: form.images[0],
    });

    submitted.current = true;
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }

    setNotice(
      status === "Published"
        ? `“${name}” is published and now in your product list.`
        : `“${name}” was saved as a draft.`
    );
    router.push(status === "Published" ? PRODUCTS_URL : `${PRODUCTS_URL}?status=Draft`);
  }

  /* ------------------------------ Render ------------------------------ */
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar title="Add Product" subtitle="Create a new listing for your store." />

      <div className="mx-auto max-w-[1400px] p-6 lg:p-8">
        {/* Page heading */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={PRODUCTS_URL}
              aria-label="Back to products"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-[11px] text-slate-400">
                <Link href={PRODUCTS_URL} className="hover:text-slate-600">
                  Products
                </Link>
                <span className="mx-1.5">/</span>
                <span className="text-blue-600">New product</span>
              </p>
              <h2 className="text-[17px] font-semibold text-slate-900">Create a new product</h2>
            </div>
          </div>

          <p className="hidden items-center gap-1.5 text-[11px] text-slate-400 sm:flex" aria-live="polite">
            <Cloud className="h-3.5 w-3.5" />
            {savedAt ? `Changes saved automatically · ${savedAt}` : "Changes saved automatically"}
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ============================ LEFT ============================ */}
          <div className="space-y-5">
            {/* Basic information */}
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
                      options={CATEGORIES}
                      placeholder="Select a category"
                      error={!!errors.category}
                    />
                  </Field>
                  <Field label="Brand" htmlFor="field-brand">
                    <SelectBox
                      id="field-brand"
                      value={form.brand}
                      onChange={(v) => set("brand", v)}
                      options={BRANDS}
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

            {/* Pricing */}
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

            {/* Inventory */}
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

            {/* Variants */}
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
                        onClick={() =>
                          set(
                            "variants",
                            form.variants.filter((x) => x.id !== v.id)
                          )
                        }
                        aria-label="Remove variant"
                        className="flex h-10 w-8 items-center justify-center text-slate-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => set("variants", [...form.variants, newVariant()])}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add variant
                  </button>
                </div>
              )}
            </Card>

            {/* Media */}
            <Card title="Media" description={`Add up to ${MAX_IMAGES} images. The first image becomes your main product photo.`}>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,220px))] gap-4">
                {form.images.map((src, i) => (
                  <div
                    key={src.slice(-32) + i}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Product image ${i + 1}`} className="h-full w-full object-cover" />
                    {i === 0 && (
                      <span className="absolute left-2 top-2 rounded bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        Main
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow transition hover:text-red-600 focus:opacity-100 group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {form.images.length < MAX_IMAGES && (
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      addImages(e.dataTransfer.files);
                    }}
                    className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/40 focus-within:ring-2 focus-within:ring-blue-200"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                      <ImagePlus className="h-4 w-4" />
                    </span>
                    <span className="text-[11px]">Add image</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files) addImages(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                )}
              </div>
              {mediaError && <p className="mt-3 text-[11px] text-red-600">{mediaError}</p>}
              <p className="mt-4 text-[11px] text-slate-400">
                Recommended: square JPG or PNG, at least 1000×1000px. {form.images.length}/{MAX_IMAGES} added.
              </p>
            </Card>

            {/* Affiliate commission */}
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

            {/* Shipping & returns */}
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
          </div>

          {/* ============================ RIGHT ============================ */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-0.5">
            {/* Publish */}
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
                  onClick={() => submit("Published")}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  Publish product
                </button>
                <button
                  type="button"
                  onClick={() => submit("Draft")}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save as draft
                </button>
              </div>
            </section>

            {/* Completeness */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-slate-900">Completeness</h3>
                <span className="text-[12px] font-semibold text-blue-600">{completeness}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={completeness}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"
              >
                <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${completeness}%` }} />
              </div>
              <ul className="mt-5 space-y-3">
                {checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-2.5 text-[12px]">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        c.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 text-transparent"
                      }`}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className={c.done ? "text-slate-800" : "text-slate-400"}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Live preview */}
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
          </aside>
        </div>
      </div>
    </div>
  );
}