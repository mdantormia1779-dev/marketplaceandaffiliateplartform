"use client";
import { useMemo, useState } from "react";
import { INITIAL_PRODUCTS } from "./data";
import { Filters, Product, ProductStatus } from "./types";
import { usePagination } from "./usePagination";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filters, setFilters] = useState<Filters>({ query: "", status: "All", category: "All" });
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))).sort(), [products]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (filters.status === "All" || p.status === filters.status) &&
        (filters.category === "All" || p.category === filters.category) &&
        (!q || [p.name, p.sku, p.supplier].some((v) => v.toLowerCase().includes(q)))
    );
  }, [products, filters]);

  const stats = useMemo(() => {
    const count = (s: ProductStatus) => products.filter((p) => p.status === s).length;
    return { total: products.length, pending: count("Pending"), approved: count("Approved"), rejected: count("Rejected") };
  }, [products]);

  const pagination = usePagination(filtered);

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    pagination.setPage(1);
  };
  const setStatus = (id: string, status: ProductStatus) =>
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, status } : p)));
  const remove = (id: string) => setProducts((list) => list.filter((p) => p.id !== id));
  const add = (p: Omit<Product, "id" | "status" | "submitted">) =>
    setProducts((list) => [
      { ...p, id: crypto.randomUUID(), status: "Pending", submitted: new Date().toISOString().slice(0, 10) },
      ...list,
    ]);

  return { rows: pagination.rows, filtered, stats, categories, filters, updateFilters, pagination, setStatus, remove, add };
}