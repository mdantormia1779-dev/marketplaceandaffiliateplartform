"use client";

import { BadgeCheck, Link2, Star, TrendingUp, Users2 } from "lucide-react";
import Modal from "./Modal";
import ProductBadge from "./ProductBadge";
import type { Product } from "./types";

type ProductDetailsModalProps = {
  product: Product;
  onClose: () => void;
  onGenerateLink: (product: Product) => void;
};

export default function ProductDetailsModal({
  product,
  onClose,
  onGenerateLink,
}: ProductDetailsModalProps) {
  return (
    <Modal
      title="Product Details"
      subtitle="Everything you need before you start promoting."
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => onGenerateLink(product)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Link2 className="h-4 w-4" />
            Generate Link
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full rounded-xl object-cover sm:w-40"
        />
        <div className="flex-1">
          {product.badge ? <ProductBadge label={product.badge} /> : null}
          <h3 className="mt-2 text-base font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.category}</p>
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
              {product.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users2 className="h-3.5 w-3.5" />
              {product.affiliatesCount.toLocaleString()} affiliates
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-[11px] uppercase tracking-wide text-gray-400">Price</p>
          <p className="text-lg font-semibold text-gray-900">৳{product.price.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="text-[11px] uppercase tracking-wide text-emerald-600">Commission</p>
          <p className="text-lg font-semibold text-emerald-600">{product.commissionPercent}%</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-gray-900">Why promote this product</p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 shrink-0 text-indigo-500" />
            {product.conversionPercent}% conversion rate across the marketplace
          </li>
          <li className="flex items-center gap-2">
            <Users2 className="h-4 w-4 shrink-0 text-indigo-500" />
            {product.affiliatesCount.toLocaleString()} affiliates already promoting this product
          </li>
          <li className="flex items-center gap-2">
            <Link2 className="h-4 w-4 shrink-0 text-indigo-500" />
            Earn ৳{product.estEarnings.toLocaleString()} per confirmed sale at {product.commissionPercent}% commission
          </li>
          <li className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 shrink-0 text-indigo-500" />
            Top-rated product with excellent verified buyer reviews
          </li>
        </ul>
      </div>
    </Modal>
  );
}
