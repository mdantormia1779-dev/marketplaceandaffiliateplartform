"use client";

import Image from "next/image";
import { Star, TrendingUp, Users, Link2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "../types";

const BADGE_CONFIG: Record<NonNullable<Product["badge"]>, { label: string }> = {
  "best-seller": { label: "Best Seller" },
  "high-commission": { label: "High Commission" },
  "high-conversion": { label: "High Conversion" },
};

interface ProductCardProps {
  product: Product;
  onGenerateLink?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onGenerateLink,
}: ProductCardProps) {
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Product Image & Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
        />

        {badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#10b981] px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm">
            <CheckCircle2 className="h-3 w-3 fill-white text-[#10b981]" />
            {badge.label}
          </span>
        )}

        <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-sm">
          {product.commissionRate}% commission
        </span>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-1 text-sm font-semibold text-slate-800">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">{product.category}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Star className="h-3.5 w-3.5 fill-[#10b981] text-[#10b981]" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              PRICE
            </span>
            <p className="text-base font-bold text-slate-900">
              ৳{product.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              EST. EARNINGS
            </span>
            <p className="text-base font-bold text-[#3b66f5]">
              ৳{product.estimatedEarnings.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
            {product.conversionRate}% conversion
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            {product.affiliatesCount.toLocaleString()} affiliates
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            onClick={() => onGenerateLink?.(product)}
            className="h-10 flex-[1.6] gap-1.5 rounded-lg bg-[#3b66f5] px-4 text-xs font-semibold text-white shadow-none hover:bg-[#2e55d9]"
          >
            <Link2 className="h-3.5 w-3.5 stroke-[2.5]" />
            Generate Link
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 flex-1 rounded-lg border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-none hover:bg-slate-50 hover:text-slate-900"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}