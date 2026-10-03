export type Period = "Last 30 days" | "Last 3 months" | "Last 6 months" | "Last year";
export type AffiliateStatus = "Active" | "Pending" | "Suspended";
export type SortKey = "name" | "clicks" | "conversions" | "revenue" | "commission";

export interface MonthPoint {
  month: string;
  clicks: number;
  conversions: number;
}

export interface Affiliate {
  id: string;
  name: string;
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
  status: AffiliateStatus;
}

export interface Sort {
  key: SortKey;
  dir: "asc" | "desc";
}

export interface Trends {
  affiliates: number;
  clicks: number;
  conversions: number;
  commission: number;
}
