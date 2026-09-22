// app/(dashboard)/supplierdashboard/orders/shipped/types.ts

export type ShippedStatus = "shipped" | "in_transit" | "out_for_delivery" | "delayed";

export type ShippedOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  productName: string;
  productImage?: string;
  quantity: number;
  courier: string;
  trackingId: string;
  shippedDate: string; // ISO
  expectedDelivery: string; // ISO
  orderValue: number;
  paymentMethod: "COD" | "Prepaid";
  status: ShippedStatus;
};

export type ShippedStatusFilter = ShippedStatus | "all";
export type SortOption = "newest" | "oldest" | "amount_high" | "amount_low" | "delivery_soon";

export const PAGE_SIZE = 8;

export const STATUS_LABELS: Record<ShippedStatus, string> = {
  shipped: "Shipped",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delayed: "Delayed",
};

export const COURIERS = ["Pathao Courier", "Steadfast", "RedX", "Sundarban Courier"] as const;