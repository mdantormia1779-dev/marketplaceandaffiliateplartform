export type Period = "Last 30 days" | "Last 3 months" | "Last 6 months" | "Last year";
export type SupplierStatus = "Active" | "Pending" | "Paused";
export type SortKey = "name" | "orders" | "fillRate" | "payouts" | "rating";

export interface MonthPoint {
  month: string;
  orders: number;
  payouts: number;
  newSuppliers: number;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  orders: number;
  fillRate: number;
  payouts: number;
  rating: number;
  status: SupplierStatus;
}

export interface Sort {
  key: SortKey;
  dir: "asc" | "desc";
}

export interface Trends {
  suppliers: number;
  orders: number;
  fillRate: number;
  payouts: number;
}
