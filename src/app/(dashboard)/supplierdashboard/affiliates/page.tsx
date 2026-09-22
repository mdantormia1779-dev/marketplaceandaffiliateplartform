"use client";

import { useMemo, useState } from "react";
import PageHeader from "./components/PageHeader";
import StatCards from "./components/StatCards";
import TopAffiliates from "./components/TopAffiliates";
import CommissionOverview from "./components/CommissionOverview";
import StatusFilterTabs from "./components/StatusFilterTabs";
import AffiliateToolbar from "./components/AffiliateToolbar";
import AffiliateTable from "./components/AffiliateTable";
import Pagination from "./components/Pagination";
import {
  AFFILIATES,
  CAMPAIGNS,
  PRODUCT_OPTIONS,
  SORT_OPTIONS,
  type AffiliateStatus,
} from "./components/data";

type TabKey = "all" | AffiliateStatus;

const PAGE_SIZE = 8;

export default function AffiliatesPage() {
  const [range, setRange] = useState("30 days");
  const [status, setStatus] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState("All products");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const base: Record<TabKey, number> = { all: AFFILIATES.length, active: 0, pending: 0, paused: 0 };
    AFFILIATES.forEach((a) => (base[a.status] += 1));
    return base;
  }, []);

  const totals = useMemo(() => {
    const clicks = AFFILIATES.reduce((s, a) => s + a.clicks, 0);
    const orders = AFFILIATES.reduce((s, a) => s + a.orders, 0);
    const commission = AFFILIATES.reduce((s, a) => s + a.commissionEarned, 0);
    return { clicks, orders, commission };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = AFFILIATES.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (product !== "All products" && !a.products.includes(product)) return false;
      if (q && !`${a.name} ${a.email}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Most orders":
        sorted.sort((a, b) => b.orders - a.orders);
        break;
      case "Most clicks":
        sorted.sort((a, b) => b.clicks - a.clicks);
        break;
      case "Newest":
        sorted.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
        break;
      default:
        sorted.sort((a, b) => b.commissionEarned - a.commissionEarned);
    }
    return sorted;
  }, [status, query, product, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <PageHeader range={range} onRangeChange={setRange} />

      <StatCards
        activeCount={counts.active}
        clicks={totals.clicks}
        orders={totals.orders}
        commission={totals.commission}
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <TopAffiliates affiliates={AFFILIATES} />
        <CommissionOverview campaigns={CAMPAIGNS} />
      </div>

      <StatusFilterTabs
        counts={counts}
        active={status}
        onChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
      />

      <AffiliateToolbar
        query={query}
        onQueryChange={resetPage(setQuery)}
        product={product}
        onProductChange={resetPage(setProduct)}
        productOptions={PRODUCT_OPTIONS}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      <AffiliateTable affiliates={visible} />

      <Pagination
        page={current}
        pageCount={pageCount}
        onPageChange={setPage}
        totalCount={filtered.length}
        pageSize={PAGE_SIZE}
        shownCount={visible.length}
      />
    </div>
  );
}