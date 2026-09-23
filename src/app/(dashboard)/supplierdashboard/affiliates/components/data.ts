// Swap this file's exports for real API data once the backend is wired up.
// Shapes are kept flat on purpose so the fetch layer can drop straight in.

export type AffiliateStatus = "active" | "pending" | "paused";

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  joinedAt: string; // ISO date
  products: string[];
  clicks: number;
  orders: number;
  commissionRate: number; // percent
  commissionEarned: number; // in ৳
  status: AffiliateStatus;
}

export type CampaignStatus = "active" | "paused";

export interface Campaign {
  id: string;
  name: string;
  commissionRate: number; // percent, overrides product/global while running
  window: string; // display range, e.g. "Oct 5 – Oct 20"
  status: CampaignStatus;
}

export const AFFILIATES: Affiliate[] = [
  {
    id: "af1",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@mail.com",
    joinedAt: "2026-05-12",
    products: ["Aria Portable Bluetooth Speaker", "Vega Smart Fitness Watch"],
    clicks: 4820,
    orders: 214,
    commissionRate: 15,
    commissionEarned: 32400,
    status: "active",
  },
  {
    id: "af2",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@mail.com",
    joinedAt: "2026-06-02",
    products: ["Aurora Wireless Charging Pad"],
    clicks: 3110,
    orders: 156,
    commissionRate: 10,
    commissionEarned: 18700,
    status: "active",
  },
  {
    id: "af3",
    name: "Rafiul Islam",
    email: "rafiul.islam@mail.com",
    joinedAt: "2026-07-20",
    products: ["Drift Ergonomic Office Chair", "Nomad Leather Weekender Bag"],
    clicks: 2260,
    orders: 84,
    commissionRate: 10,
    commissionEarned: 14200,
    status: "active",
  },
  {
    id: "af4",
    name: "Mim Akter",
    email: "mim.akter@mail.com",
    joinedAt: "2026-08-01",
    products: ["Halo Smart Bulb Starter Pack"],
    clicks: 1840,
    orders: 61,
    commissionRate: 10,
    commissionEarned: 6900,
    status: "active",
  },
  {
    id: "af5",
    name: "Shahriar Kabir",
    email: "shahriar.kabir@mail.com",
    joinedAt: "2026-09-05",
    products: ["Vega Smart Fitness Watch"],
    clicks: 960,
    orders: 22,
    commissionRate: 10,
    commissionEarned: 3100,
    status: "pending",
  },
  {
    id: "af6",
    name: "Farzana Yasmin",
    email: "farzana.yasmin@mail.com",
    joinedAt: "2026-04-18",
    products: ["Aria Portable Bluetooth Speaker"],
    clicks: 2670,
    orders: 98,
    commissionRate: 10,
    commissionEarned: 11400,
    status: "active",
  },
  {
    id: "af7",
    name: "Imran Hossain",
    email: "imran.hossain@mail.com",
    joinedAt: "2026-03-10",
    products: ["Nomad Leather Weekender Bag", "Drift Ergonomic Office Chair"],
    clicks: 1420,
    orders: 40,
    commissionRate: 10,
    commissionEarned: 5600,
    status: "paused",
  },
  {
    id: "af8",
    name: "Priya Sultana",
    email: "priya.sultana@mail.com",
    joinedAt: "2026-08-22",
    products: ["Aurora Wireless Charging Pad", "Halo Smart Bulb Starter Pack"],
    clicks: 1980,
    orders: 71,
    commissionRate: 10,
    commissionEarned: 8300,
    status: "active",
  },
  {
    id: "af9",
    name: "Kamrul Hasan",
    email: "kamrul.hasan@mail.com",
    joinedAt: "2026-09-10",
    products: ["Vega Smart Fitness Watch"],
    clicks: 540,
    orders: 9,
    commissionRate: 10,
    commissionEarned: 1200,
    status: "pending",
  },
  {
    id: "af10",
    name: "Lamia Chowdhury",
    email: "lamia.chowdhury@mail.com",
    joinedAt: "2026-02-14",
    products: ["Aria Portable Bluetooth Speaker", "Aurora Wireless Charging Pad"],
    clicks: 3340,
    orders: 129,
    commissionRate: 12,
    commissionEarned: 15800,
    status: "active",
  },
];

export const CAMPAIGNS: Campaign[] = [
  { id: "cp1", name: "Eid Collection Boost", commissionRate: 15, window: "Oct 5 – Oct 20", status: "active" },
  { id: "cp2", name: "Weekend Flash Push", commissionRate: 18, window: "Sep 18 – Sep 21", status: "active" },
];

export const PRODUCT_OPTIONS: string[] = [
  "All products",
  "Aria Portable Bluetooth Speaker",
  "Halo Smart Bulb Starter Pack",
  "Aurora Wireless Charging Pad",
  "Drift Ergonomic Office Chair",
  "Nomad Leather Weekender Bag",
  "Vega Smart Fitness Watch",
];

export const SORT_OPTIONS: string[] = ["Highest commission", "Most orders", "Most clicks", "Newest"];