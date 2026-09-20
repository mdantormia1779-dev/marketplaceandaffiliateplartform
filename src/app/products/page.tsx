import { ProductCard, type Product } from "@/components/featured-products/product-card";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

const allProducts: Product[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    vendor: "AudioTech BD",
    cashback: 12,
    name: "Noise Cancelling Wireless Headphones",
    rating: 4.8,
    reviewCount: 1240,
    price: 8900,
    oldPrice: 12500,
    discountPercent: 29,
    sold: 3120,
    stockLabel: "In Stock",
    stockVariant: "inStock",
    tag: "Best Seller",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    vendor: "AudioTech BD",
    cashback: 10,
    name: "Smart Fitness Watch Series 7",
    rating: 4.6,
    reviewCount: 860,
    price: 4290,
    oldPrice: 6500,
    discountPercent: 34,
    sold: 2410,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    vendor: "UrbanCarry",
    cashback: 15,
    name: "Minimalist Leather Backpack",
    rating: 4.7,
    reviewCount: 540,
    price: 2850,
    oldPrice: 4200,
    discountPercent: 32,
    sold: 1180,
    stockLabel: "Only 25 left",
    stockVariant: "lowStock",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    vendor: "GlowLab Cosmetics",
    cashback: 18,
    name: "Vitamin C Brightening Face Serum",
    rating: 4.9,
    reviewCount: 1580,
    price: 1190,
    oldPrice: 1800,
    discountPercent: 34,
    sold: 4520,
    stockLabel: "In Stock",
    stockVariant: "inStock",
    tag: "Top Rated",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    vendor: "GlowLab Cosmetics",
    cashback: 18,
    name: "Velvet Matte Lipstick Trio",
    rating: 4.8,
    reviewCount: 940,
    price: 1590,
    oldPrice: 2400,
    discountPercent: 34,
    sold: 2270,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Modern Clean Header with Action Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                All Products
              </h1>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                {allProducts.length} items
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Explore our entire collection of premium products and deals.
            </p>
          </div>

          {/* Controls Bar (Filter & Sort replacing the harsh HR line) */}
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900">
              <SlidersHorizontal className="h-3.5 w-3.5 text-gray-500" />
              Filter
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900">
              <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
              Sort by: Featured
            </button>
          </div>
        </div>

        {/* Subtle Divider Line */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}