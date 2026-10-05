import { CurrencyCode, PayoutMethod, Settings } from "./types";

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "BDT", symbol: "৳", label: "BDT (৳)" },
];

export const PAYOUT_METHODS: PayoutMethod[] = ["Bank Transfer", "PayPal", "Stripe", "Wallet credit"];

export const MAX_AMOUNT = 1000000;
export const MAX_GATEWAY_PERCENT = 30;
export const MAX_GATEWAY_FIXED = 100;

export const symbolOf = (code: CurrencyCode) => CURRENCIES.find((c) => c.code === code)?.symbol ?? "$";

// Pore ei data API theke load korbi (usePaymentSettings e)
export const INITIAL_SETTINGS: Settings = {
  gateways: [
    { id: "stripe", name: "Stripe", company: "Stripe, Inc.", percent: 2.9, fixed: 0.3, active: true },
    { id: "paypal", name: "PayPal", company: "PayPal Holdings", percent: 3.4, fixed: 0.35, active: true },
    { id: "square", name: "Square", company: "Block, Inc.", percent: 2.6, fixed: 0.1, active: true },
    { id: "toss", name: "Toss Payments", company: "Toss", percent: 2.2, fixed: 0, active: false },
    { id: "bank", name: "Bank Transfer", company: "Manual", percent: 0, fixed: 1, active: true },
  ],
  currency: "USD",
  payoutMethod: "Bank Transfer",
  minWithdrawal: 50,
  processingFee: 1.5,
  autoApproveUnder: 250,
  requireKyc: true,
};