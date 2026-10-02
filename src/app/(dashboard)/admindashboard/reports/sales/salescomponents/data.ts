import { MonthRow, Period, Trends } from "./types";

export const PERIODS: Period[] = ["Last 30 days", "Last 3 months", "Last 6 months", "Last year"];
export const PAGE_SIZES = [10, 25, 50];
export const REVENUE_COLOR = "#1fae6b";
export const ORDER_COLOR = "#e8961f";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REVENUE = [68400, 74200, 88900, 95400, 108600, 121300, 117800, 126500, 134200, 141800, 157600, 173500];
const ORDERS = [982, 1044, 1218, 1332, 1486, 1610, 1542, 1688, 1754, 1842, 2018, 2196];

interface PeriodConfig {
  from: number;
  revenueScale: number;
  ordersScale: number;
  growth: number;
  trends: Trends;
}

const CONFIG: Record<Period, PeriodConfig> = {
  "Last 30 days": { from: 0, revenueScale: 1, ordersScale: 1, growth: 12.4, trends: { sales: 12.4, orders: 6.2, aov: 3.1, growth: 2.1 } },
  "Last 3 months": { from: 9, revenueScale: 1, ordersScale: 1, growth: 14.8, trends: { sales: 9.6, orders: 5.1, aov: 2.4, growth: 1.8 } },
  "Last 6 months": { from: 6, revenueScale: 1, ordersScale: 1, growth: 13.5, trends: { sales: 10.8, orders: 5.7, aov: 2.7, growth: 1.9 } },
  "Last year": { from: 0, revenueScale: 1 / 1.124, ordersScale: 1 / 1.062, growth: 9.7, trends: { sales: 9.7, orders: 5.3, aov: 2.6, growth: 1.4 } },
};

export const getGrowth = (period: Period) => CONFIG[period].growth;
export const getTrends = (period: Period) => CONFIG[period].trends;

export function getRows(period: Period): MonthRow[] {
  const config = CONFIG[period];
  return MONTHS.slice(config.from).map((month, index) => {
    const dataIndex = config.from + index;
    const revenue = Math.round((REVENUE[dataIndex] * config.revenueScale) / 100) * 100;
    const orders = Math.round(ORDERS[dataIndex] * config.ordersScale);
    return { month, index, revenue, orders, aov: Math.round(revenue / orders) };
  });
}
