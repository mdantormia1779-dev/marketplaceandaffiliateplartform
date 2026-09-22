export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "refunded";
export type PaymentMethod = "cod" | "mobile_banking" | "card" | "online";

export type OrderItem = {
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  price: number; // per unit, in BDT
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string; // ISO
};

export type StatusFilter = OrderStatus | "all";
export type SortOption = "newest" | "oldest" | "amount_high" | "amount_low";
export type StatusCounts = Record<StatusFilter, number>;

export const ORDER_STATUSES: OrderStatus[] = [
  "new",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  refunded: "Refunded",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cod: "Cash on delivery",
  mobile_banking: "Mobile banking",
  card: "Card",
  online: "Online",
};