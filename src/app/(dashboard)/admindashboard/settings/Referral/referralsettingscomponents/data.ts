import { RewardType, Settings } from "./types";

export const REWARD_TYPES: RewardType[] = ["Cash", "Wallet credit", "Discount voucher"];
export const MAX_REWARD = 10000;
export const MAX_THRESHOLD = 10000;

// Summary card er subtitle reward type onujayi bodlay
export const SUMMARY_SUBTITLE: Record<RewardType, string> = {
  Cash: "Payout per successful referral",
  "Wallet credit": "Wallet credit per successful referral",
  "Discount voucher": "Voucher value per successful referral",
};

// Pore ei data API theke load korbi (useReferralSettings e)
export const INITIAL_SETTINGS: Settings = {
  enabled: true,
  rewardType: "Cash",
  rewards: [
    { id: "aff-aff", from: "Affiliate", to: "Affiliate", amount: 150 },
    { id: "aff-sup", from: "Affiliate", to: "Supplier", amount: 250 },
    { id: "sup-sup", from: "Supplier", to: "Supplier", amount: 100 },
    { id: "cus-cus", from: "Customer", to: "Customer", amount: 20 },
  ],
  threshold: 50,
};