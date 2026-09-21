"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Eye,
  Glasses,
  Headphones,
  Headset,
  Lamp,
  MoreVertical,
  Package,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  TrendingUp,
  Utensils,
  Watch,
  X,
  type LucideIcon,
} from "lucide-react";
import TopBar from "@/app/(dashboard)/supplierdashboard/components/TopBar";
import {
  CATEGORIES,
  useProducts,
  type Product,
} from "@/app/(dashboard)/supplierdashboard/lib/products-store";

/* -------------------------------- Constants ------------------------------- */

const ADD_PRODUCT_URL = "/supplierdashboard/products/add";

const ICONS: Record<string, LucideIcon> = {
  headphones: Headphones,
  watch: Watch,
  bag: ShoppingBag,
  lamp: Lamp,
  headset: Headset,
  utensils: Utensils,
  glasses: Glasses,
  droplet: Droplet,
};

const CATEGORY_OPTIONS = ["All categories", ...CATEGORIES];
const STATUSES = ["Published", "Draft", "All statuses"];
const SORTS = [
  "Recently updated",
  "Best selling",
  "Price: low to high",
  "Price: high to low",
  "Stock: low to high",
];

const PAGE_SIZE = 10;
const LOW_STOCK_AT = 10;

/* -------------------------------- Helpers -------------------------------- */

const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

const formatDate = (iso: string) =>
  new Date(iso.length === 10 ? iso + "T00:00:00" : iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/* ------------------------------- Small UI -------------------------------- */

function Select({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-9 text-[13px] text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function StockBadge({ stock }: { stock: number }) {
  const low = stock <= LOW_STOCK_AT;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        low ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${low ? "bg-amber-500" : "bg-emerald-500"}`} />
      {stock} in stock
    </span>
  );
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const published = status === "Published";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${published ? "bg-emerald-500" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}

function Thumb({ p }: { p: Product }) {
  if (p.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={p.image}
        alt=""
        className="h-[34px] w-[34px] shrink-0 rounded-md border border-slate-200 object-cover"
      />
    );
  }
  const Icon = (p.iconKey && ICONS[p.iconKey]) || Package;
  return (
    <div
      className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md ${
        p.tint ?? "bg-slate-100 text-slate-500"
      }`}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

/* --------------------------------- Page ---------------------------------- */

function ProductsView() {
  const { products, notice, setNotice } = useProducts();
  const params = useSearchParams();
  const initialStatus = params.get("status");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(
    initialStatus && STATUSES.includes(initialStatus) ? initialStatus : "Published"
  );
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Recently updated");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // "Product published" banner 6 second por nijei chole jabe
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(t);
  }, [notice, setNotice]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      const matchStatus = status === "All statuses" || p.status === status;
      const matchCat = category === "All categories" || p.category === category;
      return matchQ && matchStatus && matchCat;
    });

    const sorted = [...list];
    switch (sort) {
      case "Best selling":
        sorted.sort((a, b) => b.sold - a.sold);
        break;
      case "Price: low to high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price: high to low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Stock: low to high":
        sorted.sort((a, b) => a.stock - b.stock);
        break;
      default:
        sorted.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
    }
    return sorted;
  }, [products, query, status, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id));
  const toggleAll = () =>
    setSelected(
      allSelected
        ? selected.filter((id) => !rows.some((r) => r.id === id))
        : [...new Set([...selected, ...rows.map((r) => r.id)])]
    );
  const toggleOne = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const resetPage =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setPage(1);
    };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar title="All Products" subtitle="Manage your catalog, pricing and publishing status." />

      <main className="space-y-4 p-6 lg:p-10">
        {notice && (
          <div
            role="status"
            className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {notice}
            </span>
            <button
              onClick={() => setNotice(null)}
              aria-label="Dismiss"
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ---------------------------- Filter card ---------------------------- */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-[240px]">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => resetPage(setQuery)(e.target.value)}
                placeholder="Search by name or SKU…"
                className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <Select value={status} onChange={resetPage(setStatus)} options={STATUSES} className="w-[140px]" />
            <Select value={category} onChange={resetPage(setCategory)} options={CATEGORY_OPTIONS} className="w-[150px]" />

            <div className="ml-auto flex items-center gap-3">
              <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>
              <Link
                href={ADD_PRODUCT_URL}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-600 px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Product
              </Link>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] text-slate-500">
            {filtered.length} product{filtered.length === 1 ? "" : "s"} match your view
          </p>

          <div className="relative mt-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </section>

        {/* ----------------------------- Table card ---------------------------- */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="w-12 py-4 pl-4">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all"
                      className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    />
                  </th>
                  <th className="py-4 pr-4">Product</th>
                  <th className="py-4 pr-4">Category</th>
                  <th className="py-4 pr-4">Price</th>
                  <th className="py-4 pr-4">Stock</th>
                  <th className="py-4 pr-4">Sold</th>
                  <th className="py-4 pr-4">Commission</th>
                  <th className="py-4 pr-4">Status</th>
                  <th className="py-4 pr-4">Updated</th>
                  <th className="w-24 py-4 pr-4" />
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-[13px] text-slate-500">
                      No products match these filters. Try clearing the search or changing the status.
                    </td>
                  </tr>
                )}

                {rows.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/60"
                  >
                    <td className="py-3 pl-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleOne(p.id)}
                        aria-label={`Select ${p.name}`}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                      />
                    </td>

                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Thumb p={p} />
                        <div className="min-w-0">
                          <p className="max-w-[230px] truncate text-[12px] font-semibold text-slate-900">
                            {p.name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {p.sku}
                            {p.brand && (
                              <>
                                <span className="mx-1.5 text-slate-300">|</span>
                                {p.brand}
                              </>
                            )}
                            {!!p.variants && (
                              <>
                                <span className="mx-1.5 text-slate-300">|</span>
                                {p.variants} variants
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 pr-4">
                      <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3 pr-4 text-[12px]">
                      <span className="font-semibold text-slate-900">{money(p.price)}</span>
                      {p.comparePrice ? (
                        <span className="ml-1.5 text-[10px] text-slate-400 line-through">
                          {money(p.comparePrice)}
                        </span>
                      ) : null}
                    </td>

                    <td className="py-3 pr-4">
                      <StockBadge stock={p.stock} />
                    </td>

                    <td className="py-3 pr-4 text-[12px]">
                      <span className="font-medium text-slate-900">{p.sold}</span>
                      <span className="ml-1 text-[10px] text-slate-400">sold</span>
                    </td>

                    <td className="py-3 pr-4">
                      {p.commission > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
                          <TrendingUp className="h-3 w-3" />
                          {p.commission}%
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Off</span>
                      )}
                    </td>

                    <td className="py-3 pr-4">
                      <StatusBadge status={p.status} />
                    </td>

                    <td className="py-3 pr-4 text-[11px] text-slate-500">{formatDate(p.updated)}</td>

                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-3 text-slate-400">
                        <button className="hover:text-slate-700" aria-label={`View ${p.name}`}>
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="hover:text-slate-700" aria-label={`More actions for ${p.name}`}>
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-[11px]">
            <span className="text-slate-500">
              Viewing {rows.length} of {filtered.length} products
            </span>
            <Link
              href={ADD_PRODUCT_URL}
              className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-3 w-3" />
              Add new product
            </Link>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <p className="text-[11px] text-blue-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filtered.length === 0 ? 0 : start + 1}-{start + rows.length}
              </span>{" "}
              of <span className="font-semibold text-slate-900">{filtered.length}</span>
            </p>

            <nav className="flex items-center gap-2" aria-label="Pagination">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 px-3 text-[11px] text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-3 w-3" />
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={`h-8 w-8 rounded-md text-[11px] font-semibold transition ${
                    n === currentPage
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 px-3 text-[11px] text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-3 w-3" />
              </button>
            </nav>
          </div>
        </section>
      </main>
    </div>
  );
}

// useSearchParams ke Suspense er bhitore rakhte hoy (Next.js App Router)
export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsView />
    </Suspense>
  );
}