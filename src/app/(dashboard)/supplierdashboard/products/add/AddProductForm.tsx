"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Cloud } from "lucide-react";

import Navbar from "@/app/(dashboard)/supplierdashboard/components/Navbar";
import { fileToDataUrl, useProducts } from "@/app/(dashboard)/supplierdashboard/lib/products-store";

import {
  BasicInfoSection,
  PricingSection,
  InventorySection,
  VariantsSection,
  MediaSection,
  AffiliateSection,
  ShippingSection,
  PublishCard,
  CompletenessCard,
  LivePreviewCard,
  DRAFT_KEY,
  EMPTY,
  PRODUCTS_URL,
  MAX_IMAGES,
  type Form,
  type Variant,
} from "./productaddcomponent";
import { num, newVariant } from "./productaddcomponent/utils";

export default function AddProductForm() {
  const router = useRouter();
  const { addProduct, setNotice } = useProducts();

  const [form, setForm] = useState<Form>(() => {
    if (typeof window === "undefined") return EMPTY;

    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
    } catch {
      return EMPTY;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mediaError, setMediaError] = useState("");
  const [savedAt, setSavedAt] = useState("");

  const loaded = useRef(true);
  const dirty = useRef(false);
  const submitted = useRef(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    dirty.current = true;
    setForm((f) => ({ ...f, [key]: value }));
  };

  /* ---- Autosave: save the restored draft as the user types ---- */
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

  const addVariant = () => set("variants", [...form.variants, newVariant()]);
  const removeVariant = (id: string) => set("variants", form.variants.filter((v) => v.id !== id));

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
        ? `"${name}" is published and now in your product list.`
        : `"${name}" was saved as a draft.`
    );
    router.push(status === "Published" ? PRODUCTS_URL : `${PRODUCTS_URL}?status=Draft`);
  }

  /* ------------------------------ Render ------------------------------ */
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <div className="mx-auto max-w-350 p-6 lg:p-8">
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
            <BasicInfoSection form={form} set={set} errors={errors} />
            <PricingSection form={form} set={set} errors={errors} price={price} earn={earn} margin={margin} />
            <InventorySection form={form} set={set} totalStock={totalStock} />
            <VariantsSection
              form={form}
              toggleVariants={toggleVariants}
              updateVariant={updateVariant}
              addVariant={addVariant}
              removeVariant={removeVariant}
            />
            <MediaSection images={form.images} mediaError={mediaError} onAdd={addImages} onRemove={removeImage} />
            <AffiliateSection form={form} set={set} price={price} affiliateAmount={affiliateAmount} />
            <ShippingSection form={form} set={set} />
          </div>

          {/* ============================ RIGHT ============================ */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-0.5">
            <PublishCard form={form} set={set} onPublish={() => submit("Published")} onSaveDraft={() => submit("Draft")} />
            <CompletenessCard checklist={checklist} completeness={completeness} />
            <LivePreviewCard form={form} price={price} />
          </aside>
        </div>
      </div>
    </div>
  );
}