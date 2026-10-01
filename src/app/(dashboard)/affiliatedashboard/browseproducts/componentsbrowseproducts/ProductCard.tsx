import { Star, TrendingUp, Users2, Link2 } from "lucide-react";
import ProductBadge from "./ProductBadge";
import CommissionBadge from "./CommissionBadge";
import type { Product } from "./types";

type ProductCardProps = {
  product: Product;
  onGenerateLink: (product: Product) => void;
  onViewDetails: (product: Product) => void;
};

export default function ProductCard({ product, onGenerateLink, onViewDetails }: ProductCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      {/* Image + overlay badges */}
      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-3 top-3">
          {product.badge ? <ProductBadge label={product.badge} /> : null}
        </div>

        <div className="absolute right-3 top-3">
          <CommissionBadge percent={product.commissionPercent} />
        </div>
      </div>

      {/* Title + rating */}
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900">
          {product.name}
        </h3>
        <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-gray-700">
          <Star className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
          {product.rating}
        </span>
      </div>
      <p className="mb-3 text-xs text-gray-400">{product.category}</p>

      {/* Price + earnings */}
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-gray-400">
            Price
          </p>
          <p className="font-semibold text-gray-900">
            ৳{product.price.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide text-gray-400">
            Est. Earnings
          </p>
          <p className="font-semibold text-indigo-600">
            ৳{product.estEarnings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Conversion + affiliates */}
      <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          {product.conversionPercent}% conversion
        </span>
        <span className="flex items-center gap-1">
          <Users2 className="h-3.5 w-3.5" />
          {product.affiliatesCount.toLocaleString()} affiliates
        </span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2">
        <button
          onClick={() => onGenerateLink(product)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          <Link2 className="h-3.5 w-3.5" />
          Generate Link
        </button>
        <button
          onClick={() => onViewDetails(product)}
          className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
