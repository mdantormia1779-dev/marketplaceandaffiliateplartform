export type TxType =
  | "Order Payment"
  | "Commission Payout"
  | "Supplier Payout"
  | "Refund"
  | "Subscription"
  | "Joining Fee";

export type TxStatus = "Completed" | "Pending" | "Failed";
export type TxMethod = "Stripe" | "PayPal" | "Square" | "Wallet" | "Bank Transfer";

export interface Transaction {
  id: string;
  date: string;
  type: TxType;
  reference: string;
  party: string;
  amount: number;
  method: TxMethod;
  status: TxStatus;
}

export interface Filters {
  query: string;
  type: TxType | "All";
  status: TxStatus | "All";
}
