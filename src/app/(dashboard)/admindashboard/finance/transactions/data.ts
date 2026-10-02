import { Transaction, TxType } from "./types";

export const TODAY = "2024-06-19";

export const TYPES: TxType[] = [
  "Order Payment",
  "Commission Payout",
  "Supplier Payout",
  "Refund",
  "Subscription",
  "Joining Fee",
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "TXN-90211", date: "2024-06-19", type: "Order Payment", reference: "ORD-48219", party: "Noah Patel", amount: 258, method: "Stripe", status: "Completed" },
  { id: "TXN-90210", date: "2024-06-19", type: "Commission Payout", reference: "COM-3001", party: "Jordan Blake", amount: -12.9, method: "Wallet", status: "Pending" },
  { id: "TXN-90209", date: "2024-06-18", type: "Supplier Payout", reference: "PAY-7741", party: "Northline Audio", amount: -18420, method: "Bank Transfer", status: "Completed" },
  { id: "TXN-90208", date: "2024-06-18", type: "Refund", reference: "ORD-48210", party: "Nicole Adams", amount: -158, method: "Stripe", status: "Completed" },
  { id: "TXN-90207", date: "2024-06-18", type: "Subscription", reference: "SUB-3003", party: "Cosmo Gadgets", amount: 59, method: "Stripe", status: "Completed" },
  { id: "TXN-90206", date: "2024-06-17", type: "Joining Fee", reference: "JF-203", party: "Cedar & Clay", amount: 199, method: "PayPal", status: "Completed" },
  { id: "TXN-90205", date: "2024-06-17", type: "Order Payment", reference: "ORD-48216", party: "Aiko Tanaka", amount: 84, method: "PayPal", status: "Completed" },
  { id: "TXN-90204", date: "2024-06-16", type: "Order Payment", reference: "ORD-48215", party: "Olivia Brown", amount: 378, method: "Square", status: "Completed" },
  { id: "TXN-90203", date: "2024-06-16", type: "Commission Payout", reference: "COM-3008", party: "Louis Grant", amount: -37.8, method: "Wallet", status: "Completed" },
  { id: "TXN-90202", date: "2024-06-15", type: "Refund", reference: "ORD-48207", party: "Diego Hernandez", amount: -88, method: "Stripe", status: "Completed" },
  { id: "TXN-90201", date: "2024-06-14", type: "Order Payment", reference: "ORD-48201", party: "Mia Johnson", amount: 142, method: "PayPal", status: "Failed" },
  { id: "TXN-90200", date: "2024-06-13", type: "Supplier Payout", reference: "PAY-7738", party: "Peak Outdoors", amount: -6240, method: "Bank Transfer", status: "Failed" },
];

export function rawStats(list: Transaction[]) {
  return {
    today: list.filter((t) => t.date === TODAY).length,
    gross: list.filter((t) => t.amount > 0 && t.status === "Completed").reduce((s, t) => s + t.amount, 0),
    completed: list.filter((t) => t.status === "Completed").length,
    failed: list.filter((t) => t.status === "Failed").length,
  };
}

const TARGET = { today: 1284, gross: 121300, completed: 1246, failed: 12 };
const base = rawStats(INITIAL_TRANSACTIONS);

export const OFFSET = {
  today: TARGET.today - base.today,
  gross: TARGET.gross - base.gross,
  completed: TARGET.completed - base.completed,
  failed: TARGET.failed - base.failed,
};

export const TRENDS = {
  today: { text: "7.4%", up: true, label: "vs yesterday" },
  gross: { text: "9.8%", up: true, label: "this month" },
  completed: { text: "6.2%", up: true, label: "vs yesterday" },
  failed: { text: "3", up: false, label: "needs review" },
};

export const PAGE_SIZES = [10, 25, 50];
