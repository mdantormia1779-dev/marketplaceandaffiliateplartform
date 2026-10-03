"use client";

import { useMemo, useState } from "react";
import { INITIAL_TRANSACTIONS, OFFSET, rawStats } from "./data";
import { Filters, Transaction, TxStatus } from "./types";

export function useTransactions() {
  const [list, setList] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [filters, setFilters] = useState<Filters>({ query: "", type: "All", status: "All" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const sorted = useMemo(
    () => [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
    [list]
  );

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return sorted.filter(
      (t) =>
        (filters.type === "All" || t.type === filters.type) &&
        (filters.status === "All" || t.status === filters.status) &&
        (!q || [t.id, t.reference, t.party, t.type, t.method].some((v) => v.toLowerCase().includes(q)))
    );
  }, [sorted, filters]);

  const stats = useMemo(() => {
    const r = rawStats(list);
    return {
      today: r.today + OFFSET.today,
      gross: r.gross + OFFSET.gross,
      completed: r.completed + OFFSET.completed,
      failed: r.failed + OFFSET.failed,
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

  const setStatus = (id: string, status: TxStatus) =>
    setList((l) => l.map((t) => (t.id === id ? { ...t, status } : t)));

  return {
    rows,
    all: sorted,
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
