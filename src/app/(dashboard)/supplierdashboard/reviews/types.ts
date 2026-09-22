export type Review = {
  id: string;
  customerName: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  productName: string;
  productImage?: string;
  comment: string;
  images?: string[];
  date: string; // ISO
  verified: boolean;
  flagged?: boolean;
  reply?: { text: string; date: string; edited?: boolean };
};

export type StarFilter = 5 | 4 | 3 | 2 | 1;
export type ActiveFilter = StarFilter | "all" | "unanswered" | "flagged";
export type SortOption = "newest" | "oldest" | "highest" | "lowest";
export type ProductFilterValue = string | "all";

export const STAR_FILTERS: StarFilter[] = [5, 4, 3, 2, 1];

export const PAGE_SIZE = 5;