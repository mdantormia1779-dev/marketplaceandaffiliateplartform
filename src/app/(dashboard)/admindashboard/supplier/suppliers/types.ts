export type SupplierStatus = "Active" | "Pending" | "Suspended" | "Rejected";

export interface Supplier {
  id: number;
  store: string;
  owner: string;
  email: string;
  products: number;
  revenue: number;
  rating: number;
  status: SupplierStatus;
  joined: string; // YYYY-MM-DD
}