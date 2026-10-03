import { RequesterType, Withdrawal, WithdrawalStatus } from "./types";

export const TYPES: RequesterType[] = ["Affiliate", "Supplier"];
export const STATUSES: WithdrawalStatus[] = ["Pending", "Approved", "Paid", "Rejected"];
export const PAGE_SIZES = [10, 25, 50];

export const INITIAL_WITHDRAWALS: Withdrawal[] = [
  { id: "WDR-3001", requester: "Jordan Blake", type: "Affiliate", amount: 3200, method: "PayPal", requested: "2024-06-19", status: "Pending" },
  { id: "WDR-3002", requester: "Northline Audio", type: "Supplier", amount: 18420, method: "Bank Transfer", requested: "2024-06-18", status: "Pending" },
  { id: "WDR-3003", requester: "Ravi Sharma", type: "Affiliate", amount: 2800, method: "Bank Transfer", requested: "2024-06-18", status: "Approved" },
  { id: "WDR-3004", requester: "Titan Tools", type: "Supplier", amount: 14240, method: "Bank Transfer", requested: "2024-06-17", status: "Pending" },
  { id: "WDR-3005", requester: "Nina Foster", type: "Affiliate", amount: 1900, method: "PayPal", requested: "2024-06-16", status: "Paid" },
  { id: "WDR-3006", requester: "Cosmo Gadgets", type: "Supplier", amount: 21320, method: "Bank Transfer", requested: "2024-06-16", status: "Approved" },
  { id: "WDR-3007", requester: "Marco Silva", type: "Affiliate", amount: 1500, method: "PayPal", requested: "2024-06-15", status: "Paid" },
  { id: "WDR-3008", requester: "Farah Aziz", type: "Affiliate", amount: 980, method: "PayPal", requested: "2024-06-14", status: "Rejected" },
  { id: "WDR-3009", requester: "Bloom Beauty", type: "Supplier", amount: 9860, method: "Bank Transfer", requested: "2024-06-13", status: "Paid" },
  { id: "WDR-3010", requester: "Zoey Turner", type: "Affiliate", amount: 760, method: "PayPal", requested: "2024-06-12", status: "Pending" },
];

export function rawStats(list: Withdrawal[]) {
  const by = (s: WithdrawalStatus) => list.filter((w) => w.status === s);
  const sum = (a: Withdrawal[]) => a.reduce((t, w) => t + w.amount, 0);
  return {
    pending: by("Pending").length,
    pendingAmount: sum(by("Pending")),
    processed: sum(by("Paid")),
    rejected: by("Rejected").length,
  };
}

const TARGET = { pending: 4, pendingAmount: 38340, processed: 186400, rejected: 1 };
const base = rawStats(INITIAL_WITHDRAWALS);

export const OFFSET = {
  pending: TARGET.pending - base.pending,
  pendingAmount: TARGET.pendingAmount - base.pendingAmount,
  processed: TARGET.processed - base.processed,
  rejected: TARGET.rejected - base.rejected,
};

export const TRENDS = {
  pending: { text: "2", up: true, label: "awaiting approval" },
  pendingAmount: { text: "4.2%", up: true, label: "to process" },
  processed: { text: "9.1%", up: true, label: "vs last month" },
  rejected: { text: "1", up: false, label: "this month" },
};
