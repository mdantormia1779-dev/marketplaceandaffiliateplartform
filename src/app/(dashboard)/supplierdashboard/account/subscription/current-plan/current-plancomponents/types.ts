export type PlanStatus = "Active" | "Cancelled" | "Expired";
export type UsageKey = "products" | "orders" | "storage" | "team";

export interface UsageItem {
  key: UsageKey;
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface PlanData {
  planName: string;
  price: number;
  billingCycle: "Monthly" | "Yearly";
  status: PlanStatus;
  startedAt: string; // ISO
  nextBillingDate: string; // ISO
  autoRenewal: boolean;
  usage: UsageItem[];
  features: Feature[];
}