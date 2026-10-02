export type RefundStatus = "Pending" | "Approved" | "Rejected" | "Refunded";
export type Method = "Stripe" | "PayPal" | "Square";

export interface Refund {
  id: string;
  order: string;
  customer: string;
  amount: number;
  reason: string;
  method: Method;
  status: RefundStatus;
}

export interface Filters {
  query: string;
  status: RefundStatus | "All";
  method: Method | "All";
}
