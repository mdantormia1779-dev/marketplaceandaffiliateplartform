import { Method, Refund, RefundStatus } from "./types";

export const STATUSES: RefundStatus[] = ["Pending", "Approved", "Rejected", "Refunded"];
export const METHODS: Method[] = ["Stripe", "PayPal", "Square"];
export const PAGE_SIZES = [10, 25, 50];

export const INITIAL_REFUNDS: Refund[] = [
  { id: "RFD-4001", order: "ORD-48214", customer: "Lucas Martin", amount: 119, reason: "Item not as described", method: "Stripe", status: "Pending" },
  { id: "RFD-4002", order: "ORD-48210", customer: "Nicole Adams", amount: 158, reason: "Damaged in transit", method: "Stripe", status: "Approved" },
  { id: "RFD-4003", order: "ORD-48207", customer: "Diego Hernandez", amount: 88, reason: "Payment failed", method: "Stripe", status: "Rejected" },
  { id: "RFD-4004", order: "ORD-48201", customer: "Grace Miller", amount: 74, reason: "Changed mind", method: "PayPal", status: "Refunded" },
  { id: "RFD-4005", order: "ORD-48198", customer: "Hannah Weber", amount: 96, reason: "Wrong size delivered", method: "Square", status: "Refunded" },
  { id: "RFD-4006", order: "ORD-48195", customer: "Tom Andersen", amount: 58, reason: "Late delivery", method: "Stripe", status: "Approved" },
  { id: "RFD-4007", order: "ORD-48190", customer: "Ethan Kim", amount: 79, reason: "Defective product", method: "PayPal", status: "Pending" },
  { id: "RFD-4008", order: "ORD-48188", customer: "Mia Johnson", amount: 124, reason: "Duplicate order", method: "Stripe", status: "Refunded" },
  { id: "RFD-4009", order: "ORD-48184", customer: "Ryan O'Connor", amount: 96, reason: "Not received", method: "Square", status: "Approved" },
  { id: "RFD-4010", order: "ORD-48180", customer: "Priya Nair", amount: 249, reason: "Quality issue", method: "Stripe", status: "Pending" },
];

export const TOTAL_ORDERS = 1000;

export function rawStats(list: Refund[]) {
  const by = (s: RefundStatus) => list.filter((r) => r.status === s);
  return {
    open: by("Pending").length,
    refundedAmount: by("Refunded").reduce((t, r) => t + r.amount, 0),
    approved: by("Approved").length,
    refundCount: by("Approved").length + by("Refunded").length,
  };
}

const TARGET = { open: 3, refundedAmount: 1842, approved: 2, refundCount: 14 };
const base = rawStats(INITIAL_REFUNDS);

export const OFFSET = {
  open: TARGET.open - base.open,
  refundedAmount: TARGET.refundedAmount - base.refundedAmount,
  approved: TARGET.approved - base.approved,
  refundCount: TARGET.refundCount - base.refundCount,
};

export const TRENDS = {
  open: { text: "1", up: true, label: "needs review" },
  refunded: { text: "2.1%", up: false, label: "vs last month" },
  approved: { text: "1", up: true, label: "this month" },
  rate: { text: "0.3%", up: false, label: "of total orders" },
};
