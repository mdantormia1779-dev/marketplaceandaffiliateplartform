"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* -------------------------------- Constants ------------------------------- */

export const CATEGORIES = ["Electronics", "Fashion", "Home & Living", "Beauty"] as const;
export const BRANDS = ["Aurora", "Vega", "Nomad", "Lumen", "Nexora", "Terra"] as const;

const STORAGE_KEY = "shop.products.v1";

/* --------------------------------- Types ---------------------------------- */

export type ProductStatus = "Published" | "Draft";

export type Product = {
  id: string;
  name: string;
  description?: string;
  sku: string;
  brand: string;
  variants?: number;
  category: string;
  price: number;
  comparePrice?: number;
  cost?: number;
  stock: number;
  sold: number;
  commission: number; // 0 = affiliate commission disabled
  status: ProductStatus;
  updated: string; // "YYYY-MM-DD" or a full ISO timestamp
  featured?: boolean;
  tags?: string[];
  image?: string; // data URL (first uploaded image)
  iconKey?: string; // used by seed products that have no photo
  tint?: string;
};

export type NewProduct = Omit<Product, "id" | "sold" | "updated">;

/* ------------------------------- Seed data -------------------------------- */

export const SEED_PRODUCTS: Product[] = [
  { id: "seed-1", name: "Aurora Noise-Cancelling Headphones", sku: "AUR-HP-001", brand: "Aurora", variants: 3, category: "Electronics", price: 299, comparePrice: 349, stock: 64, sold: 482, commission: 12, status: "Published", updated: "2026-09-18", iconKey: "headphones", tint: "bg-slate-100 text-slate-800" },
  { id: "seed-2", name: "Vega Smart Fitness Watch", sku: "VEG-SW-014", brand: "Vega", variants: 2, category: "Electronics", price: 189.5, comparePrice: 229, stock: 32, sold: 396, commission: 10, status: "Published", updated: "2026-09-17", iconKey: "watch", tint: "bg-zinc-100 text-zinc-800" },
  { id: "seed-3", name: "Nomad Leather Weekender Bag", sku: "NOM-BG-007", brand: "Nomad", variants: 4, category: "Fashion", price: 249, comparePrice: 289, stock: 18, sold: 274, commission: 15, status: "Published", updated: "2026-09-16", iconKey: "bag", tint: "bg-amber-100 text-amber-800" },
  { id: "seed-4", name: "Lumen Minimal Desk Lamp", sku: "LUM-DL-021", brand: "Lumen", variants: 2, category: "Home & Living", price: 109, comparePrice: 139, stock: 6, sold: 318, commission: 8, status: "Published", updated: "2026-09-15", iconKey: "lamp", tint: "bg-white text-slate-700 border border-slate-200" },
  { id: "seed-5", name: "Pulse Wireless Earbuds Pro", sku: "PLS-EB-003", brand: "Nexora", variants: 3, category: "Electronics", price: 159, comparePrice: 199, stock: 88, sold: 452, commission: 10, status: "Published", updated: "2026-09-14", iconKey: "headset", tint: "bg-neutral-200 text-neutral-800" },
  { id: "seed-6", name: "Terra Ceramic Dinner Set", sku: "TER-DS-012", brand: "Terra", variants: 2, category: "Home & Living", price: 142, stock: 41, sold: 168, commission: 6, status: "Published", updated: "2026-09-12", iconKey: "utensils", tint: "bg-orange-100 text-orange-800" },
  { id: "seed-7", name: "Solstice Polarized Sunglasses", sku: "SOL-SG-009", brand: "Nomad", variants: 5, category: "Fashion", price: 89, comparePrice: 119, stock: 120, sold: 240, commission: 18, status: "Published", updated: "2026-09-10", iconKey: "glasses", tint: "bg-stone-200 text-stone-800" },
  { id: "seed-8", name: "Bloom Botanical Face Serum", sku: "BLO-FS-002", brand: "Nexora", category: "Beauty", price: 45, comparePrice: 59, stock: 210, sold: 612, commission: 20, status: "Published", updated: "2026-09-06", iconKey: "droplet", tint: "bg-rose-100 text-rose-800" },
];

/* --------------------------------- Context -------------------------------- */

type Store = {
  products: Product[];
  ready: boolean;
  addProduct: (p: NewProduct) => Product;
  notice: string | null;
  setNotice: (n: string | null) => void;
};

const ProductsContext = createContext<Store | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [created, setCreated] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Load products the user has added (seed products are always included).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCreated(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    } catch {
      /* storage full or unavailable: the product still lives in memory */
    }
  }, [created, ready]);

  const addProduct = useCallback((p: NewProduct) => {
    const product: Product = {
      ...p,
      id: `p-${Date.now()}`,
      sold: 0,
      updated: new Date().toISOString(),
    };
    setCreated((list) => [product, ...list]);
    return product;
  }, []);

  const products = useMemo(() => [...created, ...SEED_PRODUCTS], [created]);

  const value = useMemo(
    () => ({ products, ready, addProduct, notice, setNotice }),
    [products, ready, addProduct, notice]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>");
  return ctx;
}

/* ------------------------------ Image helper ------------------------------ */

/** Reads an image file and shrinks it so it fits comfortably in localStorage. */
export function fileToDataUrl(file: File, max = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not read this image."));
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(reader.result as string);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}