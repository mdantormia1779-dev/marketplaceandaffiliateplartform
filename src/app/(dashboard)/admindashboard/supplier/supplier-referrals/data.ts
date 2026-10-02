import { Referral } from "./types";

// Plan onujayi reward (Reject korle reward 0 hoye jay, abar Approve korle ei map theke fire ashe)
export const rewardByPlan: Record<string, number> = {
  Starter: 50,
  Growth: 100,
  Elite: 150,
};

export const plans = Object.keys(rewardByPlan);

export const formatMoney = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// "Northline Audio" -> "NA", "Fern & Fig" -> "F&"
export const initials = (name: string) => {
  const words = name.trim().split(/\s+/);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
};

export const initialReferrals: Referral[] = [
  { id: 1, referrer: "Northline Audio", referred: "Pulse Audio Labs", plan: "Elite", reward: 150, status: "Pending", date: "2024-06-15" },
  { id: 2, referrer: "Titan Tools", referred: "Ironclad Hardware", plan: "Growth", reward: 100, status: "Pending", date: "2024-06-12" },
  { id: 3, referrer: "Lumen Home", referred: "Nordic Timber", plan: "Growth", reward: 100, status: "Approved", date: "2024-06-11" },
  { id: 4, referrer: "Bloom Beauty", referred: "Solstice Skincare", plan: "Starter", reward: 50, status: "Approved", date: "2024-06-09" },
  { id: 5, referrer: "Urban Fitwear", referred: "Baseline Sports", plan: "Starter", reward: 0, status: "Rejected", date: "2024-05-30" },
  { id: 6, referrer: "Zest Kitchen", referred: "Cedar & Clay", plan: "Growth", reward: 100, status: "Approved", date: "2024-06-08" },
  { id: 7, referrer: "Fern & Fig", referred: "Copper Lane", plan: "Starter", reward: 50, status: "Paid", date: "2024-05-28" },
  { id: 8, referrer: "Peak Outdoors", referred: "Glacier Gear", plan: "Growth", reward: 100, status: "Pending", date: "2024-06-13" },
  { id: 9, referrer: "Aroma World", referred: "Velvet Thread", plan: "Growth", reward: 100, status: "Paid", date: "2024-06-03" },
  { id: 10, referrer: "Cosmo Gadgets", referred: "Pixel Craft", plan: "Starter", reward: 0, status: "Rejected", date: "2024-05-19" },
];