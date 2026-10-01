export type ProductStatus = "Approved" | "Pending" | "Rejected";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  status: ProductStatus;
  submitted: string; // YYYY-MM-DD
}

export interface Filters {
  query: string;
  status: ProductStatus | "All";
  category: string;
}