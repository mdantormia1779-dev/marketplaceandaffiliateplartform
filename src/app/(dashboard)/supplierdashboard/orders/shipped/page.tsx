// app/(dashboard)/supplierdashboard/orders/shipped/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import {
  PAGE_SIZE,
  ShippedStatusFilter,
  SortOption,
} from "./types";
import { SHIPPED_ORDERS } from "./shippedData";
import {
  filterAndSortShippedOrders,
  getShippedStats,
  getTotalPages,
  getUniqueCouriers,
  paginate,
} from "./shippedUtils";

import { ShippedStatsCards } from "./components/ShippedStatsCards";
import { ShippedFilters } from "./components/ShippedFilters";
import { ShippedOrderList } from "./components/ShippedOrderList";
import { Pagination } from "./components/Pagination";

export default function ShippedPage() {
  const [orders] = useState(SHIPPED_ORDERS);
  const [statusFilter, setStatusFilter] = useState<ShippedStatusFilter>("all");
  const [courierFilter, setCourierFilter] = useState<string | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const stats = useMemo(() => getShippedStats(orders), [orders]);
  const couriers = useMemo(() => getUniqueCouriers(orders), [orders]);

  const filtered = useMemo(
    () => filterAndSortShippedOrders(orders, statusFilter, courierFilter, query, sort),
    [orders, statusFilter, courierFilter, query, sort]
  );

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const paged = useMemo(() => paginate(filtered, page, PAGE_SIZE), [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, courierFilter, query, sort]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-slate-900">Shipped Orders</h1>
          <p className="text-sm text-slate-500">
            Track every order that's on its way to your customers.
          </p>
        </div>

        <div className="mb-6">
          <ShippedStatsCards
            total={stats.total}
            inTransit={stats.inTransit}
            outForDelivery={stats.outForDelivery}
            delayed={stats.delayed}
            totalValue={stats.totalValue}
          />
        </div>

        <ShippedFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          courierFilter={courierFilter}
          onCourierChange={setCourierFilter}
          couriers={couriers}
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
        />

        <ShippedOrderList orders={paged} />

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}