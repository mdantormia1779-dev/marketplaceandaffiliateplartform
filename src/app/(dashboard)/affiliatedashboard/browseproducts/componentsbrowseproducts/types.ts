export type ProductBadgeType = "Best Seller" | "High Commission" | "High Conversion";

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  badge?: ProductBadgeType;
  commissionPercent: number;
  rating: number;
  price: number;
  estEarnings: number;
  conversionPercent: number;
  affiliatesCount: number;
  isNew?: boolean;
};
