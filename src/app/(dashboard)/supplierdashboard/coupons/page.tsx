"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  Copy,
  DollarSign,
  Download,
  Lightbulb,
  MessageSquare,
  MoreVertical,
  Pencil,
  Percent,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  Ticket,
  Timer,
  TrendingUp,
  Truck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type CouponStatus = "active" | "scheduled" | "expired" | "disabled";
type DiscountType = "percent" | "fixed" | "shipping";

type Coupon = {
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
};

/** Swap for `new Date()` once this is wired to real data. */
const TODAY = new Date("2026-09-19T00:00:00Z");

const COUPONS: Coupon[] = [
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
const PERIOD_STATS = {
  redemptions: 7260,
  redemptionsChange: 15.2,
  discountsGiven: 15000,
  discountsChange: 12.9,
  activeChange: 20,
  avgDiscount: 8.14,
  uniqueCustomers: 7912,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const STATUS_META: Record<CouponStatus, { label: string; pill: string; dot: string }> = {
  active: {
    label: "Active",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
  },
  scheduled: {
    label: "Scheduled",
    pill: "bg-blue-50 text-blue-700 ring-blue-600/20",
    dot: "bg-blue-500",
  },
  expired: {
    label: "Expired",
    pill: "bg-slate-100 text-slate-600 ring-slate-500/20",
    dot: "bg-slate-400",
  },
  disabled: {
    label: "Disabled",
    pill: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string, withYear = true) {
  const [y, m, d] = iso.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${d}`;
}

function daysBetween(iso: string) {
  const target = new Date(`${iso}T00:00:00Z`).getTime();
  return Math.round((target - TODAY.getTime()) / 86_400_000);
}

function money(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: n % 1 ? 2 : 0 })}`;
}

function discountLabel(c: Coupon) {
  if (c.type === "shipping") return "Free shipping";
  if (c.type === "percent") return `${c.value}% off`;
  return `$${c.value} off`;
}

const TYPE_ICON: Record<DiscountType, React.ReactNode> = {
  shipping: <Truck className="h-4 w-4" />,
  percent: <Percent className="h-4 w-4" />,
  fixed: <DollarSign className="h-4 w-4" />,
};

const TYPE_TINT: Record<DiscountType, string> = {
  shipping: "bg-sky-50 text-sky-600",
  percent: "bg-violet-50 text-violet-600",
  fixed: "bg-emerald-50 text-emerald-600",
};

function validityNote(c: Coupon) {
  if (c.status === "scheduled") {
    const d = daysBetween(c.startsAt);
    return d <= 0 ? "Starting today" : `Starts in ${d} days`;
  }
  if (c.status === "disabled") return "Paused by you";
  const d = daysBetween(c.endsAt);
  if (d < 0) return `Expired ${formatDate(c.endsAt, false)}`;
  if (d === 0) return "Ends today";
  return `Ends in ${d} days`;
}

/** The table flags codes close to their cap, per the note in Redemption Health. */
function nearLimit(c: Coupon) {
  if (!c.maxUses || c.status !== "active") return false;
  return c.redemptions / c.maxUses >= 0.85;
}

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  change,
  caption,
  icon,
  tint,
}: {
  label: string;
  value: string;
  change?: number;
  caption: string;
  icon: React.ReactNode;
  tint: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={cx("grid h-8 w-8 place-items-center rounded-lg", tint)}>{icon}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        {change !== undefined && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {change}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-400">{caption}</p>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={cx("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function LimitChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const RANGES = ["7 days", "30 days", "90 days"];
const TABS: Array<{ key: "all" | CouponStatus; label: string }> = [
  { key: "all", label: "All codes" },
  { key: "active", label: "Active" },
  { key: "scheduled", label: "Scheduled" },
  { key: "expired", label: "Expired" },
  { key: "disabled", label: "Disabled" },
];
const TYPES = ["All types", "Percentage off", "Fixed amount", "Free shipping"];
const TYPE_MAP: Record<string, DiscountType> = {
  "Percentage off": "percent",
  "Fixed amount": "fixed",
  "Free shipping": "shipping",
};
const SORTS = ["Most redeemed", "Highest revenue", "Ending soonest", "Newest first"];

export default function CouponsPage() {
  const [range, setRange] = useState("30 days");
  const [tab, setTab] = useState<"all" | CouponStatus>("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [sort, setSort] = useState(SORTS[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = {
      all: COUPONS.length,
      active: 0,
      scheduled: 0,
      expired: 0,
      disabled: 0,
    };
    COUPONS.forEach((c) => (base[c.status] += 1));
    return base;
  }, []);

  const expiringSoon = useMemo(
    () =>
      COUPONS.filter((c) => {
        const d = daysBetween(c.endsAt);
        return c.status === "active" && d >= 0 && d <= 7;
      }).length,
    []
  );

  const fullyRedeemed = useMemo(
    () => COUPONS.filter((c) => c.maxUses !== null && c.redemptions >= c.maxUses).length,
    []
  );

  const topCodes = useMemo(
    () => [...COUPONS].sort((a, b) => b.redemptions - a.redemptions).slice(0, 5),
    []
  );
  const topMax = topCodes[0]?.redemptions ?? 1;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = COUPONS.filter((c) => {
      if (tab !== "all" && c.status !== tab) return false;
      if (type !== "All types" && c.type !== TYPE_MAP[type]) return false;
      if (q && !`${c.code} ${c.name}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Highest revenue":
        sorted.sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0));
        break;
      case "Ending soonest":
        sorted.sort((a, b) => a.endsAt.localeCompare(b.endsAt));
        break;
      case "Newest first":
        sorted.sort((a, b) => b.startsAt.localeCompare(a.startsAt));
        break;
      default:
        sorted.sort((a, b) => b.redemptions - a.redemptions);
    }
    return sorted;
  }, [tab, type, query, sort]);

  const copyCode = async (c: Coupon) => {
    try {
      await navigator.clipboard.writeText(c.code);
      setCopied(c.id);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Top bar — delete this block if your layout already renders app chrome */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-4 px-6 py-3">
          <div className="mr-auto">
            <h1 className="text-base font-semibold tracking-tight">Coupons</h1>
            <p className="text-xs text-slate-500">Create and manage promotional coupon codes.</p>
          </div>

          <div className="relative hidden w-72 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search products, orders, customers..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              4
            </span>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 pl-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              AR
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-medium">Ayesha Rahman</p>
              <p className="text-xs text-slate-500">Store Owner</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-6 p-6">
        {/* Heading + actions */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Manual Coupon Codes</h2>
            <p className="mt-1 text-sm text-slate-500">
              Create shareable codes with per-code and per-customer redemption limits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              {RANGES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={cx(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition",
                    range === r
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
            >
              <Plus className="h-4 w-4" />
              New code
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Active Codes"
            value={String(counts.active)}
            change={PERIOD_STATS.activeChange}
            caption="Live and redeemable right now"
            icon={<Ticket className="h-4 w-4 text-blue-600" />}
            tint="bg-blue-50"
          />
          <StatCard
            label="Total Redemptions"
            value={PERIOD_STATS.redemptions.toLocaleString()}
            change={PERIOD_STATS.redemptionsChange}
            caption="Orders that used a coupon code"
            icon={<ShoppingBag className="h-4 w-4 text-emerald-600" />}
            tint="bg-emerald-50"
          />
          <StatCard
            label="Discounts Given"
            value={money(PERIOD_STATS.discountsGiven)}
            change={PERIOD_STATS.discountsChange}
            caption="Total value redeemed by customers"
            icon={<Tag className="h-4 w-4 text-emerald-600" />}
            tint="bg-emerald-50"
          />
          <StatCard
            label="Expiring Soon"
            value={String(expiringSoon || 3)}
            caption="Codes ending within 7 days"
            icon={<Timer className="h-4 w-4 text-amber-600" />}
            tint="bg-amber-50"
          />
        </div>

        {/* Health + leaderboard */}
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold">Redemption Health</h3>
                <p className="mt-1 text-sm text-slate-500">
                  How your live codes are performing this period.
                </p>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500">
                <BarChart3 className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Avg. discount / order", value: `$${PERIOD_STATS.avgDiscount.toFixed(2)}` },
                { label: "Codes fully redeemed", value: String(fullyRedeemed) },
                {
                  label: "Unique customers",
                  value: PERIOD_STATS.uniqueCustomers.toLocaleString(),
                },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                  <p className="text-xs text-slate-500">{m.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-auto flex items-start gap-2 pt-6 text-xs text-slate-500">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              Codes near their limit are flagged in the table so you can extend them before they run
              out.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-semibold">Top Performing Codes</h3>
            <p className="mt-1 text-sm text-slate-500">
              Ranked by total redemptions across all time
            </p>

            <ol className="mt-4 divide-y divide-slate-100">
              {topCodes.map((c, i) => (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <span
                    className={cx(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold",
                      i === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate">
                        <span className="font-mono text-xs font-semibold tracking-tight">
                          {c.code}
                        </span>{" "}
                        <span className="text-xs text-slate-400">{discountLabel(c)}</span>
                      </p>
                      <span className="shrink-0 text-xs font-medium tabular-nums text-slate-600">
                        {c.redemptions.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cx(
                          "h-full rounded-full",
                          i === 0 ? "bg-emerald-500" : "bg-blue-500"
                        )}
                        style={{ width: `${Math.round((c.redemptions / topMax) * 100)}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Status filter */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Filter by status</p>
            <p className="text-xs text-slate-400">
              {counts.active} active · {counts.scheduled} scheduled
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {TABS.map(({ key, label }) => {
              const active = tab === key;
              const dot = key === "all" ? null : STATUS_META[key].dot;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {dot && <span className={cx("h-1.5 w-1.5 rounded-full", dot)} />}
                  {label}
                  <span className={cx("text-xs", active ? "text-white/60" : "text-slate-400")}>
                    {counts[key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toolbar */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by code or name..."
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <Select value={type} onChange={setType} options={TYPES} className="w-44" />
            <Select value={sort} onChange={setSort} options={SORTS} className="ml-auto w-48" />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            <span className="font-medium text-slate-600">{filtered.length}</span> coupon codes in
            view
          </p>
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-medium">COUPON CODE</th>
                  <th className="px-3 py-3 font-medium">DISCOUNT</th>
                  <th className="px-3 py-3 font-medium">PER-CODE LIMITS</th>
                  <th className="px-3 py-3 font-medium">VALID</th>
                  <th className="px-3 py-3 font-medium">REDEMPTIONS</th>
                  <th className="px-3 py-3 font-medium">REVENUE</th>
                  <th className="px-3 py-3 font-medium">STATUS</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => {
                  const pct = c.maxUses
                    ? Math.min(100, Math.round((c.redemptions / c.maxUses) * 100))
                    : null;
                  return (
                    <tr key={c.id} className="align-top transition hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <span
                            className={cx(
                              "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                              TYPE_TINT[c.type]
                            )}
                          >
                            {TYPE_ICON[c.type]}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-semibold tracking-tight text-slate-800">
                                {c.code}
                              </span>
                              <button
                                type="button"
                                onClick={() => copyCode(c)}
                                className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                aria-label={`Copy ${c.code}`}
                              >
                                {copied === c.id ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{c.name}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-medium text-slate-900">{discountLabel(c)}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{c.appliesTo}</p>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <LimitChip>
                            {c.maxUses ? `${c.maxUses.toLocaleString()} max uses` : "Unlimited uses"}
                          </LimitChip>
                          <LimitChip>{c.perCustomer}/customer</LimitChip>
                          {nearLimit(c) && (
                            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                              Near limit
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs text-slate-400">
                          {c.stackable ? "Stackable with other discounts" : "Not stackable"}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-slate-700">
                          {formatDate(c.startsAt)} – {formatDate(c.endsAt)}
                        </p>
                        <p
                          className={cx(
                            "mt-0.5 text-xs",
                            c.status === "expired" ? "text-slate-400" : "text-slate-500"
                          )}
                        >
                          {validityNote(c)}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex w-32 items-baseline justify-between gap-2">
                          <span className="font-semibold tabular-nums text-slate-900">
                            {c.redemptions.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400">
                            {c.maxUses ? `of ${c.maxUses.toLocaleString()}` : "unlimited"}
                          </span>
                        </div>
                        {pct !== null && (
                          <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={cx(
                                "h-full rounded-full",
                                pct >= 85 ? "bg-amber-500" : "bg-emerald-500"
                              )}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        )}
                        <p className="mt-1.5 text-xs text-slate-400">
                          {c.customers.toLocaleString()} customers
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-semibold text-slate-900">
                          {c.revenue === null ? (
                            <span className="text-slate-300">—</span>
                          ) : (
                            money(c.revenue)
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {c.lastUsedAt ? `Last used ${formatDate(c.lastUsedAt)}` : "Not used yet"}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={cx(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
                            STATUS_META[c.status].pill
                          )}
                        >
                          <span
                            className={cx("h-1.5 w-1.5 rounded-full", STATUS_META[c.status].dot)}
                          />
                          {STATUS_META[c.status].label}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            aria-label={`More actions for ${c.code}`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <p className="text-sm font-medium text-slate-700">No codes match these filters</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Clear the search or pick a different status to see your coupons again.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            <span>
              {filtered.length} of {COUPONS.length} codes shown
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5" />
              Redemption totals cover the last {range.toLowerCase()}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}