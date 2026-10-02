import { Wallet, WalletType } from "./types";

export const TYPES: WalletType[] = ["Affiliate", "Supplier", "Customer"];
export const PAGE_SIZES = [10, 25, 50];

export const INITIAL_WALLETS: Wallet[] = [
  { id: "WLT-5001", owner: "Jordan Blake", type: "Affiliate", balance: 4820, pending: 620, currency: "USD", status: "Active" },
  { id: "WLT-5002", owner: "Ravi Sharma", type: "Affiliate", balance: 3940, pending: 480, currency: "USD", status: "Active" },
  { id: "WLT-5003", owner: "Nina Foster", type: "Affiliate", balance: 2780, pending: 310, currency: "USD", status: "Active" },
  { id: "WLT-5004", owner: "Northline Audio", type: "Supplier", balance: 24180, pending: 2140, currency: "USD", status: "Active" },
  { id: "WLT-5005", owner: "Titan Tools", type: "Supplier", balance: 19640, pending: 1860, currency: "USD", status: "Active" },
  { id: "WLT-5006", owner: "Cosmo Gadgets", type: "Supplier", balance: 21320, pending: 2480, currency: "USD", status: "Active" },
  { id: "WLT-5007", owner: "Marco Silva", type: "Affiliate", balance: 1960, pending: 240, currency: "USD", status: "Active" },
  { id: "WLT-5008", owner: "Farah Aziz", type: "Affiliate", balance: 0, pending: 0, currency: "USD", status: "Frozen" },
  { id: "WLT-5009", owner: "Bloom Beauty", type: "Supplier", balance: 12480, pending: 980, currency: "USD", status: "Active" },
  { id: "WLT-5010", owner: "Pixel Craft", type: "Supplier", balance: 1240, pending: 0, currency: "USD", status: "Frozen" },
  { id: "WLT-5011", owner: "Noah Patel", type: "Customer", balance: 86.5, pending: 0, currency: "USD", status: "Active" },
  { id: "WLT-5012", owner: "Emma Lawson", type: "Customer", balance: 142, pending: 24, currency: "USD", status: "Active" },
];

export function rawStats(list: Wallet[]) {
  return {
    balance: list.reduce((s, w) => s + w.balance, 0),
    pending: list.reduce((s, w) => s + w.pending, 0),
    affiliates: list.filter((w) => w.type === "Affiliate" && w.status === "Active").length,
    frozen: list.filter((w) => w.status === "Frozen").length,
  };
}

const TARGET = { balance: 128420, pending: 12180, affiliates: 412, frozen: 2 };
const base = rawStats(INITIAL_WALLETS);

export const OFFSET = {
  balance: TARGET.balance - base.balance,
  pending: TARGET.pending - base.pending,
  affiliates: TARGET.affiliates - base.affiliates,
  frozen: TARGET.frozen - base.frozen,
};

export const TRENDS = {
  balance: { text: "8.1%", up: true, label: "across all wallets" },
  pending: { text: "3.4%", up: true, label: "awaiting clearance" },
  affiliates: { text: "7.6%", up: true, label: "active" },
  frozen: { text: "1", up: false, label: "under review" },
};
