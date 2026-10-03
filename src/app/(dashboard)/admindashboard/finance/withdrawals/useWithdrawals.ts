"use client";

import { useMemo, useState } from "react";
import { INITIAL_WITHDRAWALS, rawStats } from "./data";
import { Filters, Withdrawal, WithdrawalStatus } from "./types";

const EMPTY_FILTERS: Filters = { query: "", status: "All", type: "All" };

export function useWithdrawals() {
  const [rows, setRows] = useState<Withdrawal[]>(INITIAL_WITHDRAWALS);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return rows.filter((w) => {
      const matchesQuery = !query || w.requester.toLowerCase().includes(query) || w.id.toLowerCase().includes(query);
      const matchesStatus = filters.status === "All" || w.status === filters.status;
      const matchesType = filters.type === "All" || w.type === filters.type;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [rows, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  const setPageSafe = (next: number) => {
    setPage(Math.min(Math.max(1, next), pageCount));
  };

  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const setStatus = (id: string, status: WithdrawalStatus) => {
    setRows((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
  };

  const stats = rawStats(rows);

  return {
    stats,
    filters,
    updateFilters,
    rows: filtered.slice(start, end),
    filtered,
    page: safePage,
    pageCount,
    pageSize,
    setPage: setPageSafe,
    setPageSize: (n: number) => {
      setPageSize(n);
      setPage(1);
    },
    from: filtered.length === 0 ? 0 : start + 1,
    to: Math.min(end, filtered.length),
    setStatus,
  };
}
