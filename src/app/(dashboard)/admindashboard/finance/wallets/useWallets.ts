"use client";

import { useMemo, useState } from "react";
import { INITIAL_WALLETS, OFFSET, rawStats } from "./data";
import { AdjustMode, Filters, Wallet } from "./types";

export function useWallets() {
  const [wallets, setWallets] = useState<Wallet[]>(INITIAL_WALLETS);
  const [filters, setFilters] = useState<Filters>({ query: "", type: "All", status: "All" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return wallets.filter(
      (w) =>
        (filters.type === "All" || w.type === filters.type) &&
        (filters.status === "All" || w.status === filters.status) &&
        (!q || w.owner.toLowerCase().includes(q) || w.id.toLowerCase().includes(q))
    );
  }, [wallets, filters]);

  const stats = useMemo(() => {
    const r = rawStats(wallets);
    return {
      balance: r.balance + OFFSET.balance,
      pending: r.pending + OFFSET.pending,
      affiliates: r.affiliates + OFFSET.affiliates,
      frozen: r.frozen + OFFSET.frozen,
    };
  }, [wallets]);

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

  const toggleFreeze = (id: string) =>
    setWallets((list) => list.map((w) => (w.id === id ? { ...w, status: w.status === "Active" ? "Frozen" : "Active" } : w)));

  const adjust = (id: string, mode: AdjustMode, amount: number): string | null => {
    const w = wallets.find((x) => x.id === id);
    if (!w) return "Select a wallet.";
    if (!(amount > 0)) return "Enter an amount greater than zero.";
    if (w.status === "Frozen") return "This wallet is frozen. Unfreeze it before adjusting the balance.";
    if (mode === "Debit" && amount > w.balance) return "Debit is more than the available balance.";
    setWallets((list) =>
      list.map((x) => (x.id === id ? { ...x, balance: x.balance + (mode === "Credit" ? amount : -amount) } : x))
    );
    return null;
  };

  return {
    rows,
    wallets,
    filtered,
    stats,
    filters,
    updateFilters,
    toggleFreeze,
    adjust,
    page: current,
    pageCount,
    pageSize,
    setPage,
    setPageSize,
    from: filtered.length ? startIndex + 1 : 0,
    to: Math.min(startIndex + pageSize, filtered.length),
  };
}
