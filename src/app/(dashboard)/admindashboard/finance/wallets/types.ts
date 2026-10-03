export type WalletType = "Affiliate" | "Supplier" | "Customer";
export type WalletStatus = "Active" | "Frozen";
export type AdjustMode = "Credit" | "Debit";

export interface Wallet {
  id: string;
  owner: string;
  type: WalletType;
  balance: number;
  pending: number;
  currency: string;
  status: WalletStatus;
}

export interface Filters {
  query: string;
  type: WalletType | "All";
  status: WalletStatus | "All";
}
