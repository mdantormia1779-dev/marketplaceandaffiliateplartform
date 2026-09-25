import { LucideIcon } from "lucide-react";

export type PaymentMethodType = "bKash" | "Nagad" | "Bank Transfer";

export interface PayoutMethod {
  id: string;
  type: PaymentMethodType;
  accountNumber: string;
  accountName: string;
  bankName?: string;
  isDefault: boolean;
}

export type WithdrawalStatus = "Completed" | "Processing" | "Rejected" | "Pending";

export type WithdrawalStatusFilter = "All Statuses" | WithdrawalStatus;

export interface TimelineEvent {
  label: string;
  timestamp: string;
  completed: boolean;
}

export interface WithdrawalRequest {
  id: string;
  date: string;
  amount: string;
  method: PaymentMethodType;
  status: WithdrawalStatus;
  processedDate: string | null;
  timeline: TimelineEvent[];
}

export interface WithdrawalStat {
  label: string;
  value: string;
  change: string;
  note: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  topBarColor: string;
}