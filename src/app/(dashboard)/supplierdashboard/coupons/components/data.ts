// Swap COUPONS/PERIOD_STATS for real API data once the backend is wired up.

export type CouponStatus = "active" | "scheduled" | "expired" | "disabled";
export type DiscountType = "percent" | "fixed" | "shipping";

export interface Coupon {
  id: string;
  code: string;
  name: string;
  type: DiscountType;
  value: number; // percent points, or dollars; ignored for shipping
  appliesTo: string;
  maxUses: number | null; // null = unlimited
  perCustomer: number;
  stackable: boolean;
  startsAt: string;
  endsAt: string;
  redemptions: number;
  customers: number;
  revenue: number | null; // null = no attributable revenue
  lastUsedAt: string | null;
  status: CouponStatus;
}

/** Swap for `new Date()` once this is wired to real data. */
export const TODAY = new Date("2026-09-19T00:00:00Z");

export const COUPONS: Coupon[] = [
  {
    id: "c1",
    code: "FREESHIP",
    name: "Free Shipping, No Minimum",
    type: "shipping",
    value: 0,
    appliesTo: "All products",
    maxUses: null,
    perCustomer: 3,
    stackable: true,
    startsAt: "2026-08-01",
    endsAt: "2026-12-31",
    redemptions: 3210,
    customers: 2410,
    revenue: null,
    lastUsedAt: "2026-09-19",
    status: "active",
  },
  {
    id: "c2",
    code: "SUMMER15",
    name: "Summer Sale — 15% Off",
    type: "percent",
    value: 15,
    appliesTo: "All products",
    maxUses: 2000,
    perCustomer: 2,
    stackable: false,
    startsAt: "2026-07-01",
    endsAt: "2026-08-31",
    redemptions: 1860,
    customers: 1420,
    revenue: 71300,
    lastUsedAt: "2026-08-31",
    status: "expired",
  },
  {
    id: "c3",
    code: "WELCOME10",
    name: "First Order Welcome Offer",
    type: "percent",
    value: 10,
    appliesTo: "All products",
    maxUses: 5000,
    perCustomer: 1,
    stackable: false,
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    redemptions: 1284,
    customers: 1284,
    revenue: 24800,
    lastUsedAt: "2026-09-18",
    status: "active",
  },
  {
    id: "c4",
    code: "TECH5",
    name: "Electronics — $5 Off",
    type: "fixed",
    value: 5,
    appliesTo: "Electronics",
    maxUses: 1500,
    perCustomer: 2,
    stackable: true,
    startsAt: "2026-06-15",
    endsAt: "2026-10-31",
    redemptions: 908,
    customers: 806,
    revenue: 9400,
    lastUsedAt: "2026-09-17",
    status: "active",
  },
  {
    id: "c5",
    code: "FLASH40",
    name: "72-Hour Flash Sale",
    type: "percent",
    value: 40,
    appliesTo: "Fashion",
    maxUses: 750,
    perCustomer: 1,
    stackable: false,
    startsAt: "2026-07-04",
    endsAt: "2026-07-07",
    redemptions: 742,
    customers: 742,
    revenue: 18900,
    lastUsedAt: "2026-07-07",
    status: "expired",
  },
  {
    id: "c6",
    code: "BULK25",
    name: "Bulk Order — 25% Off",
    type: "percent",
    value: 25,
    appliesTo: "Home & Living",
    maxUses: 600,
    perCustomer: 1,
    stackable: false,
    startsAt: "2026-05-10",
    endsAt: "2026-11-30",
    redemptions: 564,
    customers: 512,
    revenue: 31200,
    lastUsedAt: "2026-09-16",
    status: "active",
  },
  {
    id: "c7",
    code: "LOYAL20",
    name: "Loyalty Tier Reward",
    type: "percent",
    value: 20,
    appliesTo: "All products",
    maxUses: 1200,
    perCustomer: 4,
    stackable: true,
    startsAt: "2026-03-01",
    endsAt: "2027-02-28",
    redemptions: 486,
    customers: 318,
    revenue: 22400,
    lastUsedAt: "2026-09-19",
    status: "active",
  },
  {
    id: "c8",
    code: "APPONLY",
    name: "Mobile App Exclusive",
    type: "fixed",
    value: 10,
    appliesTo: "All products",
    maxUses: 900,
    perCustomer: 2,
    stackable: false,
    startsAt: "2026-04-01",
    endsAt: "2026-09-30",
    redemptions: 371,
    customers: 340,
    revenue: 12600,
    lastUsedAt: "2026-09-18",
    status: "active",
  },
  {
    id: "c9",
    code: "STUDENT12",
    name: "Verified Student Discount",
    type: "percent",
    value: 12,
    appliesTo: "All products",
    maxUses: 2500,
    perCustomer: 6,
    stackable: false,
    startsAt: "2026-02-01",
    endsAt: "2027-01-31",
    redemptions: 208,
    customers: 163,
    revenue: 6900,
    lastUsedAt: "2026-09-14",
    status: "active",
  },
  {
    id: "c10",
    code: "NEWYEAR30",
    name: "New Year Kickoff — 30% Off",
    type: "percent",
    value: 30,
    appliesTo: "All products",
    maxUses: 1000,
    perCustomer: 1,
    stackable: false,
    startsAt: "2026-12-28",
    endsAt: "2027-01-07",
    redemptions: 0,
    customers: 0,
    revenue: null,
    lastUsedAt: null,
    status: "scheduled",
  },
  {
    id: "c11",
    code: "EIDSPECIAL",
    name: "Eid Collection Offer",
    type: "percent",
    value: 18,
    appliesTo: "Fashion",
    maxUses: 800,
    perCustomer: 2,
    stackable: false,
    startsAt: "2026-10-05",
    endsAt: "2026-10-20",
    redemptions: 0,
    customers: 0,
    revenue: null,
    lastUsedAt: null,
    status: "scheduled",
  },
  {
    id: "c12",
    code: "VIPGIFT",
    name: "VIP Gift Card Credit",
    type: "fixed",
    value: 25,
    appliesTo: "All products",
    maxUses: 300,
    perCustomer: 1,
    stackable: true,
    startsAt: "2026-02-14",
    endsAt: "2026-12-31",
    redemptions: 96,
    customers: 96,
    revenue: 4100,
    lastUsedAt: "2026-08-02",
    status: "disabled",
  },
];

/** Period metrics come from analytics, not from the code list. */
export const PERIOD_STATS = {
  redemptions: 7260,
  redemptionsChange: 15.2,
  discountsGiven: 15000,
  discountsChange: 12.9,
  activeChange: 20,
  avgDiscount: 8.14,
  uniqueCustomers: 7912,
};

export const RANGES = ["7 days", "30 days", "90 days"];

export const TYPES = ["All types", "Percentage off", "Fixed amount", "Free shipping"];
export const TYPE_MAP: Record<string, DiscountType> = {
  "Percentage off": "percent",
  "Fixed amount": "fixed",
  "Free shipping": "shipping",
};

export const SORTS = ["Most redeemed", "Highest revenue", "Ending soonest", "Newest first"];