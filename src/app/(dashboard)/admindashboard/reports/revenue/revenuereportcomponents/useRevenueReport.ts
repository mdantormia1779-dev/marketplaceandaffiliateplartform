"use client";

import { useMemo, useState } from "react";
import { getCategories, getMonths, getTrends } from "./data";
import { Category, Period, Sort, SortKey } from "./types";

export function useRevenueReport() {
  const [period, setPeriodState] = useState<Period>("Last 30 days");
  const [query, setQueryState] = useState("");
  const [sort, setSort] = useState<Sort>({ key: "revenue", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const months = useMemo(() => getMonths(period), [period]);
  const categories = useMemo(() => getCategories(period), [period]);
  const trends = getTrends(period);

  const stats = useMemo(() => {
    const sum = (k: "marketplace" | "subscriptions" | "joining") => months.reduce((s, m) => s + m[k], 0);
    const marketplace = sum("marketplace");
    const subscriptions = sum("subscriptions");
    const joining = sum("joining");
    return { gross: marketplace + subscriptions + joining, marketplace, subscriptions, joining };
  }, [months]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const dir = sort.dir === "asc" ? 1 : -1;
    const val = (c: Category) => (sort.key === "name" ? c.name.toLowerCase() : c[sort.key]);

    return categories
      .filter((c) => !q || c.name.toLowerCase().includes(q))
      .sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * dir);
  }, [categories, query, sort]);

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
    sort,
    toggleSort,
    months,
    categories,
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
