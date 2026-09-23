import Link from "next/link";
import { ArrowRight, LayoutGrid, Sparkles } from "lucide-react";
import { ProductCard, type Product } from "./product-card";

// Dynamic props type definition
export interface ProductSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  browseMoreText?: string;
  browseMoreHref?: string;
  productsList?: Product[];
  showBottomBanner?: boolean;
}


const defaultProducts: Product[] = [
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

export default function FeaturedProducts({
  badge = "RECOMMENDED",
  title = "You may also like",
  subtitle = "Similar products shoppers often compare with this one.",
  browseMoreText = "Browse more",
  browseMoreHref = "/products",
  productsList = defaultProducts,
  showBottomBanner = true,
}: ProductSectionProps) {
  return (
    <section className="w-full py-10 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            {badge && (
              <span className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {badge}
              </span>
            )}
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
            )}
          </div>

          {/* Browse More Button */}
          <Link
            href={browseMoreHref}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700 sm:text-sm"
          >
            {browseMoreText} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        {showBottomBanner && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#F8FAFC]/80 p-5 sm:flex-row sm:px-8">
            <div>
              <h4 className="text-xs font-bold text-gray-900 sm:text-sm">
                Looking for something specific?
              </h4>
              <p className="mt-0.5 text-xs text-gray-500">
                Browse the full marketplace or let affiliates help you find the best deal.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/marketplace"
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50"
              >
                <LayoutGrid className="h-3.5 w-3.5 text-gray-500" />
                View Marketplace
              </Link>

              <Link
                href="/affiliate"
                className="flex items-center gap-1.5 rounded-xl bg-[#00A76F] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#008f5d] active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 text-white" />
                Earn as Affiliate
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}