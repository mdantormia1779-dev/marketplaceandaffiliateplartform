import { Supplier, MonthPoint, Period, Trends } from "./types";

export const PERIODS: Period[] = ["Last 30 days", "Last 3 months", "Last 6 months", "Last year"];
export const STATUSES = ["Active", "Pending", "Paused"] as const;
export const PAGE_SIZES = [10, 25, 50];
export const ORDERS_COLOR = "#1fae6b";
export const PAYOUTS_COLOR = "#e8961f";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ORDERS = [1720, 1860, 2010, 2195, 2380, 2520, 2450, 2680, 2840, 2975, 3120, 3340];
const PAYOUTS = [48200, 51900, 55600, 59200, 64800, 67400, 66100, 70600, 74200, 78000, 82100, 87500];
const NEW_SUPPLIERS = [18, 22, 25, 27, 29, 31, 28, 32, 34, 36, 39, 42];

const BASE: Omit<Supplier, "id">[] = [
  { name: "Northwind Goods", category: "Electronics", orders: 1842, fillRate: 96, payouts: 48200, rating: 4.9, status: "Active" },
  { name: "Sora Home", category: "Home & Kitchen", orders: 1688, fillRate: 94, payouts: 44100, rating: 4.8, status: "Active" },
  { name: "Luma Style", category: "Apparel", orders: 1490, fillRate: 92, payouts: 38750, rating: 4.7, status: "Active" },
  { name: "Aster Beauty", category: "Beauty", orders: 1284, fillRate: 90, payouts: 31850, rating: 4.6, status: "Pending" },
  { name: "Forge Tools", category: "Tools", orders: 1215, fillRate: 91, payouts: 29500, rating: 4.5, status: "Active" },
  { name: "Summit Outdoor", category: "Outdoor", orders: 987, fillRate: 88, payouts: 24300, rating: 4.4, status: "Active" },
  { name: "Pine & Co.", category: "Home & Kitchen", orders: 845, fillRate: 87, payouts: 21950, rating: 4.3, status: "Paused" },
  { name: "Velvet Lane", category: "Apparel", orders: 760, fillRate: 86, payouts: 19140, rating: 4.2, status: "Active" },
  { name: "Nova Tech", category: "Electronics", orders: 664, fillRate: 85, payouts: 17680, rating: 4.3, status: "Pending" },
  { name: "Harbor Essentials", category: "Beauty", orders: 552, fillRate: 83, payouts: 14020, rating: 4.1, status: "Active" },
];

interface PeriodConfig {
  from: number;
  scale: number;
  trends: Trends;
}

const CONFIG: Record<Period, PeriodConfig> = {
  "Last 30 days": { from: 0, scale: 1, trends: { suppliers: 8.4, orders: 12.1, fillRate: 1.6, payouts: 10.5 } },
  "Last 3 months": { from: 9, scale: 1, trends: { suppliers: 6.9, orders: 9.2, fillRate: 1.2, payouts: 8.8 } },
  "Last 6 months": { from: 6, scale: 1, trends: { suppliers: 7.5, orders: 10.2, fillRate: 1.4, payouts: 9.6 } },
  "Last year": { from: 0, scale: 1 / 1.124, trends: { suppliers: 7.1, orders: 9.8, fillRate: 1.1, payouts: 8.9 } },
};

export const getTrends = (p: Period) => CONFIG[p].trends;

const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);

export function getFactor(period: Period) {
  const c = CONFIG[period];
  return (sum(ORDERS.slice(c.from)) * c.scale) / sum(ORDERS);
}

export function getMonths(period: Period): MonthPoint[] {
  const c = CONFIG[period];
  return MONTHS.slice(c.from).map((month, i) => ({
    month,
    orders: Math.round(ORDERS[c.from + i] * c.scale),
    payouts: Math.round(PAYOUTS[c.from + i] * c.scale),
    newSuppliers: Math.round(NEW_SUPPLIERS[c.from + i] * c.scale),
  }));
}

export function getSuppliers(period: Period): Supplier[] {
  const f = getFactor(period);
  return BASE.map((s, i) => ({
    ...s,
    id: String(i + 1),
    orders: Math.round(s.orders * f),
    fillRate: Math.round(s.fillRate * f),
    payouts: Math.round(s.payouts * f),
    rating: Number((s.rating * (0.98 + f * 0.08)).toFixed(1)),
  }));
}
