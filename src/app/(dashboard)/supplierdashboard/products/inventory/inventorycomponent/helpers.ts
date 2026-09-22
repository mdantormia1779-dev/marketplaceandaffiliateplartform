import type { Product, StockStatus } from "./types";

export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export function statusOf(p: Product): StockStatus {
  if (p.onHand === 0) return "out";
  if (p.onHand <= p.alertAt) return "low";
  if (p.onHand > p.capacity) return "over";
  return "in";
}

export const STATUS_META: Record<
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

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function money(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

export function coverLabel(days: number | null) {
  if (days === null) return "None";
  if (days >= 10) return `${Math.round(days)}d`;
  return `${days}d`;
}

export const THUMB_TINTS: Record<string, string> = {
  Electronics: "from-slate-200 to-slate-300 text-slate-600",
  "Home & Living": "from-amber-100 to-amber-200 text-amber-700",
  Fashion: "from-rose-100 to-rose-200 text-rose-700",
  Sports: "from-sky-100 to-sky-200 text-sky-700",
};

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export const TABS: Array<{ key: "all" | StockStatus; label: string }> = [
  { key: "all", label: "All Stock" },
  { key: "in", label: "In Stock" },
  { key: "low", label: "Low Stock" },
  { key: "out", label: "Out of Stock" },
  { key: "over", label: "Overstock" },
];

export const SORTS = [
  "Lowest stock first",
  "Highest stock first",
  "Recently restocked",
  "Highest value",
  "Fastest moving",
];

export const PAGE_SIZE = 8;