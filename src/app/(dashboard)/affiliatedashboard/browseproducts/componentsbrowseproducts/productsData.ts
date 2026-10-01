import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    badge: "Best Seller",
    commissionPercent: 10,
    rating: 4.8,
    price: 2499,
    estEarnings: 249,
    conversionPercent: 4.8,
    affiliatesCount: 1284,
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800",
    badge: "High Commission",
    commissionPercent: 12,
    rating: 4.7,
    price: 3899,
    estEarnings: 468,
    conversionPercent: 3.9,
    affiliatesCount: 968,
  },
  {
    id: "3",
    name: "LED Desk Lamp",
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
    badge: "High Conversion",
    commissionPercent: 16,
    rating: 4.8,
    price: 1299,
    estEarnings: 208,
    conversionPercent: 5.1,
    affiliatesCount: 934,
    isNew: true,
  },
  {
    id: "4",
    name: "Non-Slip Yoga Mat",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=800",
    commissionPercent: 13,
    rating: 4.5,
    price: 999,
    estEarnings: 130,
    conversionPercent: 4.5,
    affiliatesCount: 806,
  },
  {
    id: "5",
    name: "Leather Wallet",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
    commissionPercent: 18,
    rating: 4.6,
    price: 1599,
    estEarnings: 288,
    conversionPercent: 3.8,
    affiliatesCount: 612,
    isNew: true,
  },
];
