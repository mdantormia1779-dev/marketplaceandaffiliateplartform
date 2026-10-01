import ProductCard from "./ProductCard";
import type { Product } from "./types";

type ProductGridProps = {
  products: Product[];
  onGenerateLink: (product: Product) => void;
  onViewDetails: (product: Product) => void;
};

export default function ProductGrid({ products, onGenerateLink, onViewDetails }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        No products match your filters. Try clearing a filter or searching for something else.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onGenerateLink={onGenerateLink}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
