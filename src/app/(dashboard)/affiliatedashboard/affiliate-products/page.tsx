"use client";

import { useMemo, useState } from "react";
import PageHeader from "./components/PageHeader";
import ProductFilters from "./components/ProductFilters";
import ProductGrid from "./components/ProductGrid";
import GenerateLinkModal from "./components/GenerateLinkModal";
import { products } from "./data";
import { Product } from "./types";

export default function AffiliateProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [commission, setCommission] = useState("all");
  const [price, setPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [isNewOnly, setIsNewOnly] = useState(false);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (commission !== "all") {
      const minComm = Number(commission);
      result = result.filter((p) => p.commissionRate >= minComm);
    }

    if (price !== "all") {
      if (price === "0-1000") result = result.filter((p) => p.price <= 1000);
      else if (price === "1000-3000")
        result = result.filter((p) => p.price > 1000 && p.price <= 3000);
      else if (price === "3000+") result = result.filter((p) => p.price > 3000);
    }

    if (isNewOnly) {
      result = result.slice(0, 5);
    }

    if (sortBy === "popularity") {
      result.sort((a, b) => b.affiliatesCount - a.affiliatesCount);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "commission") {
      result.sort((a, b) => b.commissionRate - a.commissionRate);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, commission, price, sortBy, isNewOnly]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <PageHeader />

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        selectedCategory={category}
        onCategoryChange={setCategory}
        selectedCommission={commission}
        onCommissionChange={setCommission}
        selectedPrice={price}
        onPriceChange={setPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isNewOnly={isNewOnly}
        onToggleNewOnly={() => setIsNewOnly((prev) => !prev)}
        totalCount={products.length}
        filteredCount={filteredProducts.length}
      />

      <ProductGrid
        products={filteredProducts}
        onGenerateLink={handleOpenModal}
      />

      <GenerateLinkModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}