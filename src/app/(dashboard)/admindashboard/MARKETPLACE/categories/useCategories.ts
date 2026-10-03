"use client";
import { useMemo, useState } from "react";
import { INITIAL_CATEGORIES } from "./data";
import { slugify } from "./slugify";
import { Category, Filters } from "./types";
import { usePagination } from "../shared/usePagination";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [filters, setFilters] = useState<Filters>({ query: "", status: "All" });

  const rows = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return categories.filter(
      (c) =>
        (filters.status === "All" || c.status === filters.status) &&
        (!q || c.name.toLowerCase().includes(q) || c.slug.includes(q))
    );
  }, [categories, filters]);
  const pagination = usePagination(rows);

  const stats = useMemo(() => {
    const active = categories.filter((c) => c.status === "Active").length;
    return {
      total: categories.length,
      active,
      inactive: categories.length - active,
      products: categories.reduce((sum, c) => sum + c.products, 0),
    };
  }, [categories]);

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    pagination.setPage(1);
  };

  const toggleStatus = (id: string) =>
    setCategories((list) =>
      list.map((c) => (c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c))
    );

  const remove = (id: string) => setCategories((list) => list.filter((c) => c.id !== id));

  // error message return kore, success hole null
  const add = (name: string): string | null => {
    const slug = slugify(name);
    if (!slug) return "Enter a valid category name.";
    if (categories.some((c) => c.slug === slug)) return "A category with this name already exists.";
    setCategories((list) => [
      ...list,
      { id: crypto.randomUUID(), name: name.trim(), slug, products: 0, status: "Active", created: new Date().toISOString().slice(0, 10) },
    ]);
    return null;
  };

  return { rows: pagination.rows, filtered: rows, pagination, stats, filters, updateFilters, toggleStatus, remove, add };
}