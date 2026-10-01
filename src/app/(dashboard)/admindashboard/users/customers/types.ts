import type { LucideIcon } from "lucide-react";

export type CustomerStatus = "Active" | "Pending" | "Suspended";

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  orders: number;
  totalSpent: number;
  status: CustomerStatus;
  joined: string;
};

export type Stat = {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};