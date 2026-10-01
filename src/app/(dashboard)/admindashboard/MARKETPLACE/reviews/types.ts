export type ReviewStatus = "Pending" | "Approved" | "Hidden";

export interface Review {
  id: string;
  title: string;
  product: string;
  customer: string;
  rating: number; // 1 theke 5
  status: ReviewStatus;
  date: string; // YYYY-MM-DD
}

export interface Filters {
  query: string;
  status: ReviewStatus | "All";
}