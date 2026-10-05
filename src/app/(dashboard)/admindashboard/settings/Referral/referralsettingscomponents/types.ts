export type RewardType = "Cash" | "Wallet credit" | "Discount voucher";

export interface Reward {
  id: string;
  from: string; // ke refer kore
  to: string; // kake refer kore
  amount: number;
}

export interface Settings {
  enabled: boolean;
  rewardType: RewardType;
  rewards: Reward[];
  threshold: number; // cash payout er minimum balance
}

// key e field er jayga thake, jemon "reward.<id>"
export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;