import { PlanData } from "./types";

export const initialPlan: PlanData = {
  planName: "Professional",
  price: 1000,
  billingCycle: "Monthly",
  status: "Active",
  startedAt: "2026-09-25",
  nextBillingDate: "2026-10-25",
  autoRenewal: true,
  usage: [
    { key: "products", label: "Products", used: 248, limit: 500 },
    { key: "orders", label: "Monthly Orders", used: 48, limit: 500 },
    { key: "storage", label: "Storage", used: 6.8, limit: 20, unit: "GB" },
    { key: "team", label: "Team Members", used: 3, limit: 5 },
  ],
  features: [
    { title: "Up to 500 Products", description: "List and manage up to 500 products in your store." },
    { title: "Advanced Analytics", description: "Deep insights into traffic, sales and conversions." },
    { title: "Advanced Order Management", description: "Streamline processing and fulfilment at scale." },
    { title: "Discount System", description: "Create discounts and promotional offers with ease." },
    { title: "Affiliate Campaigns", description: "Grow sales through your own affiliate network." },
    { title: "Sales Reports", description: "Export detailed sales reports any time you need." },
    { title: "Supplier Wallet", description: "Track all of your earnings in a single wallet." },
    { title: "Withdrawal System", description: "Request withdrawals and payout on demand." },
    { title: "Product Inventory Management", description: "Keep stock levels accurate across every item." },
    { title: "Customer Order Tracking", description: "Follow every order from checkout to delivery." },
    { title: "Basic Priority Support", description: "Get faster help from our support team." },
    { title: "Performance Reports", description: "Monitor your key store metrics over time." },
  ],
};