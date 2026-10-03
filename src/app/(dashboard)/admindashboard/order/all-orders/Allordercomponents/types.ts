export type OrderStatus =
  | "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Paid" | "Refunded" | "Unpaid";

export interface OrderItem { name: string; sku: string; qty: number; price: number }

export interface Order {
  id: string;
  customer: { name: string; email: string; address: string };
  supplier: string;
  affiliate?: { name: string; code: string };
  items: OrderItem[];
  amount: number;
  payment: PaymentStatus;
  status: OrderStatus;
  date: string;
  method: string;
  transaction: string;
}

export const TABS = [
  "All Orders", "Pending", "Processing", "Shipped",
  "Delivered", "Cancelled", "Refunds",
] as const;
export type Tab = (typeof TABS)[number];

export const TAB_SLUGS: Record<Tab, string> = {
  "All Orders": "all-orders",
  Pending: "pending",
  Processing: "processing-orders",
  Shipped: "shipped-orders",
  Delivered: "delivered-orders",
  Cancelled: "cancelled-orders",
  Refunds: "refunds",
};