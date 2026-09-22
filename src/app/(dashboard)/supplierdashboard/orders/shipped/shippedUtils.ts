// app/(dashboard)/supplierdashboard/orders/shipped/shippedUtils.ts

import {
  ShippedOrder,
  ShippedStatus,
  ShippedStatusFilter,
  SortOption,
} from "./types";

export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getShippedStats(orders: ShippedOrder[]) {
  const totalValue = orders.reduce((sum, o) => sum + o.orderValue, 0);
  const countByStatus = (status: ShippedStatus) =>
    orders.filter((o) => o.status === status).length;

  return {
    total: orders.length,
    shipped: countByStatus("shipped"),
    inTransit: countByStatus("in_transit"),
    outForDelivery: countByStatus("out_for_delivery"),
    delayed: countByStatus("delayed"),
    totalValue,
  };
}

export function getUniqueCouriers(orders: ShippedOrder[]): string[] {
  return Array.from(new Set(orders.map((o) => o.courier))).sort();
}

export function filterAndSortShippedOrders(
  orders: ShippedOrder[],
  statusFilter: ShippedStatusFilter,
  courierFilter: string | "all",
  query: string,
  sort: SortOption
): ShippedOrder[] {
  let list = [...orders];

  if (statusFilter !== "all") {
    list = list.filter((o) => o.status === statusFilter);
  }

  if (courierFilter !== "all") {
    list = list.filter((o) => o.courier === courierFilter);
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.trackingId.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => {
    if (sort === "newest")
      return new Date(b.shippedDate).getTime() - new Date(a.shippedDate).getTime();
    if (sort === "oldest")
      return new Date(a.shippedDate).getTime() - new Date(b.shippedDate).getTime();
    if (sort === "amount_high") return b.orderValue - a.orderValue;
    if (sort === "amount_low") return a.orderValue - b.orderValue;
    // delivery_soon
    return new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime();
  });

  return list;
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getTotalPages(itemCount: number, pageSize: number): number {
  return Math.max(1, Math.ceil(itemCount / pageSize));
}