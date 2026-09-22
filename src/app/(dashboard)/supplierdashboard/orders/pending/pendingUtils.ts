import type { Order, SortOption } from "../types";
import { filterAndSortOrders, getOrderTotal } from "../ordersUtils";

// --- Constants & Types ---
export const PENDING_URGENT_HOURS = 24;
export const SLA_HOURS = 48;

export const REJECT_REASONS = [
  "Out of stock",
  "Unable to deliver to this address",
  "Price or product information changed",
  "Suspicious order",
  "Other",
] as const;

export type RejectReason = (typeof REJECT_REASONS)[number];
export type UrgencyFilter = "all" | "urgent" | "fresh";
export type PaymentFilter = "all" | "cod" | "prepaid";

export const URGENCY_OPTIONS: { value: UrgencyFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "urgent", label: "Urgent 24h+" },
  { value: "fresh", label: "Fresh" },
];

export const PAYMENT_OPTIONS: { value: PaymentFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cod", label: "COD" },
  { value: "prepaid", label: "Prepaid" },
];

export type UrgencyTone = "fresh" | "warning" | "urgent";

export const TONE_STYLES: Record<
  UrgencyTone,
  { accent: string; bar: string; badge: string }
> = {
  fresh: {
    accent: "bg-emerald-500",
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  warning: {
    accent: "bg-amber-500",
    bar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  urgent: {
    accent: "bg-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  },
};

export type PendingFilters = {
  query: string;
  sort: SortOption;
  urgency: UrgencyFilter;
  payment: PaymentFilter;
};

export const DEFAULT_FILTERS: PendingFilters = {
  query: "",
  sort: "oldest",
  urgency: "all",
  payment: "all",
};

// --- Helper Functions ---
export function hasActiveFilters(f: PendingFilters): boolean {
  return f.query.trim() !== "" || f.urgency !== "all" || f.payment !== "all";
}

export function getPendingOrders(orders: Order[]): Order[] {
  return orders.filter((o) => o.status === "new");
}

export function getWaitingHours(createdAt: string, now: number): number {
  return Math.max(0, Math.floor((now - new Date(createdAt).getTime()) / 36e5));
}

export function getUrgencyTone(hours: number): UrgencyTone {
  if (hours >= PENDING_URGENT_HOURS) return "urgent";
  if (hours >= 12) return "warning";
  return "fresh";
}

export function getSlaInfo(hours: number) {
  const pct = Math.min(100, Math.round((hours / SLA_HOURS) * 100));
  const remaining = Math.max(0, SLA_HOURS - hours);
  return { pct, remaining, breached: hours >= SLA_HOURS };
}

export function formatWaitingTime(hours: number): string {
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h waiting`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h waiting`;
}

export function getPendingList(
  orders: Order[],
  filters: PendingFilters,
  now: number | null
): Order[] {
  let list = filterAndSortOrders(getPendingOrders(orders), "all", filters.query, filters.sort);

  if (filters.payment === "cod") {
    list = list.filter((o) => o.paymentMethod === "cod");
  } else if (filters.payment === "prepaid") {
    list = list.filter((o) => o.paymentMethod !== "cod");
  }

  if (filters.urgency !== "all" && now !== null) {
    list = list.filter((o) => {
      const urgent = getWaitingHours(o.createdAt, now) >= PENDING_URGENT_HOURS;
      return filters.urgency === "urgent" ? urgent : !urgent;
    });
  }

  return list;
}

export function getPendingValue(pending: Order[]): number {
  return pending.reduce((sum, o) => sum + getOrderTotal(o), 0);
}

export function getCodValue(pending: Order[]): number {
  return pending
    .filter((o) => o.paymentMethod === "cod")
    .reduce((sum, o) => sum + getOrderTotal(o), 0);
}

export function getUrgentCount(pending: Order[], now: number | null): number {
  if (now === null) return 0;
  return pending.filter((o) => getWaitingHours(o.createdAt, now) >= PENDING_URGENT_HOURS).length;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}