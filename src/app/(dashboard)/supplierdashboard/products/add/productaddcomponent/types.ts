export type Variant = { id: string; name: string; price: string; stock: string };

export type Form = {
  title: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  barcode: string;
  tags: string;
  price: string;
  comparePrice: string;
  cost: string;
  stock: string;
  lowStock: string;
  track: boolean;
  hasVariants: boolean;
  variants: Variant[];
  images: string[];
  affiliate: boolean;
  commission: number;
  window: string;
  weight: string;
  dimensions: string;
  shippingMethod: string;
  shippingFee: string;
  delivery: string;
  returnPolicy: string;
  status: "Draft" | "Published";
  visibility: string;
  featured: boolean;
};

export const PRODUCTS_URL = "/supplierdashboard/products";

export const EMPTY: Form = {
  title: "",
  description: "",
  category: "",
  brand: "",
  sku: "",
  barcode: "",
  tags: "",
  price: "",
  comparePrice: "",
  cost: "",
  stock: "",
  lowStock: "5",
  track: true,
  hasVariants: false,
  variants: [],
  images: [],
  affiliate: true,
  commission: 10,
  window: "30 days",
  weight: "",
  dimensions: "",
  shippingMethod: "Standard shipping (5–7 days)",
  shippingFee: "",
  delivery: "",
  returnPolicy: "30-day returns",
  status: "Draft",
  visibility: "Public — visible in marketplace",
  featured: false,
};

export const DRAFT_KEY = "shop.product-draft.v1";
export const MAX_IMAGES = 6;
export const MAX_DESCRIPTION = 500;

export const VISIBILITY = [
  "Public — visible in marketplace",
  "Unlisted — only people with the link",
  "Private — only you",
] as const;

export const WINDOWS = ["7 days", "14 days", "30 days", "60 days", "90 days"] as const;

export const SHIPPING_METHODS = [
  "Standard shipping (5–7 days)",
  "Express shipping (2–3 days)",
  "Free shipping",
  "Local pickup",
] as const;

export const RETURN_POLICIES = ["No returns", "7-day returns", "14-day returns", "30-day returns"] as const;