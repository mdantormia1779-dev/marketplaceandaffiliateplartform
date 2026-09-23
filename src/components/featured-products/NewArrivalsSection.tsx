import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, type Product } from "./product-card";


const newArrivalProducts: Product[] = [
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
    id: "8",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    vendor: "StrideX Sportswear",
    cashback: 20,
    name: "Organic Cotton Essential T-Shirt",
    rating: 4.4,
    reviewCount: 410,
    price: 890,
    oldPrice: 1400,
    discountPercent: 36,
    sold: 1940,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    vendor: "HomeCraft Living",
    cashback: 14,
    name: "Handcrafted Ceramic Mug Set of 4",
    rating: 4.6,
    reviewCount: 320,
    price: 1450,
    oldPrice: 2200,
    discountPercent: 34,
    sold: 860,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    vendor: "LumenWorks",
    cashback: 16,
    name: "Smart LED Desk Lamp with Wireless Charger",
    rating: 4.3,
    reviewCount: 210,
    price: 2290,
    oldPrice: 3400,
    discountPercent: 33,
    sold: 640,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
  {
    id: "11",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    vendor: "UrbanCarry",
    cashback: 17,
    name: "Polarized UV400 Sunglasses",
    rating: 4.4,
    reviewCount: 290,
    price: 1690,
    oldPrice: 2600,
    discountPercent: 35,
    sold: 740,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
];

export default function NewArrivalsSection() {
  return (
    <section className="w-full py-10 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            {/* • JUST LANDED Badge */}
            <span className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              JUST LANDED
            </span>
            
            {/* Title & Description */}
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              New arrivals
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Fresh products added by verified suppliers this month.
            </p>
          </div>

          {/* Explore new -> Button */}
          <Link
            href="/products?filter=new-arrivals"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700 sm:text-sm"
          >
            Explore new <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {newArrivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}