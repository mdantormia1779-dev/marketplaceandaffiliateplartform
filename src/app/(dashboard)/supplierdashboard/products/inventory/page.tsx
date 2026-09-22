"use client";

import { useMemo, useState } from "react";

import {
  TopHeader,
  OverviewHeader,
  StatsGrid,
  AlertsSection,
  FilterTabs,
  Toolbar,
  ProductsTable,
  Pagination,
  PRODUCTS,
  statusOf,
  SORTS,
  PAGE_SIZE,
} from "./inventorycomponent";
import type { Product, StockStatus } from "./inventorycomponent/types";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [tab, setTab] = useState<"all" | StockStatus>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [warehouse, setWarehouse] = useState("All warehouses");
  const [sort, setSort] = useState(SORTS[0]);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All categories", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))],
    []
  );
  const warehouses = useMemo(
    () => ["All warehouses", ...Array.from(new Set(PRODUCTS.map((p) => p.warehouse)))],
    []
  );

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: products.length, in: 0, low: 0, out: 0, over: 0 };
    products.forEach((p) => (base[statusOf(p)] += 1));
    return base;
  }, [products]);

  const totals = useMemo(() => {
    const units = products.reduce((s, p) => s + p.onHand, 0);
    const value = products.reduce((s, p) => s + p.onHand * p.unitCost, 0);
    const incoming = products.reduce((s, p) => s + p.incoming, 0);
    return { units, value, incoming };
  }, [products]);

  const alerts = useMemo(
    () =>
      products
        .filter((p) => ["out", "low"].includes(statusOf(p)) && !dismissed.includes(p.id))
        .sort((a, b) => (a.coverDays ?? -1) - (b.coverDays ?? -1)),
    [products, dismissed]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = products.filter((p) => {
      if (tab !== "all" && statusOf(p) !== tab) return false;
      if (category !== "All categories" && p.category !== category) return false;
      if (warehouse !== "All warehouses" && p.warehouse !== warehouse) return false;
      if (q && !`${p.name} ${p.sku}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Highest stock first":
        sorted.sort((a, b) => b.onHand - a.onHand);
        break;
      case "Recently restocked":
        sorted.sort((a, b) => b.restockedAt.localeCompare(a.restockedAt));
        break;
      case "Highest value":
        sorted.sort((a, b) => b.onHand * b.unitCost - a.onHand * a.unitCost);
        break;
      case "Fastest moving":
        sorted.sort((a, b) => b.velocity - a.velocity);
        break;
      default:
        sorted.sort((a, b) => a.onHand - b.onHand);
    }
    return sorted;
  }, [products, tab, category, warehouse, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  const adjustStock = (id: string, delta: number) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, onHand: Math.max(0, p.onHand + delta) } : p))
    );

  const restock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.suggested > 0 ? { ...p, incoming: p.incoming + p.suggested } : p
      )
    );
    setDismissed((prev) => [...prev, id]);
  };

  const restockAll = () => {
    const ids = alerts.map((a) => a.id);
    setProducts((prev) =>
      prev.map((p) =>
        ids.includes(p.id) && p.suggested > 0 ? { ...p, incoming: p.incoming + p.suggested } : p
      )
    );
    setDismissed((prev) => [...prev, ...ids]);
  };

  const dismissAlert = (id: string) => setDismissed((prev) => [...prev, id]);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      <TopHeader alertCount={counts.out + counts.low} />

      <main className="mx-auto max-w-[1400px] space-y-6 p-6">
        <OverviewHeader />

        <StatsGrid
          totalSkus={products.length}
          totalUnits={totals.units}
          totalValue={totals.value}
          lowCount={counts.low}
          outCount={counts.out}
          incomingUnits={totals.incoming}
        />

        <AlertsSection
          alerts={alerts}
          onRestock={restock}
          onRestockAll={restockAll}
          onDismiss={dismissAlert}
        />

        <FilterTabs
          tab={tab}
          counts={counts}
          onChange={(t) => {
            setTab(t);
            setPage(1);
          }}
        />

        <Toolbar
          query={query}
          onQueryChange={resetPage(setQuery)}
          category={category}
          onCategoryChange={resetPage(setCategory)}
          categories={categories}
          warehouse={warehouse}
          onWarehouseChange={resetPage(setWarehouse)}
          warehouses={warehouses}
          sort={sort}
          onSortChange={setSort}
          sorts={SORTS}
          resultCount={filtered.length}
        />

        <ProductsTable
          rows={visible}
          totalCount={filtered.length}
          editing={editing}
          onEditToggle={setEditing}
          onAdjustStock={adjustStock}
        />

        <Pagination
          current={current}
          pageCount={pageCount}
          filteredCount={filtered.length}
          visibleCount={visible.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}