export type Period = "Last 30 days" | "Last 3 months" | "Last 6 months" | "Last year";
export type Segment = "VIP" | "Loyal" | "Regular" | "New";
export type CustomerStatus = "Active" | "Inactive" | "Blocked";
export type SortKey = "name" | "orders" | "spent" | "aov";

export interface MonthPoint {
  month: string;
  newCustomers: number;
  returning: number;
}

export interface SegmentSlice {
  name: Segment;
  count: number;
  share: number;
  order: number;
}

export interface Customer {
  id: string;
  name: string;
  orders: number;
  spent: number;
  aov: number;
  segment: Segment;
  status: CustomerStatus;
}

export interface Sort {
  key: SortKey | null;
  dir: "asc" | "desc";
}

export interface Trends {
  total: number;
  newCustomers: number;
  returning: number;
  repeat: number;
}
