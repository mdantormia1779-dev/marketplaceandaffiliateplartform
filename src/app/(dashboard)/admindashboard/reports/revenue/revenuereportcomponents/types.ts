export type Period = "Last 30 days" | "Last 3 months" | "Last 6 months" | "Last year";
export type SortKey = "name" | "revenue" | "share";

export interface MonthPoint {
  month: string;
  marketplace: number;
  subscriptions: number;
  joining: number;
}

export interface Category {
  name: string;
  index: number;
  revenue: number;
  share: number;
}

export interface Sort {
  key: SortKey;
  dir: "asc" | "desc";
}

export interface Trends {
  gross: number;
  marketplace: number;
  subscriptions: number;
  joining: number;
}
