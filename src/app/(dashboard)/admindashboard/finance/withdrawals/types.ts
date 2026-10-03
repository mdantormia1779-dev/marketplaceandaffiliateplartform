export type RequesterType = "Affiliate" | "Supplier";
export type WithdrawalStatus = "Pending" | "Approved" | "Paid" | "Rejected";
export type Method = "PayPal" | "Bank Transfer";

export interface Withdrawal {
  id: string;
  requester: string;
  type: RequesterType;
  amount: number;
  method: Method;
  requested: string;
  status: WithdrawalStatus;
}

export interface Filters {
  query: string;
  status: WithdrawalStatus | "All";
  type: RequesterType | "All";
}
