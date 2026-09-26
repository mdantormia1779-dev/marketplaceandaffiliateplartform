export type LinkStatus = "Active" | "Paused" | "Expired";

export type AffiliateLink = {
  id: string;
  productName: string;
  productCategory: string;
  productImage: string;
  affiliateUrl: string;
  createdAt: string; // e.g. "2026-09-09"
  clicks: number;
  sales: number;
  conversionPercent: number;
  commission: number;
  status: LinkStatus;
};

export type StatusFilter = "All" | LinkStatus;

export type SortOption = "newest" | "oldest" | "mostClicks" | "highestCommission";