export type ProductBadgeType = "best-seller" | "high-commission" | "high-conversion" | null;

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  price: number;
  estimatedEarnings: number;
  commissionRate: number;
  conversionRate: number;
  affiliatesCount: number;
  badge: ProductBadgeType;
}