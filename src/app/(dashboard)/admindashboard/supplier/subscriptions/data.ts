import { Subscription } from "./types";

export const initialSubscriptions: Subscription[] = [
  { id: "1", store: "Northline Audio", plan: "Elite", billing: "Yearly", amount: 1188, started: "2021-03-11", renews: "2025-03-11", status: "Active" },
  { id: "2", store: "Titan Tools", plan: "Elite", billing: "Yearly", amount: 1188, started: "2021-07-15", renews: "2025-07-15", status: "Active" },
  { id: "3", store: "Cosmo Gadgets", plan: "Growth", billing: "Monthly", amount: 59, started: "2022-01-18", renews: "2024-07-18", status: "Active" },
  { id: "4", store: "Lumen Home", plan: "Growth", billing: "Monthly", amount: 59, started: "2022-04-30", renews: "2024-07-30", status: "Active" },
  { id: "5", store: "Urban Fitwear", plan: "Growth", billing: "Monthly", amount: 59, started: "2022-06-24", renews: "2024-07-24", status: "Active" },
  { id: "6", store: "Zest Kitchen", plan: "Starter", billing: "Monthly", amount: 29, started: "2023-02-08", renews: "2024-07-08", status: "Active" },
  { id: "7", store: "Bloom Beauty", plan: "Growth", billing: "Monthly", amount: 59, started: "2022-09-01", renews: "2024-07-01", status: "Past Due" },
  { id: "8", store: "Aroma World", plan: "Starter", billing: "Monthly", amount: 29, started: "2023-05-27", renews: "2024-07-27", status: "Active" },
  { id: "9", store: "Fern & Fig", plan: "Starter", billing: "Monthly", amount: 29, started: "2023-06-22", renews: "2024-07-22", status: "Active" },
  { id: "10", store: "Pixel Craft", plan: "Starter", billing: "Monthly", amount: 29, started: "2023-01-19", renews: "2024-06-19", status: "Cancelled" },
  { id: "11", store: "Vista Optics", plan: "Trial", billing: "Monthly", amount: 0, started: "2024-06-20", renews: "2024-07-20", status: "Trial" },
  { id: "12", store: "Oak & Ember", plan: "Growth", billing: "Yearly", amount: 590, started: "2023-08-12", renews: "2025-08-12", status: "Active" },
];

export const stats = {
  active: 270,
  monthly: 14860,
  trial: 18,
  pastDue: 3,
  annualRunRate: 178320,
  avgPlanValue: 55.04,
};

export const planMix = [
  { name: "Elite", value: 42, color: "#1fb06f" },
  { name: "Growth", value: 96, color: "#ec9a1f" },
  { name: "Starter", value: 132, color: "#6b9190" },
  { name: "Trial", value: 18, color: "#808080" },
];

export const revenueByPlan = [
  { name: "Elite", value: 5040, color: "#1fb06f" },
  { name: "Growth", value: 5664, color: "#ec9a1f" },
  { name: "Starter", value: 3828, color: "#6b9190" },
  { name: "Trial", value: 328, color: "#808080" },
];