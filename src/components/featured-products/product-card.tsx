"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  image: string;
  vendor: string;
  cashback: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  oldPrice: number;
  discountPercent: number;
  sold: number;
  stockLabel: string;
  stockVariant: "inStock" | "lowStock";
  tag?: "Best Seller" | "Top Rated";
}

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group flex flex-col rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm transition-all hover:shadow-md">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f3efe9]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1 z-10">
          <Badge className="bg-[#ef4444] hover:bg-[#ef4444] text-white border-0 px-2 py-0.5 text-[11px] font-bold rounded-md">
            -{product.discountPercent}%
          </Badge>
          {product.tag && (
            <Badge className="bg-[#0f172a] hover:bg-[#0f172a] text-white border-0 px-2 py-0.5 text-[10px] font-semibold rounded-md">
              {product.tag}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setIsWishlisted((prev) => !prev)}
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-transform active:scale-95 hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 text-gray-600 transition-colors",
              isWishlisted && "fill-red-500 text-red-500"
            )}
          />
        </button>

        {/* Floating Hover Add to Cart Button */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <Button className="w-full h-8 gap-1.5 rounded-md bg-[#09090b] text-white hover:bg-[#18181b] text-xs font-medium shadow-md">
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-1.5 pt-2.5 px-0.5">
        {/* Vendor & Cashback */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 font-medium">{product.vendor}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[11px] font-medium text-[#137333]">
            <span className="text-[10px]">⟲</span> {product.cashback}%
          </span>
        </div>

        {/* Product Title */}
        <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-gray-900 min-h-[32px]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-[11px]">
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400" />
            ))}
          </div>
          <span className="font-semibold text-gray-800 ml-0.5">{product.rating}</span>
          <span className="text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-sm font-bold text-gray-900">
            ৳{product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-400 line-through">
            ৳{product.oldPrice.toLocaleString()}
          </span>
        </div>

        {/* Stock & Sold Info */}
        <div className="mt-auto flex items-center justify-between pt-1 text-[11px]">
          <span className="text-gray-400">{product.sold.toLocaleString()} sold</span>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 font-medium",
              product.stockVariant === "inStock"
                ? "bg-[#e6f4ea] text-[#137333]"
                : "bg-[#fef7e0] text-[#b06000]"
            )}
          >
            {product.stockLabel}
          </span>
        </div>
      </div>
    </div>
  );
}