import type { Order, SortOption, StatusCounts, StatusFilter } from "./types";

const numberFormatter = new Intl.NumberFormat("en-IN");

export function formatBDT(amount: number): string {
  return `৳${numberFormatter.format(amount)}`;
}

// Fixed timezone so server and client render the same date (no hydration mismatch)
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatOrderDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function getOrderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getOrderItemCount(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getStatusCounts(orders: Order[]): StatusCounts {
  return {
    all: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };
}

export function getTotalRevenue(orders: Order[]): number {
  return orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + getOrderTotal(o), 0);
}

export function getPendingCount(orders: Order[]): number {
  return orders.filter((o) => o.status === "new" || o.status === "processing").length;
}

export function filterAndSortOrders(
  orders: Order[],
  statusFilter: StatusFilter,
  query: string,
  sort: SortOption
): Order[] {
  let list = [...orders];

  if (statusFilter !== "all") {
    list = list.filter((o) => o.status === statusFilter);
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.items.some((item) => item.productName.toLowerCase().includes(q))
    );
  }

  list.sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sort === "amount_high") return getOrderTotal(b) - getOrderTotal(a);
    return getOrderTotal(a) - getOrderTotal(b);
  });

  return list;
}