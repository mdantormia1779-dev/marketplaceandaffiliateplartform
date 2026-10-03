import { Category, MonthPoint, Period, Trends } from "./types";

export const PERIODS: Period[] = ["Last 30 days", "Last 3 months", "Last 6 months", "Last year"];
export const PAGE_SIZES = [10, 25, 50];

export const COLORS = {
  marketplace: "#1fae6b",
  subscriptions: "#e8961f",
  joining: "#6b8e8e",
};

export const CATEGORY_COLORS = ["#1fae6b", "#e8961f", "#6b8e8e", "#7f8286"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MARKETPLACE = [44000, 48000, 59000, 63000, 71000, 79000, 77000, 83000, 87000, 93000, 102000, 113000];
const SUBSCRIPTIONS = [15000, 16000, 18000, 19500, 22000, 24500, 24000, 25500, 27000, 29000, 32000, 35000];
const JOINING = [9000, 9500, 10500, 12000, 13500, 16000, 15500, 17000, 18500, 20000, 22000, 24000];

const BASE_CATEGORIES = [
  { name: "Electronics", revenue: 486200 },
  { name: "Home & Kitchen", revenue: 372800 },
  { name: "Apparel", revenue: 268400 },
  { name: "Beauty", revenue: 198600 },
  { name: "Tools", revenue: 142400 },
  { name: "Outdoor", revenue: 96100 },
];

interface PeriodConfig {
  from: number;
  scale: number;
  trends: Trends;
}

const CONFIG: Record<Period, PeriodConfig> = {
  "Last 30 days": { from: 0, scale: 1, trends: { gross: 12.4, marketplace: 11.6, subscriptions: 5.8, joining: 6.4 } },
  "Last 3 months": { from: 9, scale: 1, trends: { gross: 9.6, marketplace: 8.9, subscriptions: 4.7, joining: 5.2 } },
  "Last 6 months": { from: 6, scale: 1, trends: { gross: 10.8, marketplace: 10.1, subscriptions: 5.1, joining: 5.8 } },
  "Last year": { from: 0, scale: 1 / 1.124, trends: { gross: 9.7, marketplace: 9.1, subscriptions: 4.9, joining: 5.5 } },
};

export const getTrends = (p: Period) => CONFIG[p].trends;

const round100 = (n: number) => Math.round(n / 100) * 100;
const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);

export function getMonths(period: Period): MonthPoint[] {
  const c = CONFIG[period];
  return MONTHS.slice(c.from).map((month, i) => {
    const idx = c.from + i;
    return {
      month,
      marketplace: round100(MARKETPLACE[idx] * c.scale),
      subscriptions: round100(SUBSCRIPTIONS[idx] * c.scale),
      joining: round100(JOINING[idx] * c.scale),
    };
  });
}

export function getCategories(period: Period): Category[] {
  const c = CONFIG[period];
  const factor = (sum(MARKETPLACE.slice(c.from)) * c.scale) / sum(MARKETPLACE);
  const rows = BASE_CATEGORIES.map((b, index) => ({ name: b.name, index, revenue: round100(b.revenue * factor) }));
  const total = sum(rows.map((r) => r.revenue));
  return rows.map((r) => ({ ...r, share: total ? (r.revenue / total) * 100 : 0 }));
}
