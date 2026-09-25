"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./componentsbrowseproducts/ProductGrid";
import { PRODUCTS } from "./componentsbrowseproducts/productsData";
import ProductsFilterBar from "./componentsbrowseproducts/ProductsFilterBar";
import ProductsHeader from "./componentsbrowseproducts/ProductsHeader";
import GenerateLinkModal from "./componentsbrowseproducts/GenerateLinkModal";
import ProductDetailsModal from "./componentsbrowseproducts/ProductDetailsModal";
import {
  CATEGORY_OPTIONS,
  COMMISSION_OPTIONS,
  PRICE_RANGE_OPTIONS,
  SORT_OPTIONS,
  filterAndSortProducts,
  type CategoryOption,
  type CommissionOption,
  type PriceRangeOption,
  type SortOption,
} from "./componentsbrowseproducts/filters";
import type { Product } from "./componentsbrowseproducts/types";

export default function BrowseProductsPage() {
  // Filter + sort state, all lifted here so ProductGrid always renders
  // whatever ProductsFilterBar's controls currently say. Each useState is
  // explicitly typed to the option union - otherwise TS would narrow to the
  // literal type of CATEGORY_OPTIONS[0] and reject later setCategory calls.
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryOption>(CATEGORY_OPTIONS[0]);
  const [commission, setCommission] = useState<CommissionOption>(COMMISSION_OPTIONS[0]);
  const [priceRange, setPriceRange] = useState<PriceRangeOption>(PRICE_RANGE_OPTIONS[0]);
  const [sort, setSort] = useState<SortOption>(SORT_OPTIONS[0]);
  const [newOnly, setNewOnly] = useState(false);

  // Which modal (if any) is open, and for which product.
  const [linkProduct, setLinkProduct] = useState<Product | null>(null);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(PRODUCTS, {
        query,
        category,
        commission,
        priceRange,
        sort,
        newOnly,
      }),
    [query, category, commission, priceRange, sort, newOnly]
  );

  return (
    <div className="space-y-6">
      <ProductsHeader />

      <ProductsFilterBar
        totalCount={PRODUCTS.length}
        shownCount={filteredProducts.length}
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        commission={commission}
        onCommissionChange={setCommission}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sort={sort}
        onSortChange={setSort}
        newOnly={newOnly}
        onToggleNewOnly={() => setNewOnly((value) => !value)}
      />

      <ProductGrid
        products={filteredProducts}
        onGenerateLink={setLinkProduct}
        onViewDetails={setDetailsProduct}
      />

      {detailsProduct ? (
        <ProductDetailsModal
          product={detailsProduct}
          onClose={() => setDetailsProduct(null)}
          onGenerateLink={(product) => {
            // Swap details modal for the link modal on the same product.
            setDetailsProduct(null);
            setLinkProduct(product);
          }}
        />
      ) : null}

      {linkProduct ? (
        <GenerateLinkModal product={linkProduct} onClose={() => setLinkProduct(null)} />
      ) : null}
    </div>
  );
}
