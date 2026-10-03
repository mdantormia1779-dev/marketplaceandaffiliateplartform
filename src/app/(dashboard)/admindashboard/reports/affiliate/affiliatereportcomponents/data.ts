import { Affiliate, MonthPoint, Period, Trends } from "./types";

export const PERIODS: Period[] = ["Last 30 days", "Last 3 months", "Last 6 months", "Last year"];
export const STATUSES = ["Active", "Pending", "Suspended"] as const;
export const PAGE_SIZES = [10, 25, 50];
export const CLICKS_COLOR = "#1fae6b";
export const CONVERSIONS_COLOR = "#e8961f";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CLICKS = [9900, 10700, 12300, 13800, 15300, 17300, 16300, 17800, 18900, 20000, 21800, 23500];
const CONVERSIONS = [215, 232, 288, 312, 345, 400, 380, 445, 440, 468, 525, 572];

const BASE: Omit<Affiliate, "id">[] = [
  { name: "Jordan Blake", clicks: 18420, conversions: 412, revenue: 92140, commission: 18420, status: "Active" },
  { name: "Ravi Sharma", clicks: 20110, conversions: 302, revenue: 74450, commission: 14890, status: "Active" },
  { name: "Nina Foster", clicks: 12980, conversions: 287, revenue: 60900, commission: 12180, status: "Active" },
  { name: "Marco Silva", clicks: 15760, conversions: 221, revenue: 53800, commission: 10760, status: "Active" },
  { name: "Carlos Mendez", clicks: 9640, conversions: 198, revenue: 48200, commission: 9640, status: "Active" },
  { name: "Ava Sinclair", clicks: 7420, conversions: 156, revenue: 36600, commission: 7320, status: "Pending" },
  { name: "Zoey Turner", clicks: 8110, conversions: 134, revenue: 30700, commission: 6140, status: "Active" },
  { name: "Louis Grant", clicks: 4310, conversions: 94, revenue: 22550, commission: 4510, status: "Active" },
  { name: "Farah Aziz", clicks: 2890, conversions: 63, revenue: 14900, commission: 2980, status: "Suspended" },
  { name: "Ella Novak", clicks: 1980, conversions: 47, revenue: 9300, commission: 1860, status: "Active" },
];

interface PeriodConfig {
  from: number;
  scale: number;
  trends: Trends;
}

const CONFIG: Record<Period, PeriodConfig> = {
  "Last 30 days": { from: 0, scale: 1, trends: { affiliates: 7.6, clicks: 11.2, conversions: 8.4, commission: 9.8 } },
  "Last 3 months": { from: 9, scale: 1, trends: { affiliates: 5.1, clicks: 8.6, conversions: 6.9, commission: 7.4 } },
  "Last 6 months": { from: 6, scale: 1, trends: { affiliates: 6.3, clicks: 9.7, conversions: 7.5, commission: 8.5 } },
  "Last year": { from: 0, scale: 1 / 1.112, trends: { affiliates: 6.8, clicks: 9.2, conversions: 7.1, commission: 8.3 } },
};

export const getTrends = (p: Period) => CONFIG[p].trends;

const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);

export function getFactor(period: Period) {
  const c = CONFIG[period];
  return (sum(CLICKS.slice(c.from)) * c.scale) / sum(CLICKS);
}

const BASE_ACTIVE = BASE.filter((a) => a.status === "Active").length;
const BASE_COMMISSION = sum(BASE.map((a) => a.commission));
export const AFFILIATE_OFFSET = 412 - BASE_ACTIVE;
export const COMMISSION_OFFSET = 184920 - BASE_COMMISSION;

export function getMonths(period: Period): MonthPoint[] {
  const c = CONFIG[period];
  return MONTHS.slice(c.from).map((month, i) => ({
    month,
    clicks: Math.round(CLICKS[c.from + i] * c.scale),
    conversions: Math.round(CONVERSIONS[c.from + i] * c.scale),
  }));
}

export function getAffiliates(period: Period): Affiliate[] {
  const f = getFactor(period);
  return BASE.map((a, i) => ({
    ...a,
    id: String(i + 1),
    clicks: Math.round(a.clicks * f),
    conversions: Math.round(a.conversions * f),
    revenue: Math.round(a.revenue * f),
    commission: Math.round(a.commission * f),
  }));
}
