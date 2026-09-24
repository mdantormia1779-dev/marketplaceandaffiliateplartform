import { BillingData } from "./types";

export const initialBilling: BillingData = {
  subscription: {
    planName: "Professional Plan",
    tier: "Multi-vendor supplier tier",
    price: 1000,
    status: "Active",
    nextBillingDate: "2026-10-25",
    autoRenewal: true,
    productsUsed: 248,
    productsLimit: 500,
    totalPaid: 12000,
    since: "2026-01-25",
  },
  paymentMethod: { id: "pm_1", provider: "bKash", last4: "4589", primary: true },
  invoices: [
    { id: "INV-2026-009", date: "2026-09-25", plan: "Professional Plan", amount: 1000, status: "Paid", pdfUrl: "#" },
    { id: "INV-2026-008", date: "2026-08-25", plan: "Professional Plan", amount: 1000, status: "Paid", pdfUrl: "#" },
    { id: "INV-2026-007", date: "2026-07-25", plan: "Professional Plan", amount: 1000, status: "Paid" },
    { id: "INV-2026-006", date: "2026-06-25", plan: "Professional Plan", amount: 1000, status: "Failed" },
  ],
};