import { Fee } from "./types";

// Plan dile amount auto bose jabe
export const plans = [
  { name: "Starter", price: 99 },
  { name: "Growth", price: 199 },
  { name: "Elite", price: 399 },
];

export const methods = ["Card", "PayPal", "Bank Transfer"];

export const formatMoney = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const initialFees: Fee[] = [
  { id: 1, store: "Peak Outdoors", plan: "Growth", amount: 199, method: "Card", paidOn: "2024-04-12", status: "Paid" },
  { id: 2, store: "Drift Surf Co", plan: "Starter", amount: 99, method: "Card", paidOn: "2024-06-05", status: "Paid" },
  { id: 3, store: "Cedar & Clay", plan: "Growth", amount: 199, method: "PayPal", paidOn: "2024-06-08", status: "Paid" },
  { id: 4, store: "Velvet Thread", plan: "Growth", amount: 199, method: "Card", paidOn: "2024-06-03", status: "Paid" },
  { id: 5, store: "Copper Lane", plan: "Starter", amount: 99, method: "Bank Transfer", paidOn: "2024-05-28", status: "Paid" },
  { id: 6, store: "Nordic Timber", plan: "Growth", amount: 199, method: "Card", paidOn: null, status: "Pending" },
  { id: 7, store: "Solstice Skincare", plan: "Starter", amount: 99, method: "PayPal", paidOn: null, status: "Pending" },
  { id: 8, store: "Ironclad Hardware", plan: "Growth", amount: 199, method: "Card", paidOn: null, status: "Pending" },
  { id: 9, store: "Glacier Gear", plan: "Growth", amount: 199, method: "Card", paidOn: null, status: "Pending" },
  { id: 10, store: "Pulse Audio Labs", plan: "Elite", amount: 399, method: "Bank Transfer", paidOn: null, status: "Pending" },
  { id: 11, store: "Maple Audio", plan: "Growth", amount: 199, method: "Card", paidOn: null, status: "Waived" },
  { id: 12, store: "Saffron Table", plan: "Starter", amount: 99, method: "PayPal", paidOn: null, status: "Waived" },
];