"use client";

import { useMemo, useState } from "react";
import { getGrowth, getRows, getTrends } from "./data";
import { MonthRow, Period, Sort, SortKey } from "./types";

export function useSales() {
  const [period, setPeriodState] = useState<Period>("Last 30 days");
  const [query, setQueryState] = useState("");
  const [sort, setSort] = useState<Sort>({ key: "month", dir: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const rows = useMemo(() => getRows(period), [period]);
  const trends = getTrends(period);
  const stats = useMemo(() => {
    const sales = rows.reduce((sum, row) => sum + row.revenue, 0);
    const orders = rows.reduce((sum, row) => sum + row.orders, 0);
    return { sales, orders, aov: orders ? sales / orders : 0, growth: getGrowth(period) };
  }, [rows, period]);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const direction = sort.dir === "asc" ? 1 : -1;
    const value = (row: MonthRow) => (sort.key === "month" ? row.index : row[sort.key]);
    return rows
      .filter((row) => !normalizedQuery || row.month.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => (value(a) - value(b)) * direction);
  }, [rows, query, sort]);

  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * pageSize;
  const tableRows = visible.slice(startIndex, startIndex + pageSize);

  const setPeriod = (next: Period) => {
    setPeriodState(next);
    setPage(1);
  };
  const setQuery = (next: string) => {
    setQueryState(next);
    setPage(1);
  };
  const setPageSize = (size: number) => {
    setPageSizeState(size);
    setPage(1);
  };
  const toggleSort = (key: SortKey) =>
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "month" ? "asc" : "desc" }
    );

  return {
    period,
    setPeriod,
    query,
    setQuery,
    sort,
    toggleSort,
    rows,
    visible,
    tableRows,
    stats,
    trends,
    page: currentPage,
    pageCount,
    pageSize,
    setPage,
    setPageSize,
    from: visible.length ? startIndex + 1 : 0,
    to: Math.min(startIndex + pageSize, visible.length),
  };
}
