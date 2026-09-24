import { CompareRow, CurrentSub, Faq, Perk, Plan } from "./types";

export const initialCurrent: CurrentSub = { planId: "professional", cycle: "monthly" };

export const plans: Plan[] = [
  {
    id: "basic", name: "Basic", tagline: "Essential tools for getting started.", monthlyPrice: 500, rank: 0,
    features: ["Up to 20 Products", "Basic Analytics", "Basic Order Management", "Sales Reports", "Supplier Wallet", "Standard Support"],
  },
  {
    id: "professional", name: "Professional", tagline: "Advanced tools for growing suppliers.", monthlyPrice: 1000, rank: 1,
    features: ["Up to 500 Products", "Advanced Analytics", "Advanced Order Management", "Discount System", "Affiliate Campaigns", "Sales Reports", "Supplier Wallet", "Withdrawal System", "Priority Support"],
  },
  {
    id: "business", name: "Business", tagline: "Powerful tools for established businesses.", monthlyPrice: 2000, rank: 2,
    features: ["Unlimited Products", "Advanced Reports", "Advanced Analytics", "Discount System", "Affiliate Campaigns", "Promotional Features", "Advanced Order Management", "Priority Support", "Advanced Supplier Tools"],
  },
];

export const compareRows: CompareRow[] = [
  { label: "Product Limit", values: { basic: "20", professional: "500", business: "Unlimited" } },
  { label: "Analytics", values: { basic: "Basic", professional: "Advanced", business: "Advanced" } },
  { label: "Order Management", values: { basic: "Basic", professional: "Advanced", business: "Advanced" } },
  { label: "Discount System", values: { basic: false, professional: true, business: true } },
  { label: "Affiliate Campaigns", values: { basic: false, professional: true, business: true } },
  { label: "Advanced Reports", values: { basic: false, professional: true, business: true } },
  { label: "Promotional Features", values: { basic: false, professional: false, business: true } },
  { label: "Priority Support", values: { basic: false, professional: true, business: true } },
];

export const perks: Perk[] = [
  { icon: "products", title: "More Products", description: "List more products in your store." },
  { icon: "analytics", title: "Better Analytics", description: "Get deeper insights into sales and performance." },
  { icon: "tools", title: "More Business Tools", description: "Unlock advanced marketing and promotional features." },
];

export const faqs: Faq[] = [
  { q: "Can I change my plan later?", a: "Yes. You can upgrade or downgrade at any time from this page. Changes apply from your next billing cycle." },
  { q: "What happens when my subscription expires?", a: "Your account stays active on a limited free tier. Your products and order history are preserved, but premium features such as advanced analytics and promotional tools are paused until you renew." },
  { q: "Can I switch between monthly and yearly billing?", a: "Yes. Use the Monthly / Yearly toggle above and pick your current plan to switch billing cycle." },
  { q: "Can I cancel my subscription?", a: "Yes. You can cancel any time from the Current Plan page and keep access until the end of your billing period." },
  { q: "What happens to my products if I downgrade?", a: "Your products stay saved, but the ones above your new plan limit are hidden from your store until you upgrade again." },
];