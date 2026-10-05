export type CurrencyCode = "USD" | "EUR" | "GBP" | "BDT";
export type PayoutMethod = "Bank Transfer" | "PayPal" | "Stripe" | "Wallet credit";

export interface Gateway {
  id: string;
  name: string;
  company: string;
  percent: number; // percentage fee, jemon 2.9
  fixed: number; // fixed fee, jemon 0.30
  active: boolean;
}

export interface Settings {
  gateways: Gateway[];
  currency: CurrencyCode;
  payoutMethod: PayoutMethod;
  minWithdrawal: number;
  processingFee: number; // percent
  autoApproveUnder: number; // 0 mane auto-approve bondho
  requireKyc: boolean;
}

// key e field er jayga thake, jemon "gateway.<id>.percent"
export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;