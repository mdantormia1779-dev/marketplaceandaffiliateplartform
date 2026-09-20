"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

export interface Product {
  id: string;
  image: string;
  vendor: string;
  cashback?: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  sold: number;
  stockLabel?: string;
  stockVariant?: "inStock" | "lowStock" | "outOfStock";
  tag?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-xs transition-all hover:shadow-md">
      <div>
        {/* Image & Link Wrapper */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
          {product.discountPercent && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
              -{product.discountPercent}%
            </span>
          )}

          {/* Wishlist Heart Icon */}
          <button className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-xs transition hover:text-red-500">
            <Heart className="h-3.5 w-3.5" />
          </button>

          {product.tag && (
            <span className="absolute left-2 top-8 z-10 rounded-md bg-slate-900/80 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
              {product.tag}
            </span>
          )}

          <Link href={`/products/${product.id}`} className="block h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Vendor & Cashback */}
        <div className="mt-2.5 flex items-center justify-between">
          <p className="text-[11px] font-medium text-gray-500">{product.vendor}</p>
          {product.cashback && (
            <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
              ⚡ {product.cashback}%
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 text-xs font-semibold text-gray-900 line-clamp-2 transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Review */}
        <div className="mt-2 flex items-center text-[11px]">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="ml-1.5 font-bold text-gray-800">{product.rating}</span>
          <span className="ml-0.5 text-gray-400">({product.reviewCount})</span>
        </div>
      </div>

      {/* Price & Stock info */}
      <div className="mt-3 border-t border-gray-50 pt-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-extrabold text-gray-900">
            ৳{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-gray-400 line-through">
              ৳{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between text-[10px]">
          <span className="text-gray-400">{product.sold} sold</span>
          {product.stockLabel && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-600">
              {product.stockLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}