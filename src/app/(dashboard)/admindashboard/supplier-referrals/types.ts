export type ReferralStatus = "Pending" | "Approved" | "Paid" | "Rejected" | "Suspended";

export interface Referral {
  id: number;
  referrer: string;      // je supplier refer koreche
  referred: string;      // je notun store ke refer kora hoyeche
  plan: string;
  reward: number;
  status: ReferralStatus;
  date: string;          // YYYY-MM-DD
}