export type PayoutSchedule = "Daily" | "Weekly" | "Bi-weekly" | "Monthly";

export interface Tier {
  id: string;
  name: string;
  minSales: number;
  rate: number;
  bonus: number;
}

export interface Rules {
  defaultRate: number;
  supplierRate: number;
  affiliateRate: number;
  minPayout: number;
  holdDays: number;
  schedule: PayoutSchedule;
  allowOverrides: boolean;
}

export interface CategoryOverride {
  id: string;
  category: string;
  rate: number;
}

export interface Settings {
  tiers: Tier[];
  rules: Rules;
  overrides: CategoryOverride[];
}

export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;
