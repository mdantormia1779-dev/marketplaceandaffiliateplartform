"use client";

import { useMemo, useState } from "react";

import Navbar from "@/app/(dashboard)/supplierdashboard/components/Navbar";

import type { Order, OrderStatus, SortOption, StatusFilter } from "./types";
import { ORDERS } from "./ordersData";
import {
  filterAndSortOrders,
  getPendingCount,
  getStatusCounts,
  getTotalRevenue,
} from "./ordersUtils";

import { OrderSummaryCards } from "./components/OrderSummaryCards";
import { OrderStatusTabs } from "./components/OrderStatusTabs";
import { OrderFilters } from "./components/OrderFilters";
import { OrderList } from "./components/OrderList";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const statusCounts = useMemo(() => getStatusCounts(orders), [orders]);
  const pendingCount = useMemo(() => getPendingCount(orders), [orders]);
  const totalRevenue = useMemo(() => getTotalRevenue(orders), [orders]);
  const deliveredCount = statusCounts.delivered;

  const filtered = useMemo(
    () => filterAndSortOrders(orders, statusFilter, query, sort),
    [orders, statusFilter, query, sort]
  );

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    // TODO: wire to your server action to persist the status update
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              // Cancelling a paid order marks it as refunded
              paymentStatus:
                status === "cancelled" && o.paymentStatus === "paid"
                  ? "refunded"
                  : o.paymentStatus,
            }
          : o
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="px-4 py-6 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
            <p className="text-sm text-slate-500">
              Track incoming orders and update their status as you process them.
            </p>
          </div>

          <OrderSummaryCards
            totalOrders={orders.length}
            pendingCount={pendingCount}
            deliveredCount={deliveredCount}
            totalRevenue={totalRevenue}
          />

          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <OrderStatusTabs
              activeFilter={statusFilter}
              onFilterChange={setStatusFilter}
              counts={statusCounts}
            />
            <OrderFilters
              query={query}
              onQueryChange={setQuery}
              sort={sort}
              onSortChange={setSort}
            />
          </div>

          <OrderList orders={filtered} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}