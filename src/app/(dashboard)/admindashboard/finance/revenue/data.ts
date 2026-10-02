import { BreakdownItem, Method, Period, PeriodData } from "./types";

export const PERIODS: Period[] = ["This year", "Last year", "Last 6 months"];

export const REVENUE_COLOR = "#1fae6b";
export const PAYOUT_COLOR = "#e8961f";
export const METHOD_COLORS = [REVENUE_COLOR, PAYOUT_COLOR, "#6b8e8e", "#7f8286"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const REVENUE = [70000, 74000, 91000, 98000, 110000, 122000, 118000, 128000, 134000, 144000, 160000, 173300];
const PAYOUTS = [48000, 50000, 56000, 60000, 66000, 74000, 71000, 76000, 80000, 86000, 96000, 115900];

const BREAKDOWN_YEAR: BreakdownItem[] = [
  { label: "Marketplace Commission", amount: 192688, trend: 9.8 },
  { label: "Subscription Fees", amount: 178320, trend: 5.8 },
  { label: "Joining Fees", amount: 40512, trend: 6.4 },
  { label: "Featured Placements", amount: 96480, trend: 4.1 },
  { label: "Other Fees", amount: 35400, trend: 2.0 },
];
const NET_YEAR = 543400;

const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);
const round100 = (n: number) => Math.round(n / 100) * 100;

const m = (a: number, b: number, c: number, d: number): Method[] => [
  { name: "Stripe", share: a },
  { name: "PayPal", share: b },
  { name: "Square", share: c },
  { name: "Bank Transfer", share: d },
];

function scaleBreakdown(net: number): BreakdownItem[] {
  const k = net / NET_YEAR;
  return BREAKDOWN_YEAR.map((b) => ({ ...b, amount: Math.round(b.amount * k) }));
}

export function getPeriodData(period: Period): PeriodData {
  if (period === "Last year") {
    const revenue = REVENUE.map((v) => round100(v / 1.124));
    const payouts = PAYOUTS.map((v) => round100(v / 1.096));
    return {
      months: MONTHS,
      revenue,
      payouts,
      methods: m(58, 24, 12, 6),
      aov: 73.9,
      compareLabel: "vs prior year",
      trends: { gross: 8.2, payouts: 6.5, net: 10.1, aov: 2.4 },
      breakdown: scaleBreakdown(sum(revenue) - sum(payouts)),
    };
  }

  if (period === "Last 6 months") {
    const revenue = REVENUE.slice(6);
    const payouts = PAYOUTS.slice(6);
    return {
      months: MONTHS.slice(6),
      revenue,
      payouts,
      methods: m(63, 20, 11, 6),
      aov: 77.4,
      compareLabel: "vs previous 6 months",
      trends: { gross: 6.8, payouts: 5.2, net: 8.9, aov: 1.7 },
      breakdown: scaleBreakdown(sum(revenue) - sum(payouts)),
    };
  }

  return {
    months: MONTHS,
    revenue: REVENUE,
    payouts: PAYOUTS,
    methods: m(62, 21, 11, 6),
    aov: 76.2,
    compareLabel: "vs last year",
    trends: { gross: 12.4, payouts: 9.6, net: 11.2, aov: 3.1 },
    breakdown: BREAKDOWN_YEAR,
  };
}
