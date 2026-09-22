export const PAGE_SIZE = 5;

export type StarFilter = 1 | 2 | 3 | 4 | 5;
export const STAR_FILTERS: StarFilter[] = [5, 4, 3, 2, 1];

export type ActiveFilter = "all" | StarFilter | "unanswered" | "flagged" | "hidden";

export type ProductFilterValue = "all" | string;

export type SortOption = "newest" | "oldest" | "highest" | "lowest";

export type ReviewReplyData = {
  text: string;
  date: string; // ISO
  edited?: boolean;
};

export type Review = {
  id: string;
  customerName: string;
  initials: string;
  rating: number;
  productName: string;
  comment: string;
  images?: string[];
  date: string; // ISO
  verified?: boolean;
  flagged?: boolean;
  hidden?: boolean;
  reply?: ReviewReplyData;
};