"use client";
import { useMemo, useState } from "react";
import { BASE_OFFSET, INITIAL_REVIEWS } from "./data";
import { Filters, Review, ReviewStatus } from "./types";
import { usePagination } from "../shared/usePagination";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filters, setFilters] = useState<Filters>({ query: "", status: "All" });

  const rows = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return reviews.filter(
      (r) =>
        (filters.status === "All" || r.status === filters.status) &&
        (!q || [r.title, r.product, r.customer].some((v) => v.toLowerCase().includes(q)))
    );
  }, [reviews, filters]);
  const pagination = usePagination(rows);

  const stats = useMemo(() => {
    const count = (s: ReviewStatus) => reviews.filter((r) => r.status === s).length + BASE_OFFSET[s];
    const pending = count("Pending");
    const approved = count("Approved");
    const hidden = count("Hidden");
    return { total: pending + approved + hidden, pending, approved, hidden };
  }, [reviews]);

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    pagination.setPage(1);
  };

  const setStatus = (id: string, status: ReviewStatus) =>
    setReviews((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));

  const remove = (id: string) => setReviews((list) => list.filter((r) => r.id !== id));

  return { rows: pagination.rows, filtered: rows, pagination, stats, filters, updateFilters, setStatus, remove };
}