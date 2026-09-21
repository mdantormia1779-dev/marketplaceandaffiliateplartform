"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
  Layers,
  MessageSquare,
  Minus,
  MoreVertical,
  PackageCheck,
  Plus,
  Search,
  SlidersHorizontal,
  Truck,
  Warehouse,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type StockStatus = "in" | "low" | "out" | "over";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  incoming: number;
  alertAt: number;
  capacity: number;
  velocity: number; // units sold per week
  unitCost: number;
  restockedAt: string; // ISO date
  coverDays: number | null; // days of stock left, null when out
  suggested: number; // suggested restock quantity, 0 = none
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aria Portable Bluetooth Speaker",
    sku: "ARI-BS-016",
    category: "Electronics",
    warehouse: "Dhaka Main DC",
    onHand: 0,
    reserved: 0,
    incoming: 60,
    alertAt: 20,
    capacity: 60,
    velocity: 6,
    unitCost: 72,
    restockedAt: "2026-08-22",
    coverDays: null,
    suggested: 0,
  },
  {
    id: "p2",
    name: "Halo Smart Bulb Starter Pack",
    sku: "HAL-SB-023",
    category: "Electronics",
    warehouse: "Dhaka Main DC",
    onHand: 0,
    reserved: 0,
    incoming: 0,
    alertAt: 25,
    capacity: 80,
    velocity: 18,
    unitCost: 14,
    restockedAt: "2026-08-18",
    coverDays: null,
    suggested: 50,
  },
  {
    id: "p3",
    name: "Aurora Wireless Charging Pad",
    sku: "AUR-WC-008",
    category: "Electronics",
    warehouse: "Dhaka Main DC",
    onHand: 4,
    reserved: 1,
    incoming: 0,
    alertAt: 18,
    capacity: 40,
    velocity: 14,
    unitCost: 21,
    restockedAt: "2026-08-28",
    coverDays: 0.2,
    suggested: 35,
  },
  {
    id: "p4",
    name: "Lumen Minimal Desk Lamp",
    sku: "LUM-DL-021",
    category: "Home & Living",
    warehouse: "Chattogram Hub",
    onHand: 6,
    reserved: 2,
    incoming: 24,
    alertAt: 15,
    capacity: 40,
    velocity: 17,
    unitCost: 55,
    restockedAt: "2026-09-08",
    coverDays: 0.2,
    suggested: 0,
  },
  {
    id: "p5",
    name: "Vega Insulated Sport Bottle",
    sku: "VEG-BT-031",
    category: "Sports",
    warehouse: "Khulna Depot",
    onHand: 9,
    reserved: 1,
    incoming: 30,
    alertAt: 20,
    capacity: 60,
    velocity: 16,
    unitCost: 8,
    restockedAt: "2026-09-06",
    coverDays: 0.5,
    suggested: 5,
  },
  {
    id: "p6",
    name: "Drift Ergonomic Office Chair",
    sku: "DRF-OC-004",
    category: "Home & Living",
    warehouse: "Sylhet Fulfilment",
    onHand: 12,
    reserved: 3,
    incoming: 0,
    alertAt: 6,
    capacity: 30,
    velocity: 4,
    unitCost: 250,
    restockedAt: "2026-09-05",
    coverDays: 21,
    suggested: 0,
  },
  {
    id: "p7",
    name: "Nomad Leather Weekender Bag",
    sku: "NOM-BG-007",
    category: "Fashion",
    warehouse: "Chattogram Hub",
    onHand: 18,
    reserved: 3,
    incoming: 0,
    alertAt: 20,
    capacity: 40,
    velocity: 15,
    unitCost: 140,
    restockedAt: "2026-09-09",
    coverDays: 1,
    suggested: 25,
  },
  {
    id: "p8",
    name: "Cirrus Alpaca Throw Blanket",
    sku: "CIR-TB-005",
    category: "Home & Living",
    warehouse: "Sylhet Fulfilment",
    onHand: 24,
    reserved: 2,
    incoming: 0,
    alertAt: 10,
    capacity: 50,
    velocity: 8,
    unitCost: 62,
    restockedAt: "2026-09-07",
    coverDays: 21,
    suggested: 0,
  },
  {
    id: "p9",
    name: "Vega Smart Fitness Watch",
    sku: "VEG-SW-014",
    category: "Electronics",
    warehouse: "Dhaka Main DC",
    onHand: 32,
    reserved: 4,
    incoming: 40,
    alertAt: 40,
    capacity: 60,
    velocity: 22,
    unitCost: 120,
    restockedAt: "2026-09-11",
    coverDays: 1.2,
    suggested: 10,
  },
  {
    id: "p10",
    name: "Terra Ceramic Mug Set",
    sku: "TER-MG-012",
    category: "Home & Living",
    warehouse: "Sylhet Fulfilment",
    onHand: 46,
    reserved: 5,
    incoming: 0,
    alertAt: 18,
    capacity: 80,
    velocity: 11,
    unitCost: 20,
    restockedAt: "2026-09-12",
    coverDays: 28,
    suggested: 0,
  },
  {
    id: "p11",
    name: "Orbit Noise-Cancel Headphones",
    sku: "ORB-HP-002",
    category: "Electronics",
    warehouse: "Dhaka Main DC",
    onHand: 58,
    reserved: 6,
    incoming: 0,
    alertAt: 20,
    capacity: 90,
    velocity: 13,
    unitCost: 145,
    restockedAt: "2026-09-14",
    coverDays: 30,
    suggested: 0,
  },
  {
    id: "p12",
    name: "Pace Lightweight Running Shorts",
    sku: "PAC-RS-019",
    category: "Sports",
    warehouse: "Khulna Depot",
    onHand: 64,
    reserved: 4,
    incoming: 0,
    alertAt: 24,
    capacity: 100,
    velocity: 19,
    unitCost: 16,
    restockedAt: "2026-09-10",
    coverDays: 23,
    suggested: 0,
  },
  {
    id: "p13",
    name: "Linen Weave Bath Towel",
    sku: "LIN-BT-027",
    category: "Home & Living",
    warehouse: "Chattogram Hub",
    onHand: 75,
    reserved: 8,
    incoming: 0,
    alertAt: 30,
    capacity: 120,
    velocity: 21,
    unitCost: 22,
    restockedAt: "2026-09-13",
    coverDays: 24,
    suggested: 0,
  },
  {
    id: "p14",
    name: "Solace Scented Candle",
    sku: "SOL-SC-033",
    category: "Home & Living",
    warehouse: "Sylhet Fulfilment",
    onHand: 88,
    reserved: 6,
    incoming: 0,
    alertAt: 35,
    capacity: 140,
    velocity: 26,
    unitCost: 12,
    restockedAt: "2026-09-15",
    coverDays: 22,
    suggested: 0,
  },
  {
    id: "p15",
    name: "Crest Organic Cotton Tee",
    sku: "CRE-CT-009",
    category: "Fashion",
    warehouse: "Chattogram Hub",
    onHand: 96,
    reserved: 9,
    incoming: 0,
    alertAt: 40,
    capacity: 160,
    velocity: 31,
    unitCost: 9,
    restockedAt: "2026-09-16",
    coverDays: 20,
    suggested: 0,
  },
  {
    id: "p16",
    name: "Nimbus Packable Rain Jacket",
    sku: "NIM-RJ-021",
    category: "Fashion",
    warehouse: "Khulna Depot",
    onHand: 230,
    reserved: 7,
    incoming: 0,
    alertAt: 30,
    capacity: 200,
    velocity: 5,
    unitCost: 86,
    restockedAt: "2026-09-02",
    coverDays: 60,
    suggested: 0,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

function statusOf(p: Product): StockStatus {
  if (p.onHand === 0) return "out";
  if (p.onHand <= p.alertAt) return "low";
  if (p.onHand > p.capacity) return "over";
  return "in";
}

const STATUS_META: Record<
  StockStatus,
  { label: string; pill: string; dot: string; bar: string }
> = {
  in: {
    label: "In Stock",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  low: {
    label: "Low Stock",
    pill: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  out: {
    label: "Out of Stock",
    pill: "bg-rose-50 text-rose-700 ring-rose-600/20",
    dot: "bg-rose-500",
    bar: "bg-rose-400",
  },
  over: {
    label: "Overstock",
    pill: "bg-slate-100 text-slate-700 ring-slate-500/20",
    dot: "bg-slate-400",
    bar: "bg-indigo-400",
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function money(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function coverLabel(days: number | null) {
  if (days === null) return "None";
  if (days >= 10) return `${Math.round(days)}d`;
  return `${days}d`;
}

const THUMB_TINTS: Record<string, string> = {
  Electronics: "from-slate-200 to-slate-300 text-slate-600",
  "Home & Living": "from-amber-100 to-amber-200 text-amber-700",
  Fashion: "from-rose-100 to-rose-200 text-rose-700",
  Sports: "from-sky-100 to-sky-200 text-sky-700",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function Thumb({ product, size = 36 }: { product: Product; size?: number }) {
  return (
    <div
      className={cx(
        "grid shrink-0 place-items-center rounded-md bg-gradient-to-br text-[10px] font-semibold ring-1 ring-black/5",
        THUMB_TINTS[product.category] ?? "from-slate-200 to-slate-300 text-slate-600"
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials(product.name)}
    </div>
  );
}

function StatusPill({ status }: { status: StockStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        meta.pill
      )}
    >
      <span className={cx("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

function StockBar({ product }: { product: Product }) {
  const pct = Math.min(100, Math.round((product.onHand / product.capacity) * 100));
  const meta = STATUS_META[statusOf(product)];
  return (
    <div className="mt-1.5 h-1 w-28 overflow-hidden rounded-full bg-slate-100">
      <div
        className={cx("h-full rounded-full transition-[width] duration-300", meta.bar)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  caption,
  icon,
  tint,
}: {
  label: string;
  value: string;
  caption: string;
  icon: React.ReactNode;
  tint: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={cx("grid h-8 w-8 place-items-center rounded-lg", tint)}>
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{caption}</p>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={cx("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const TABS: Array<{ key: "all" | StockStatus; label: string }> = [
  { key: "all", label: "All Stock" },
  { key: "in", label: "In Stock" },
  { key: "low", label: "Low Stock" },
  { key: "out", label: "Out of Stock" },
  { key: "over", label: "Overstock" },
];

const SORTS = [
  "Lowest stock first",
  "Highest stock first",
  "Recently restocked",
  "Highest value",
  "Fastest moving",
];

const PAGE_SIZE = 8;

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [tab, setTab] = useState<"all" | StockStatus>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [warehouse, setWarehouse] = useState("All warehouses");
  const [sort, setSort] = useState(SORTS[0]);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All categories", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))],
    []
  );
  const warehouses = useMemo(
    () => ["All warehouses", ...Array.from(new Set(PRODUCTS.map((p) => p.warehouse)))],
    []
  );

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: products.length, in: 0, low: 0, out: 0, over: 0 };
    products.forEach((p) => (base[statusOf(p)] += 1));
    return base;
  }, [products]);

  const totals = useMemo(() => {
    const units = products.reduce((s, p) => s + p.onHand, 0);
    const value = products.reduce((s, p) => s + p.onHand * p.unitCost, 0);
    const incoming = products.reduce((s, p) => s + p.incoming, 0);
    return { units, value, incoming };
  }, [products]);

  const alerts = useMemo(
    () =>
      products
        .filter((p) => ["out", "low"].includes(statusOf(p)) && !dismissed.includes(p.id))
        .sort((a, b) => (a.coverDays ?? -1) - (b.coverDays ?? -1)),
    [products, dismissed]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = products.filter((p) => {
      if (tab !== "all" && statusOf(p) !== tab) return false;
      if (category !== "All categories" && p.category !== category) return false;
      if (warehouse !== "All warehouses" && p.warehouse !== warehouse) return false;
      if (q && !`${p.name} ${p.sku}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Highest stock first":
        sorted.sort((a, b) => b.onHand - a.onHand);
        break;
      case "Recently restocked":
        sorted.sort((a, b) => b.restockedAt.localeCompare(a.restockedAt));
        break;
      case "Highest value":
        sorted.sort((a, b) => b.onHand * b.unitCost - a.onHand * a.unitCost);
        break;
      case "Fastest moving":
        sorted.sort((a, b) => b.velocity - a.velocity);
        break;
      default:
        sorted.sort((a, b) => a.onHand - b.onHand);
    }
    return sorted;
  }, [products, tab, category, warehouse, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  const adjustStock = (id: string, delta: number) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, onHand: Math.max(0, p.onHand + delta) } : p
      )
    );

  const restock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.suggested > 0 ? { ...p, incoming: p.incoming + p.suggested } : p
      )
    );
    setDismissed((prev) => [...prev, id]);
  };

  const restockAll = () => {
    const ids = alerts.map((a) => a.id);
    setProducts((prev) =>
      prev.map((p) =>
        ids.includes(p.id) && p.suggested > 0
          ? { ...p, incoming: p.incoming + p.suggested }
          : p
      )
    );
    setDismissed((prev) => [...prev, ...ids]);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Top bar — move this into your layout if you already have app chrome */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-4 px-6 py-3">
          <div className="mr-auto">
            <h1 className="text-base font-semibold tracking-tight">Inventory</h1>
            <p className="text-xs text-slate-500">Track stock levels and restock alerts.</p>
          </div>

          <div className="relative hidden w-72 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search products, orders, customers..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              {counts.out + counts.low}
            </span>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 pl-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              AR
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-medium">Ayesha Rahman</p>
              <p className="text-xs text-slate-500">Store Owner</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-6 p-6">
        {/* Overview heading + actions */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Inventory Overview</h2>
            <p className="mt-1 text-sm text-slate-500">
              Monitor stock across your warehouses, spot low-stock risks and restock in a few
              clicks.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export stock
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              <Plus className="h-4 w-4" />
              Add stock
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total SKUs"
            value={String(products.length)}
            caption={`${totals.units.toLocaleString()} units on hand`}
            icon={<Layers className="h-4 w-4 text-blue-600" />}
            tint="bg-blue-50"
          />
          <StatCard
            label="Inventory Value"
            value={money(totals.value)}
            caption="Valued at cost price"
            icon={<CircleDollarSign className="h-4 w-4 text-emerald-600" />}
            tint="bg-emerald-50"
          />
          <StatCard
            label="Low Stock"
            value={String(counts.low)}
            caption="At or below alert level"
            icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
            tint="bg-amber-50"
          />
          <StatCard
            label="Out of Stock"
            value={String(counts.out)}
            caption={`${totals.incoming} units incoming`}
            icon={<XCircle className="h-4 w-4 text-rose-600" />}
            tint="bg-rose-50"
          />
        </div>

        {/* Low-stock alerts */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-amber-50/40 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-700">
              <PackageCheck className="h-4 w-4" />
            </span>
            <div className="mr-auto">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Low-Stock Alerts</h3>
                {alerts.length > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    {alerts.length} need attention
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">Products at or below their alert threshold</p>
            </div>
            <button
              type="button"
              onClick={restockAll}
              disabled={alerts.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PackageCheck className="h-4 w-4" />
              Restock all
            </button>
          </div>

          {alerts.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium">Every SKU is above its alert level</p>
              <p className="text-xs text-slate-500">
                New alerts appear here as stock drops toward the threshold.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {alerts.map((p) => {
                const status = statusOf(p);
                return (
                  <li
                    key={p.id}
                    className={cx(
                      "flex flex-wrap items-center gap-4 border-l-2 px-5 py-3.5 transition hover:bg-slate-50/60",
                      status === "out" ? "border-l-rose-500" : "border-l-transparent"
                    )}
                  >
                    <Thumb product={p} />
                    <div className="min-w-[200px] flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{p.name}</p>
                        <StatusPill status={status} />
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {p.sku} <span className="text-slate-300">|</span> {p.warehouse}{" "}
                        <span className="text-slate-300">|</span>{" "}
                        <span className={status === "out" ? "text-rose-600" : "text-amber-600"}>
                          {p.onHand} on hand
                        </span>{" "}
                        · alert at {p.alertAt}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-medium tracking-wide text-slate-400">COVER</p>
                      <p
                        className={cx(
                          "text-sm font-semibold",
                          p.coverDays === null ? "text-rose-600" : "text-slate-700"
                        )}
                      >
                        {coverLabel(p.coverDays)}
                      </p>
                    </div>

                    <div className="w-16 text-right">
                      <p className="text-[10px] font-medium tracking-wide text-slate-400">
                        SUGGESTED
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {p.suggested > 0 ? `+${p.suggested}` : "—"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => restock(p.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Restock
                    </button>
                    <button
                      type="button"
                      onClick={() => setDismissed((prev) => [...prev, p.id])}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label={`Dismiss alert for ${p.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Stock level filter */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Filter by stock level</p>
            <p className="text-xs text-slate-400">
              {counts.low + counts.out} products need restocking
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {TABS.map(({ key, label }) => {
              const active = tab === key;
              const dot = key === "all" ? null : STATUS_META[key].dot;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setTab(key);
                    setPage(1);
                  }}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {dot && <span className={cx("h-1.5 w-1.5 rounded-full", dot)} />}
                  {label}
                  <span className={cx("text-xs", active ? "text-white/60" : "text-slate-400")}>
                    {counts[key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toolbar */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => resetPage(setQuery)(e.target.value)}
                placeholder="Search by product or SKU..."
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <Select
              value={category}
              onChange={resetPage(setCategory)}
              options={categories}
              className="w-44"
            />
            <Select
              value={warehouse}
              onChange={resetPage(setWarehouse)}
              options={warehouses}
              className="w-44"
            />
            <Select value={sort} onChange={setSort} options={SORTS} className="ml-auto w-48" />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            <span className="font-medium text-slate-600">{filtered.length}</span> SKUs in view
          </p>
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-medium">PRODUCT</th>
                  <th className="px-3 py-3 font-medium">WAREHOUSE</th>
                  <th className="px-3 py-3 font-medium">ON HAND</th>
                  <th className="px-3 py-3 font-medium">RESERVED</th>
                  <th className="px-3 py-3 font-medium">INCOMING</th>
                  <th className="px-3 py-3 font-medium">STATUS</th>
                  <th className="px-3 py-3 font-medium">VELOCITY</th>
                  <th className="px-3 py-3 font-medium">VALUE</th>
                  <th className="px-3 py-3 font-medium">RESTOCKED</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((p) => {
                  const status = statusOf(p);
                  const available = Math.max(0, p.onHand - p.reserved);
                  const isEditing = editing === p.id;
                  return (
                    <tr key={p.id} className="transition hover:bg-slate-50/60">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Thumb product={p} />
                          <div>
                            <p className="font-medium text-slate-900">{p.name}</p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {p.sku} <span className="text-slate-300">|</span> {p.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-slate-600">
                          <Warehouse className="h-3.5 w-3.5 text-slate-400" />
                          {p.warehouse}
                        </span>
                      </td>

                      <td className="px-3 py-3.5">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => adjustStock(p.id, -1)}
                              className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                              aria-label="Decrease stock"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-10 text-center font-semibold tabular-nums">
                              {p.onHand}
                            </span>
                            <button
                              type="button"
                              onClick={() => adjustStock(p.id, 1)}
                              className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                              aria-label="Increase stock"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditing(null)}
                              className="ml-1 rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white"
                            >
                              Done
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex w-28 items-baseline justify-between">
                              <span className="font-semibold tabular-nums text-slate-900">
                                {p.onHand}
                              </span>
                              <span className="text-xs text-slate-400">avail. {available}</span>
                            </div>
                            <StockBar product={p} />
                          </>
                        )}
                      </td>

                      <td className="px-3 py-3.5 tabular-nums text-slate-600">
                        {p.reserved > 0 ? p.reserved : <span className="text-slate-300">—</span>}
                      </td>

                      <td className="px-3 py-3.5">
                        {p.incoming > 0 ? (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                            <Truck className="h-3.5 w-3.5 text-slate-500" />+{p.incoming}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      <td className="px-3 py-3.5">
                        <StatusPill status={status} />
                      </td>

                      <td className="px-3 py-3.5">
                        <span className="font-medium tabular-nums text-slate-700">
                          {p.velocity}
                        </span>{" "}
                        <span className="text-xs text-slate-400">units/wk</span>
                      </td>

                      <td className="px-3 py-3.5">
                        <p className="font-semibold text-slate-900">
                          {money(p.onHand * p.unitCost)}
                        </p>
                        <p className="text-xs text-slate-400">${p.unitCost} cost</p>
                      </td>

                      <td className="px-3 py-3.5 text-slate-600">{formatDate(p.restockedAt)}</td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setEditing(isEditing ? null : p.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                          >
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Adjust
                          </button>
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            aria-label={`More actions for ${p.name}`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {visible.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-5 py-16 text-center">
                      <p className="text-sm font-medium text-slate-700">
                        No SKUs match these filters
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Clear the search or pick a different stock level to see products again.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            <span>
              {visible.length} of {filtered.length} SKUs shown
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              Stock bar shows on-hand units against maximum capacity
            </span>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}-
              {(current - 1) * PAGE_SIZE + visible.length}
            </span>{" "}
            of <span className="font-medium text-slate-700">{filtered.length}</span>
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((n) => Math.max(1, n - 1))}
              disabled={current === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === current ? "page" : undefined}
                className={cx(
                  "h-8 w-8 rounded-lg text-sm font-medium transition",
                  n === current
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((n) => Math.min(pageCount, n + 1))}
              disabled={current === pageCount}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}