export type BrandStatus = "Active" | "Pending" | "Suspended";

export interface Brand {
  id: string;
  name: string;
  company: string;
  products: number;
  status: BrandStatus;
  created: string; // YYYY-MM-DD
}

export interface Filters {
  query: string;
  status: BrandStatus | "All";
}