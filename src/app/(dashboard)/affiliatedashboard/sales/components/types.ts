import { LucideIcon } from "lucide-react";

export type OrderStatus =
  | "Pending"
  | "Approved"
  | "Completed"
  | "Cancelled"
  | "Refunded";

export type StatusFilter = "All Statuses" | OrderStatus;

export interface SalesStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  topBarColor: string;
}

export interface Order {
  id: string;
  product: string;
  emoji: string;
  customer: string;
  orderDate: string;
  orderAmount: string;
  commission: string;
  status: OrderStatus;
}