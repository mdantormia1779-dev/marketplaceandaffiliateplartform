"use client";
import { useMemo, useState } from "react";
import { INITIAL_FEATURED, TODAY } from "./data";
import { addDays, getStatus } from "./status";
import { Featured, FeaturedView, Filters } from "./types";
import { usePagination } from "../shared/usePagination";

export function useFeatured() {
  const [items, setItems] = useState<Featured[]>(INITIAL_FEATURED);
  const [filters, setFilters] = useState<Filters>({ query: "", status: "All", placement: "All" });

  const all: FeaturedView[] = useMemo(
    () => items.map((f) => ({ ...f, status: getStatus(f.start, f.end) })),
    [items]
  );

  const rows = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return all.filter(
      (f) =>
        (filters.status === "All" || f.status === filters.status) &&
        (filters.placement === "All" || f.placement === filters.placement) &&
        (!q || f.product.toLowerCase().includes(q) || f.supplier.toLowerCase().includes(q))
    );
  }, [all, filters]);
  const pagination = usePagination(rows);

  const stats = useMemo(() => {
    const count = (s: string) => all.filter((f) => f.status === s).length;
    return { slots: all.length, active: count("Active"), scheduled: count("Scheduled"), expired: count("Expired") };
  }, [all]);

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    pagination.setPage(1);
  };

  // Active placement aajkei shesh kore dey (kal porjonto)
  const endNow = (id: string) =>
    setItems((list) =>
      list.map((f) => {
        if (f.id !== id) return f;
        const end = addDays(TODAY, -1);
        return { ...f, end, start: f.start > end ? end : f.start };
      })
    );

  // Expired placement aaj theke 30 din er jonno abar chalu kore
  const renew = (id: string) =>
    setItems((list) => list.map((f) => (f.id === id ? { ...f, start: TODAY, end: addDays(TODAY, 30) } : f)));

  const remove = (id: string) => setItems((list) => list.filter((f) => f.id !== id));

  // error message return kore, success hole null
  const add = (data: Omit<Featured, "id">): string | null => {
    if (!data.product.trim()) return "Enter a product name.";
    if (data.end < data.start) return "End date must be on or after the start date.";
    setItems((list) => [...list, { ...data, product: data.product.trim(), supplier: data.supplier.trim(), id: crypto.randomUUID() }]);
    return null;
  };

  return { rows: pagination.rows, filtered: rows, pagination, stats, filters, updateFilters, endNow, renew, remove, add };
}