import { Supplier } from "./types";

export const initialSuppliers: Supplier[] = [
  { id: 1, store: "Northline Audio", owner: "Marcus Reed", email: "marcus@northline.co", products: 148, revenue: 184320, rating: 4.9, status: "Active", joined: "2022-03-11" },
  { id: 2, store: "Urban Fitwear", owner: "Elena Petrova", email: "elena@urbanfit.com", products: 92, revenue: 121760, rating: 4.7, status: "Active", joined: "2022-06-24" },
  { id: 3, store: "Lumen Home", owner: "Grace Chen", email: "grace@lumenhome.io", products: 210, revenue: 96540, rating: 4.8, status: "Active", joined: "2021-11-30" },
  { id: 4, store: "Peak Outdoors", owner: "Owen Blake", email: "owen@peakout.com", products: 64, revenue: 78910, rating: 4.5, status: "Pending", joined: "2024-04-12" },
  { id: 5, store: "Zest Kitchen", owner: "Nadia Rahman", email: "nadia@zestkitchen.co", products: 133, revenue: 67280, rating: 4.6, status: "Active", joined: "2022-09-08" },
  { id: 6, store: "Pixel Craft", owner: "Derek Lam", email: "derek@pixelcraft.dev", products: 47, revenue: 54120, rating: 4.4, status: "Suspended", joined: "2023-01-19" },
  { id: 7, store: "Aroma World", owner: "Isabelle Laurent", email: "isabelle@aromaworld.fr", products: 88, revenue: 49860, rating: 4.7, status: "Active", joined: "2023-03-27" },
  { id: 8, store: "Titan Tools", owner: "Samuel Okoro", email: "samuel@titantools.com", products: 176, revenue: 142390, rating: 4.8, status: "Active", joined: "2021-07-15" },
  { id: 9, store: "Bloom Beauty", owner: "Chloe Dubois", email: "chloe@bloombeauty.co", products: 119, revenue: 88470, rating: 4.6, status: "Active", joined: "2022-12-01" },
  { id: 10, store: "Drift Surf Co", owner: "Kai Makoa", email: "kai@driftsurf.com", products: 38, revenue: 31240, rating: 4.3, status: "Pending", joined: "2024-06-05" },
  { id: 11, store: "Haven Books", owner: "Lena Ford", email: "lena@havenbooks.com", products: 305, revenue: 41200, rating: 4.8, status: "Active", joined: "2023-08-14" },
  { id: 12, store: "Orbit Gadgets", owner: "Ravi Patel", email: "ravi@orbitgadgets.io", products: 72, revenue: 59800, rating: 4.5, status: "Active", joined: "2023-10-02" },
];

export const revenueData = [
  { month: "Jan", revenue: 92000 }, { month: "Feb", revenue: 99000 },
  { month: "Mar", revenue: 112000 }, { month: "Apr", revenue: 120000 },
  { month: "May", revenue: 133000 }, { month: "Jun", revenue: 146000 },
  { month: "Jul", revenue: 140000 }, { month: "Aug", revenue: 152000 },
  { month: "Sep", revenue: 161000 }, { month: "Oct", revenue: 169000 },
  { month: "Nov", revenue: 183000 }, { month: "Dec", revenue: 196000 },
];

export const growthData = [
  { month: "Jan", suppliers: 165 }, { month: "Feb", suppliers: 170 },
  { month: "Mar", suppliers: 178 }, { month: "Apr", suppliers: 185 },
  { month: "May", suppliers: 193 }, { month: "Jun", suppliers: 203 },
  { month: "Jul", suppliers: 210 }, { month: "Aug", suppliers: 220 },
  { month: "Sep", suppliers: 228 }, { month: "Oct", suppliers: 236 },
  { month: "Nov", suppliers: 250 }, { month: "Dec", suppliers: 264 },
];