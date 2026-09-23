// Swap RULES/PERIOD_STATS for real API data once the backend is wired up.

export type RuleStatus = "active" | "scheduled" | "paused" | "expired";
export type DiscountKind = "percentage" | "fixed" | "bundle" | "bxgy";

export interface Rule {
  id: string;
  name: string;
  ref: string;
  kind: DiscountKind;
  valueLabel: string; // "15% off", "$20 off", "Buy 2 get 1 free"
  condition: string;
  shortCondition: string; // label used inside the timeline bar
  channels: string[];
  startsAt: string;
  endsAt: string;
  usage: number;
  maxUses: number | null; // null = unlimited
  revenue: number | null;
  status: RuleStatus;
  priority: number;
}

/** Swap for `new Date()` once this is wired to real data. */
export const TODAY = new Date("2026-09-19T00:00:00Z");

export const RULES: Rule[] = [
  {
    id: "r1",
    name: "Weekend Flash Sale — 15% Off",
    ref: "DSC-201",
    kind: "percentage",
    valueLabel: "15% off",
    condition: "Applies to Electronics",
    shortCondition: "Applies to Electronics",
    channels: ["Online Store", "Mobile App"],
    startsAt: "2026-09-18",
    endsAt: "2026-09-21",
    usage: 342,
    maxUses: 500,
    revenue: 28400,
    status: "active",
    priority: 1,
  },
  {
    id: "r2",
    name: "Summer Clearance — 40% Off",
    ref: "DSC-207",
    kind: "percentage",
    valueLabel: "40% off",
    condition: "Applies to all products",
    shortCondition: "All products",
    channels: ["Online Store", "Mobile App", "Marketplace"],
    startsAt: "2026-07-15",
    endsAt: "2026-08-31",
    usage: 2031,
    maxUses: null,
    revenue: 46200,
    status: "expired",
    priority: 2,
  },
  {
    id: "r3",
    name: "Back to Work — $20 Off $150+",
    ref: "DSC-204",
    kind: "fixed",
    valueLabel: "$20 off",
    condition: "On orders of $150 or more",
    shortCondition: "On orders of $150 or more",
    channels: ["Online Store", "Mobile App", "Marketplace"],
    startsAt: "2026-09-22",
    endsAt: "2026-09-30",
    usage: 0,
    maxUses: 750,
    revenue: null,
    status: "scheduled",
    priority: 3,
  },
  {
    id: "r4",
    name: "Home Refresh Bundle — 25% Off",
    ref: "DSC-205",
    kind: "bundle",
    valueLabel: "25% off",
    condition: "Buy any 3 Home & Living items",
    shortCondition: "Buy any 3 Home & Living items",
    channels: ["Online Store", "Marketplace"],
    startsAt: "2026-10-01",
    endsAt: "2026-10-15",
    usage: 0,
    maxUses: 300,
    revenue: null,
    status: "scheduled",
    priority: 4,
  },
  {
    id: "r5",
    name: "New Arrivals Launch — 12% Off",
    ref: "DSC-209",
    kind: "percentage",
    valueLabel: "12% off",
    condition: "Applies to 6 new arrivals",
    shortCondition: "Applies to 6 new arrivals",
    channels: ["Online Store", "Mobile App", "Marketplace"],
    startsAt: "2026-09-25",
    endsAt: "2026-10-05",
    usage: 0,
    maxUses: null,
    revenue: null,
    status: "scheduled",
    priority: 5,
  },
  {
    id: "r6",
    name: "Buy 2 Get 1 Free — Beauty",
    ref: "DSC-203",
    kind: "bxgy",
    valueLabel: "Buy 2 get 1 free",
    condition: "Buy 2, get 1 free in Beauty",
    shortCondition: "Buy 2, get 1 free in Beauty",
    channels: ["Online Store", "Mobile App"],
    startsAt: "2026-09-10",
    endsAt: "2026-09-30",
    usage: 268,
    maxUses: 400,
    revenue: 16400,
    status: "active",
    priority: 6,
  },
  {
    id: "r7",
    name: "Sports Gear — $10 Off $60+",
    ref: "DSC-208",
    kind: "fixed",
    valueLabel: "$10 off",
    condition: "On Sports orders of $60 or more",
    shortCondition: "Sports orders of $60+",
    channels: ["Online Store"],
    startsAt: "2026-09-01",
    endsAt: "2026-09-30",
    usage: 148,
    maxUses: 250,
    revenue: 5400,
    status: "paused",
    priority: 7,
  },
  {
    id: "r8",
    name: "Loyalty Members Reward",
    ref: "DSC-206",
    kind: "percentage",
    valueLabel: "10% off",
    condition: "Gold tier members and above",
    shortCondition: "Gold tier and above",
    channels: ["Online Store", "Mobile App"],
    startsAt: "2026-06-01",
    endsAt: "2026-12-31",
    usage: 894,
    maxUses: null,
    revenue: 21800,
    status: "active",
    priority: 8,
  },
  {
    id: "r9",
    name: "Free Tote Over $200",
    ref: "DSC-202",
    kind: "bxgy",
    valueLabel: "Free gift",
    condition: "Free tote on orders over $200",
    shortCondition: "Free tote over $200",
    channels: ["Online Store"],
    startsAt: "2026-03-01",
    endsAt: "2026-12-31",
    usage: 1204,
    maxUses: null,
    revenue: 12900,
    status: "active",
    priority: 9,
  },
  {
    id: "r10",
    name: "First Order — 5% Off",
    ref: "DSC-210",
    kind: "percentage",
    valueLabel: "5% off",
    condition: "First-time customers only",
    shortCondition: "First-time customers",
    channels: ["Online Store", "Mobile App", "Marketplace"],
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    usage: 3255,
    maxUses: null,
    revenue: 9700,
    status: "active",
    priority: 10,
  },
];

/** Period metrics come from analytics, not from the rule list. */
export const PERIOD_STATS = {
  activeChange: 25,
  scheduledChange: 50,
  uses: 9284,
  usesChange: 18.6,
  discountsGiven: 18400,
  discountsChange: 14.2,
};

/** Six-week window drawn by the campaign schedule. */
export const WINDOW_START = "2026-09-10";
export const WINDOW_END = "2026-10-15";

export const RANGES = ["7 days", "30 days", "90 days"];

export const TYPES = ["All types", "Percentage", "Fixed Amount", "Bundle", "Buy X Get Y"];
export const TYPE_MAP: Record<string, DiscountKind> = {
  Percentage: "percentage",
  "Fixed Amount": "fixed",
  Bundle: "bundle",
  "Buy X Get Y": "bxgy",
};

export const SORTS = [
  "Priority (high → low)",
  "Priority (low → high)",
  "Most used",
  "Highest revenue",
  "Ending soonest",
];


// --- Added for the New Rule form ---
export const CHANNELS = ["Online Store", "Mobile App", "Marketplace"];

export const KIND_OPTIONS: Array<{ value: DiscountKind; label: string }> = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "bundle", label: "Bundle" },
  { value: "bxgy", label: "Buy X Get Y" },
];

export const PAGE_SIZE = 8;