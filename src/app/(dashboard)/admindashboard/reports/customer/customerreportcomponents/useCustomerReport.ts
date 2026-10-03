"use client";

import { useMemo, useState } from "react";
import { getCustomers, getLatestLabel, getMonths, getRepeatRate, getSegments, getTrends } from "./data";
import { CustomerStatus, Period, Segment, Sort, SortKey } from "./types";

export function useCustomerReport() {
  const [period, setPeriodState] = useState<Period>("Last 30 days");
  const [query, setQueryState] = useState("");
  const [segment, setSegmentState] = useState<Segment | "All">("All");
  const [status, setStatusState] = useState<CustomerStatus | "All">("All");
  const [sort, setSort] = useState<Sort>({ key: null, dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const months = useMemo(() => getMonths(period), [period]);
  const segments = useMemo(() => getSegments(period), [period]);
  const customers = useMemo(() => getCustomers(period), [period]);
  const trends = getTrends(period);
  const latestLabel = getLatestLabel(period);

  const stats = useMemo(() => {
    const last = months[months.length - 1];
    return {
      total: segments.reduce((s, x) => s + x.count, 0),
      newCustomers: last ? last.newCustomers : 0,
      returning: last ? last.returning : 0,
      repeat: getRepeatRate(period),
    };
  }, [months, segments, period]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = customers.filter(
      (c) =>
        (segment === "All" || c.segment === segment) &&
        (status === "All" || c.status === status) &&
        (!q || c.name.toLowerCase().includes(q))
    );
    const key = sort.key;
    if (!key) return list;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => (key === "name" ? a.name.localeCompare(b.name) : a[key] - b[key]) * dir);
  }, [customers, query, segment, status, sort]);

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
  const setSegment = (s: Segment | "All") => {
    setSegmentState(s);
    setPage(1);
  };
  const setStatus = (s: CustomerStatus | "All") => {
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
    segment,
    setSegment,
    status,
    setStatus,
    sort,
    toggleSort,
    months,
    segments,
    visible,
    tableRows,
    stats,
    trends,
    latestLabel,
    page: current,
    pageCount,
    pageSize,
    setPage,
    setPageSize,
    from: visible.length ? startIndex + 1 : 0,
    to: Math.min(startIndex + pageSize, visible.length),
  };
}
