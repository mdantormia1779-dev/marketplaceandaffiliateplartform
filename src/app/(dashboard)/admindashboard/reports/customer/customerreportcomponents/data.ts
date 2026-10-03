import { Customer, MonthPoint, Period, Segment, SegmentSlice, Trends } from "./types";

export const PERIODS: Period[] = ["Last 30 days", "Last 3 months", "Last 6 months", "Last year"];
export const SEGMENTS: Segment[] = ["VIP", "Loyal", "Regular", "New"];
export const STATUSES = ["Active", "Inactive", "Blocked"] as const;
export const PAGE_SIZES = [10, 25, 50];

export const NEW_COLOR = "#1fae6b";
export const RETURNING_COLOR = "#f7a93c";
export const SEGMENT_COLORS: Record<Segment, string> = {
  VIP: "#1fae6b",
  Loyal: "#e8961f",
  Regular: "#6b8e8e",
  New: "#7f8286",
};

const DONUT_ORDER: Record<Segment, number> = { Loyal: 0, VIP: 1, New: 2, Regular: 3 };
const SEGMENT_BASE: Record<Segment, number> = { VIP: 842, Loyal: 2140, Regular: 4860, New: 2000 };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NEW = [600, 650, 720, 800, 880, 950, 900, 980, 1050, 1120, 1180, 1338];
const RETURNING = [4100, 4300, 4800, 5200, 5600, 6050, 5900, 6300, 6700, 7050, 7500, 8060];

const BASE: Omit<Customer, "id" | "aov">[] = [
  { name: "Noah Patel", orders: 34, spent: 12480, segment: "VIP", status: "Active" },
  { name: "Priya Nair", orders: 31, spent: 10720.6, segment: "VIP", status: "Active" },
  { name: "Aiko Tanaka", orders: 29, spent: 9880.2, segment: "Loyal", status: "Active" },
  { name: "Mia Johnson", orders: 25, spent: 8150.3, segment: "Loyal", status: "Active" },
  { name: "Emma Lawson", orders: 21, spent: 7940.5, segment: "Loyal", status: "Active" },
  { name: "Olivia Brown", orders: 18, spent: 6240.9, segment: "Regular", status: "Active" },
  { name: "Hannah Weber", orders: 15, spent: 4610.4, segment: "Regular", status: "Active" },
  { name: "Liam Schmidt", orders: 12, spent: 3120.75, segment: "Regular", status: "Active" },
  { name: "Ethan Kim", orders: 9, spent: 2780, segment: "New", status: "Active" },
  { name: "Tom Andersen", orders: 11, spent: 3980, segment: "Regular", status: "Active" },
];

interface PeriodConfig {
  from: number;
  scale: number;
  segmentScale: number;
  repeatRate: number;
  latestLabel: string;
  trends: Trends;
}

const CONFIG: Record<Period, PeriodConfig> = {
  "Last 30 days": { from: 0, scale: 1, segmentScale: 1, repeatRate: 63.4, latestLabel: "this month", trends: { total: 4.1, newCustomers: 7.4, returning: 6.8, repeat: 2.2 } },
  "Last 3 months": { from: 9, scale: 1, segmentScale: 1, repeatRate: 64.1, latestLabel: "this month", trends: { total: 2.9, newCustomers: 5.6, returning: 5.1, repeat: 1.4 } },
  "Last 6 months": { from: 6, scale: 1, segmentScale: 1, repeatRate: 63.8, latestLabel: "this month", trends: { total: 3.5, newCustomers: 6.3, returning: 5.9, repeat: 1.8 } },
  "Last year": { from: 0, scale: 1 / 1.112, segmentScale: 1 / 1.041, repeatRate: 61.9, latestLabel: "in Dec", trends: { total: 3.8, newCustomers: 6.1, returning: 5.4, repeat: 1.6 } },
};

export const getTrends = (p: Period) => CONFIG[p].trends;
export const getRepeatRate = (p: Period) => CONFIG[p].repeatRate;
export const getLatestLabel = (p: Period) => CONFIG[p].latestLabel;

const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);

function activityFactor(period: Period) {
  const c = CONFIG[period];
  const part = sum(NEW.slice(c.from)) + sum(RETURNING.slice(c.from));
  return (part * c.scale) / (sum(NEW) + sum(RETURNING));
}

export function getMonths(period: Period): MonthPoint[] {
  const c = CONFIG[period];
  return MONTHS.slice(c.from).map((month, i) => ({
    month,
    newCustomers: Math.round(NEW[c.from + i] * c.scale),
    returning: Math.round(RETURNING[c.from + i] * c.scale),
  }));
}

export function getSegments(period: Period): SegmentSlice[] {
  const c = CONFIG[period];
  const counts = SEGMENTS.map((name) => ({ name, count: Math.round(SEGMENT_BASE[name] * c.segmentScale) }));
  const total = sum(counts.map((x) => x.count));
  return counts.map((x) => ({ ...x, share: total ? (x.count / total) * 100 : 0, order: DONUT_ORDER[x.name] }));
}

export function getCustomers(period: Period): Customer[] {
  const f = activityFactor(period);
  return BASE.map((c, i) => {
    const orders = Math.max(1, Math.round(c.orders * f));
    const spent = Math.round(c.spent * f * 100) / 100;
    return { ...c, id: String(i + 1), orders, spent, aov: spent / orders };
  });
}
