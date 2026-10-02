"use client";

import { useMemo, useState } from "react";
import { INITIAL_REFUNDS, OFFSET, TOTAL_ORDERS, rawStats } from "./data";
import { Filters, Refund, RefundStatus } from "./types";

export function useRefunds() {
  const [list, setList] = useState<Refund[]>(INITIAL_REFUNDS);
  const [filters, setFilters] = useState<Filters>({ query: "", status: "All", method: "All" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return list.filter(
      (r) =>
        (filters.status === "All" || r.status === filters.status) &&
        (filters.method === "All" || r.method === filters.method) &&
        (!q || [r.order, r.customer, r.id].some((v) => v.toLowerCase().includes(q)))
    );
  }, [list, filters]);

  const stats = useMemo(() => {
    const r = rawStats(list);
    const refundCount = Math.max(0, r.refundCount + OFFSET.refundCount);
    return {
      open: Math.max(0, r.open + OFFSET.open),
      refundedAmount: Math.max(0, r.refundedAmount + OFFSET.refundedAmount),
      approved: Math.max(0, r.approved + OFFSET.approved),
      rate: (refundCount / TOTAL_ORDERS) * 100,
    };
  }, [list]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const startIndex = (current - 1) * pageSize;
  const rows = filtered.slice(startIndex, startIndex + pageSize);

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };

  const setPageSize = (n: number) => {
    setPageSizeState(n);
    setPage(1);
  };

  const setStatus = (id: string, status: RefundStatus) =>
    setList((l) => l.map((r) => (r.id === id ? { ...r, status } : r)));

  return {
    rows,
    filtered,
    stats,
    filters,
    updateFilters,
    setStatus,
    page: current,
    pageCount,
    pageSize,
    setPage,
    setPageSize,
    from: filtered.length ? startIndex + 1 : 0,
    to: Math.min(startIndex + pageSize, filtered.length),
  };
}
