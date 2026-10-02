export type Period = "Last 30 days" | "Last 3 months" | "Last 6 months" | "Last year";
export type SortKey = "month" | "revenue" | "orders" | "aov";

export interface MonthRow {
  month: string;
  index: number;
  revenue: number;
  orders: number;
  aov: number;
}

export interface Sort {
  key: SortKey;
  dir: "asc" | "desc";
}

export interface Trends {
  sales: number;
  orders: number;
  aov: number;
  growth: number;
}
