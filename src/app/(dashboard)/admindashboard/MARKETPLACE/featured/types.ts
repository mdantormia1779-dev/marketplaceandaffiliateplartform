export type Placement = "Home Hero" | "Category Top" | "Deals Banner";
export type FeaturedStatus = "Active" | "Scheduled" | "Expired";

export interface Featured {
  id: string;
  product: string;
  supplier: string;
  placement: Placement;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

// status date theke hishab hoy, tai alada store kora hoy na
export interface FeaturedView extends Featured {
  status: FeaturedStatus;
}

export interface Filters {
  query: string;
  status: FeaturedStatus | "All";
  placement: Placement | "All";
}