export type StockStatus = "in" | "low" | "out" | "over";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  incoming: number;
  alertAt: number;
  capacity: number;
  velocity: number; // units sold per week
  unitCost: number;
  restockedAt: string; // ISO date
  coverDays: number | null; // days of stock left, null when out
  suggested: number; // suggested restock quantity, 0 = none
};