export type CategoryStatus = "Active" | "Inactive";

export interface Category {
  id: string;
  name: string;
  slug: string;
  products: number;
  status: CategoryStatus;
  created: string; // YYYY-MM-DD
}

export interface Filters {
  query: string;
  status: CategoryStatus | "All";
}