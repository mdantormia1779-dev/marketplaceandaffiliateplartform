"use client";
import { useMemo, useState } from "react";
import { INITIAL_BRANDS } from "./data";
import { Brand, BrandStatus, Filters } from "./types";
import { usePagination } from "../shared/usePagination";

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [filters, setFilters] = useState<Filters>({ query: "", status: "All" });

  const rows = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return brands.filter(
      (b) =>
        (filters.status === "All" || b.status === filters.status) &&
        (!q || b.name.toLowerCase().includes(q) || b.company.toLowerCase().includes(q))
    );
  }, [brands, filters]);
  const pagination = usePagination(rows);

  const stats = useMemo(() => {
    const count = (s: BrandStatus) => brands.filter((b) => b.status === s).length;
    return {
      total: brands.length,
      active: count("Active"),
      pending: count("Pending"),
      products: brands.reduce((sum, b) => sum + b.products, 0),
    };
  }, [brands]);

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    pagination.setPage(1);
  };

  const setStatus = (id: string, status: BrandStatus) =>
    setBrands((list) => list.map((b) => (b.id === id ? { ...b, status } : b)));

  const remove = (id: string) => setBrands((list) => list.filter((b) => b.id !== id));

  // error message return kore, success hole null
  const add = (name: string, company: string): string | null => {
    const n = name.trim();
    if (!n) return "Enter a brand name.";
    if (brands.some((b) => b.name.toLowerCase() === n.toLowerCase())) return "A brand with this name already exists.";
    setBrands((list) => [
      ...list,
      {
        id: crypto.randomUUID(),
        name: n,
        company: company.trim() || n,
        products: 0,
        status: "Pending",
        created: new Date().toISOString().slice(0, 10),
      },
    ]);
    return null;
  };

  return { rows: pagination.rows, filtered: rows, pagination, stats, filters, updateFilters, setStatus, remove, add };
}