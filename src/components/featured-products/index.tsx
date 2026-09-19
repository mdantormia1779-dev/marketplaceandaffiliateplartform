
import { ArrowRight } from "lucide-react";
import { ProductCard, type Product } from "./product-card";

const products: Product[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
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
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
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
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
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
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
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
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
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

export default function FeaturedProducts() {
  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Handpicked
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Featured products</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Curated highlights from our most trusted suppliers this week.
            </p>
          </div>

          <a
            href="#"
            className="hidden items-center gap-1 text-sm font-medium text-indigo-600 hover:underline sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}