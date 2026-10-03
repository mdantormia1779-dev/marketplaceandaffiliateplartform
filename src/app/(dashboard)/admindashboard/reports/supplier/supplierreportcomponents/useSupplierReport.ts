"use client";

import { useMemo, useState } from "react";
import { getMonths, getSuppliers, getTrends } from "./data";
import { Period, Sort, SortKey, Supplier, SupplierStatus } from "./types";

export function useSupplierReport() {
  const [period, setPeriodState] = useState<Period>("Last 30 days");
  const [query, setQueryState] = useState("");
  const [status, setStatusState] = useState<SupplierStatus | "All">("All");
  const [sort, setSort] = useState<Sort>({ key: "payouts", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const months = useMemo(() => getMonths(period), [period]);
  const suppliers = useMemo(() => getSuppliers(period), [period]);
  const trends = getTrends(period);

  const stats = useMemo(() => {
    const orders = months.reduce((s, m) => s + m.orders, 0);
    const payouts = months.reduce((s, m) => s + m.payouts, 0);
    const avgFillRate = suppliers.reduce((s, sItem) => s + sItem.fillRate, 0) / Math.max(suppliers.length, 1);
    const active = suppliers.filter((sItem) => sItem.status === "Active").length;
    return { suppliers: active, orders, fillRate: avgFillRate, payouts };
  }, [months, suppliers]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const dir = sort.dir === "asc" ? 1 : -1;
    const val = (s: Supplier) => (sort.key === "name" ? s.name.toLowerCase() : s[sort.key]);

    return suppliers
      .filter((s) => (status === "All" || s.status === status) && (!q || s.name.toLowerCase().includes(q)))
      .sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * dir);
  }, [suppliers, query, status, sort]);

  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const current = Math.min(page, pageCount);
  const startIndex = (current - 1) * pageSize;
  const tableRows = visible.slice(startIndex, startIndex + pageSize);

  const setPeriod = (p: Period) => {
    setPeriodState(p);
    setPage(1);
  };

  const setQuery = (q: string) => {
    setQueryState(q);
    setPage(1);
  };

  const setStatus = (s: SupplierStatus | "All") => {
    setStatusState(s);
    setPage(1);
  };

  const setPageSize = (n: number) => {
    setPageSizeState(n);
    setPage(1);
  };

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "name" ? "asc" : "desc" }
    );

  return {
    period,
    setPeriod,
    query,
    setQuery,
    status,
    setStatus,
    sort,
    toggleSort,
    months,
    visible,
    tableRows,
    stats,
    trends,
    page: current,
    pageCount,
    pageSize,
    setPage,
    setPageSize,
    from: visible.length ? startIndex + 1 : 0,
    to: Math.min(startIndex + pageSize, visible.length),
  };
}
