"use client";

import { useMemo, useState } from "react";
import { AFFILIATE_OFFSET, COMMISSION_OFFSET, getAffiliates, getFactor, getMonths, getTrends } from "./data";
import { Affiliate, AffiliateStatus, Period, Sort, SortKey } from "./types";

export function useAffiliateReport() {
  const [period, setPeriodState] = useState<Period>("Last 30 days");
  const [query, setQueryState] = useState("");
  const [status, setStatusState] = useState<AffiliateStatus | "All">("All");
  const [sort, setSort] = useState<Sort>({ key: "revenue", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const months = useMemo(() => getMonths(period), [period]);
  const affiliates = useMemo(() => getAffiliates(period), [period]);
  const trends = getTrends(period);

  const stats = useMemo(() => {
    const clicks = months.reduce((s, m) => s + m.clicks, 0);
    const conversions = months.reduce((s, m) => s + m.conversions, 0);
    const commission =
      affiliates.reduce((s, a) => s + a.commission, 0) + Math.round(COMMISSION_OFFSET * getFactor(period));
    const active = affiliates.filter((a) => a.status === "Active").length;
    return { affiliates: active + AFFILIATE_OFFSET, clicks, conversions, commission };
  }, [months, affiliates, period]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const dir = sort.dir === "asc" ? 1 : -1;
    const val = (a: Affiliate) => (sort.key === "name" ? a.name.toLowerCase() : a[sort.key]);

    return affiliates
      .filter((a) => (status === "All" || a.status === status) && (!q || a.name.toLowerCase().includes(q)))
      .sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * dir);
  }, [affiliates, query, status, sort]);

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

  const setStatus = (s: AffiliateStatus | "All") => {
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
