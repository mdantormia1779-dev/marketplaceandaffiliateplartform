import { PayoutSchedule, Settings } from "./types";

export const SCHEDULES: PayoutSchedule[] = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
export const MAX_HOLD_DAYS = 90;

export const INITIAL_SETTINGS: Settings = {
  tiers: [
    { id: "bronze", name: "Bronze", minSales: 0, rate: 5, bonus: 0 },
    { id: "silver", name: "Silver", minSales: 25000, rate: 7, bonus: 100 },
    { id: "gold", name: "Gold", minSales: 60000, rate: 10, bonus: 300 },
    { id: "platinum", name: "Platinum", minSales: 80000, rate: 12, bonus: 500 },
  ],
  rules: {
    defaultRate: 10,
    supplierRate: 7,
    affiliateRate: 10,
    minPayout: 50,
    holdDays: 7,
    schedule: "Weekly",
    allowOverrides: false,
  },
  overrides: [
    { id: "electronics", category: "Electronics", rate: 8 },
    { id: "apparel", category: "Apparel", rate: 12 },
  ],
};
