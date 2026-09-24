export type InvoiceStatus = "Paid" | "Pending" | "Failed";
export type SubscriptionStatus = "Active" | "Cancelled" | "Expired";
export type DateRange = "all" | "30d" | "90d" | "year";

export interface Subscription {
  planName: string;
  tier: string;
  price: number;
  status: SubscriptionStatus;
  nextBillingDate: string; // ISO
  autoRenewal: boolean;
  productsUsed: number;
  productsLimit: number;
  totalPaid: number;
  since: string; // ISO
}

export interface PaymentMethod {
  id: string;
  provider: string;
  last4: string;
  primary: boolean;
}

export interface Invoice {
  id: string;
  date: string; // ISO
  plan: string;
  amount: number;
  status: InvoiceStatus;
  pdfUrl?: string;
}

export interface BillingData {
  subscription: Subscription;
  paymentMethod: PaymentMethod | null;
  invoices: Invoice[];
}