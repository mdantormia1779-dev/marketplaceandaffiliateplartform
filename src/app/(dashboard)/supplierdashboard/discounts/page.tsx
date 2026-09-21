"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
  Gift,
  Info,
  MessageSquare,
  MoreVertical,
  Package,
  Pencil,
  Percent,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type RuleStatus = "active" | "scheduled" | "paused" | "expired";
type DiscountKind = "percentage" | "fixed" | "bundle" | "bxgy";

type Rule = {
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
};

/** Swap for `new Date()` once this is wired to real data. */
const TODAY = new Date("2026-09-19T00:00:00Z");

const RULES: Rule[] = [
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
const PERIOD_STATS = {
  activeChange: 25,
  scheduledChange: 50,
  uses: 9284,
  usesChange: 18.6,
  discountsGiven: 18400,
  discountsChange: 14.2,
};

/** Six-week window drawn by the campaign schedule. */
const WINDOW_START = "2026-09-10";
const WINDOW_END = "2026-10-15";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const DAY = 86_400_000;
const toTime = (iso: string) => new Date(`${iso}T00:00:00Z`).getTime();
const daysFromToday = (iso: string) => Math.round((toTime(iso) - TODAY.getTime()) / DAY);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string, withYear = true) {
  const [y, m, d] = iso.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${d}`;
}

function formatStamp(t: number) {
  const d = new Date(t);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function money(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

const STATUS_META: Record<RuleStatus, { label: string; pill: string; dot: string }> = {
  active: {
    label: "Active",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
  },
  scheduled: {
    label: "Scheduled",
    pill: "bg-slate-100 text-slate-600 ring-slate-500/20",
    dot: "bg-slate-400",
  },
  paused: {
    label: "Paused",
    pill: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
  },
  expired: {
    label: "Expired",
    pill: "bg-slate-100 text-slate-500 ring-slate-500/20",
    dot: "bg-slate-300",
  },
};

const KIND_META: Record<
  DiscountKind,
  { label: string; icon: React.ReactNode; tint: string }
> = {
  percentage: {
    label: "Percentage",
    icon: <Percent className="h-4 w-4" />,
    tint: "bg-violet-50 text-violet-600",
  },
  fixed: {
    label: "Fixed Amount",
    icon: <CircleDollarSign className="h-4 w-4" />,
    tint: "bg-emerald-50 text-emerald-600",
  },
  bundle: {
    label: "Bundle",
    icon: <Package className="h-4 w-4" />,
    tint: "bg-sky-50 text-sky-600",
  },
  bxgy: {
    label: "Buy X Get Y",
    icon: <Gift className="h-4 w-4" />,
    tint: "bg-teal-50 text-teal-600",
  },
};

function scheduleNote(r: Rule) {
  if (r.status === "paused") return "Paused";
  if (r.status === "expired") return `Ended ${formatDate(r.endsAt, false)}`;
  const start = daysFromToday(r.startsAt);
  if (start > 0) return start === 1 ? "Starts tomorrow" : `Starts in ${start} days`;
  const end = daysFromToday(r.endsAt);
  if (end <= 0) return "Ending today";
  return end === 1 ? "Ends tomorrow" : `Ends in ${end} days`;
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

function StatusPill({ status }: { status: RuleStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        meta.pill
      )}
    >
      <span className={cx("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
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

function ChannelChips({ channels }: { channels: string[] }) {
  const shown = channels.slice(0, 2);
  const rest = channels.length - shown.length;
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
      {shown.map((ch) => (
        <span
          key={ch}
          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
        >
          {ch}
        </span>
      ))}
      {rest > 0 && (
        <span
          className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500"
          title={channels.slice(2).join(", ")}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Campaign schedule (gantt)                                          */
/* ------------------------------------------------------------------ */

function CampaignSchedule({ rules }: { rules: Rule[] }) {
  const start = toTime(WINDOW_START);
  const end = toTime(WINDOW_END);
  const span = end - start;

  const pct = (t: number) => ((t - start) / span) * 100;
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const lanes = rules
    .filter(
      (r) =>
        ["active", "scheduled"].includes(r.status) &&
        toTime(r.endsAt) <= end &&
        toTime(r.endsAt) >= start
    )
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const alwaysOn = rules.filter(
    (r) => ["active", "scheduled"].includes(r.status) && toTime(r.endsAt) > end
  ).length;

  const ticks = Array.from({ length: 6 }, (_, i) => start + i * 7 * DAY);
  const todayPct = clamp(pct(TODAY.getTime()));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-500">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Campaign Schedule</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Timing of automatic rules across the next six weeks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Scheduled
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Axis */}
          <div className="flex items-end">
            <div className="w-32 shrink-0" />
            <div className="relative h-5 flex-1">
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute top-0 -translate-x-1/2 text-[11px] text-slate-400"
                  style={{ left: `${clamp(pct(t))}%` }}
                >
                  {formatStamp(t)}
                </span>
              ))}
            </div>
            <div className="w-24 shrink-0" />
          </div>

          {/* Lanes */}
          <div className="relative mt-2">
            {lanes.map((r, i) => {
              const left = clamp(pct(toTime(r.startsAt)));
              const right = clamp(pct(toTime(r.endsAt)));
              const width = Math.max(right - left, 2);
              const isActive = r.status === "active";

              return (
                <div key={r.id} className="flex items-center">
                  <div className="w-32 shrink-0 pr-3">
                    <p className="truncate text-xs font-medium text-slate-700">{r.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {formatDate(r.startsAt, false)} – {formatDate(r.endsAt, false)}
                    </p>
                  </div>

                  <div
                    className={cx(
                      "relative h-[34px] flex-1 border-b border-slate-100",
                      i === 0 && "border-t"
                    )}
                  >
                    {/* week gridlines */}
                    {ticks.map((t) => (
                      <span
                        key={t}
                        className="absolute inset-y-0 w-px bg-slate-100"
                        style={{ left: `${clamp(pct(t))}%` }}
                      />
                    ))}

                    <div
                      className={cx(
                        "absolute top-1/2 flex h-6 -translate-y-1/2 items-center overflow-hidden rounded-md px-2 text-[11px] font-medium shadow-sm transition",
                        isActive ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"
                      )}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={`${r.name} · ${formatDate(r.startsAt)} – ${formatDate(r.endsAt)}`}
                    >
                      <span className="truncate">{r.shortCondition}</span>
                    </div>
                  </div>

                  <div className="w-24 shrink-0 pl-3 text-right">
                    <StatusPill status={r.status} />
                  </div>
                </div>
              );
            })}

            {/* Today marker spans every lane */}
            <div
              className="pointer-events-none absolute inset-y-0"
              style={{ left: `calc(8rem + (100% - 14rem) * ${todayPct / 100})` }}
            >
              <span className="absolute -top-2 -translate-x-1/2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Today
              </span>
              <span className="absolute inset-y-0 w-px bg-emerald-500/70" />
            </div>
          </div>
        </div>
      </div>

      {alwaysOn > 0 && (
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
          Plus {alwaysOn} always-on rules running beyond this period.
        </p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const RANGES = ["7 days", "30 days", "90 days"];
const TABS: Array<{ key: "all" | RuleStatus; label: string }> = [
  { key: "all", label: "All rules" },
  { key: "active", label: "Active" },
  { key: "scheduled", label: "Scheduled" },
  { key: "paused", label: "Paused" },
  { key: "expired", label: "Expired" },
];
const TYPES = ["All types", "Percentage", "Fixed Amount", "Bundle", "Buy X Get Y"];
const TYPE_MAP: Record<string, DiscountKind> = {
  Percentage: "percentage",
  "Fixed Amount": "fixed",
  Bundle: "bundle",
  "Buy X Get Y": "bxgy",
};
const SORTS = [
  "Priority (high → low)",
  "Priority (low → high)",
  "Most used",
  "Highest revenue",
  "Ending soonest",
];
const PAGE_SIZE = 8;

export default function DiscountsPage() {
  const [range, setRange] = useState("30 days");
  const [tab, setTab] = useState<"all" | RuleStatus>("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [sort, setSort] = useState(SORTS[0]);
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const base: Record<string, number> = {
      all: RULES.length,
      active: 0,
      scheduled: 0,
      paused: 0,
      expired: 0,
    };
    RULES.forEach((r) => (base[r.status] += 1));
    return base;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = RULES.filter((r) => {
      if (tab !== "all" && r.status !== tab) return false;
      if (type !== "All types" && r.kind !== TYPE_MAP[type]) return false;
      if (q && !`${r.name} ${r.ref} ${r.condition}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Priority (low → high)":
        sorted.sort((a, b) => b.priority - a.priority);
        break;
      case "Most used":
        sorted.sort((a, b) => b.usage - a.usage);
        break;
      case "Highest revenue":
        sorted.sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0));
        break;
      case "Ending soonest":
        sorted.sort((a, b) => a.endsAt.localeCompare(b.endsAt));
        break;
      default:
        sorted.sort((a, b) => a.priority - b.priority);
    }
    return sorted;
  }, [tab, type, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Top bar — delete this block if your layout already renders app chrome */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-4 px-6 py-3">
          <div className="mr-auto">
            <h1 className="text-base font-semibold tracking-tight">Discounts</h1>
            <p className="text-xs text-slate-500">Set up automatic discounts for your products.</p>
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
            <h2 className="text-lg font-semibold tracking-tight">Automatic Discounts</h2>
            <p className="mt-1 text-sm text-slate-500">
              Build rules that apply themselves at checkout, and schedule exactly when they run.
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
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              <Plus className="h-4 w-4" />
              New rule
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Active Rules"
            value={String(counts.active)}
            change={PERIOD_STATS.activeChange}
            caption="Auto-applying right now"
            icon={<Zap className="h-4 w-4 text-blue-600" />}
            tint="bg-blue-50"
          />
          <StatCard
            label="Scheduled"
            value={String(counts.scheduled)}
            change={PERIOD_STATS.scheduledChange}
            caption="Queued for a future date"
            icon={<CalendarClock className="h-4 w-4 text-slate-600" />}
            tint="bg-slate-100"
          />
          <StatCard
            label="Discount Uses"
            value={PERIOD_STATS.uses.toLocaleString()}
            change={PERIOD_STATS.usesChange}
            caption="Orders with an auto discount"
            icon={<ShoppingCart className="h-4 w-4 text-emerald-600" />}
            tint="bg-emerald-50"
          />
          <StatCard
            label="Discounts Given"
            value={money(PERIOD_STATS.discountsGiven)}
            change={PERIOD_STATS.discountsChange}
            caption="Total value discounted"
            icon={<Tag className="h-4 w-4 text-emerald-600" />}
            tint="bg-emerald-50"
          />
        </div>

        <CampaignSchedule rules={RULES} />

        {/* Status filter */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Filter by status</p>
            <p className="text-xs text-slate-400">
              {counts.active} running · {counts.scheduled} scheduled
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
                  onClick={() => {
                    setTab(key);
                    setPage(1);
                  }}
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
                onChange={(e) => resetPage(setQuery)(e.target.value)}
                placeholder="Search rules by name or condition..."
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <Select value={type} onChange={resetPage(setType)} options={TYPES} className="w-44" />
            <Select value={sort} onChange={setSort} options={SORTS} className="ml-auto w-52" />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            <span className="font-medium text-slate-600">{filtered.length}</span> rules in view
          </p>
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1140px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-medium">RULE</th>
                  <th className="px-3 py-3 font-medium">DISCOUNT</th>
                  <th className="px-3 py-3 font-medium">CONDITION</th>
                  <th className="px-3 py-3 font-medium">SCHEDULE</th>
                  <th className="px-3 py-3 font-medium">USAGE</th>
                  <th className="px-3 py-3 font-medium">REVENUE</th>
                  <th className="px-3 py-3 font-medium">STATUS</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visible.map((r) => {
                  const kind = KIND_META[r.kind];
                  const pct = r.maxUses
                    ? Math.min(100, Math.round((r.usage / r.maxUses) * 100))
                    : null;
                  return (
                    <tr key={r.id} className="align-top transition hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <span
                            className={cx(
                              "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                              kind.tint
                            )}
                          >
                            {kind.icon}
                          </span>
                          <div>
                            <p className="font-medium text-slate-900">{r.name}</p>
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                              {r.ref}
                              <span className="text-slate-300">|</span>
                              <span className="inline-flex items-center gap-1 text-slate-500">
                                <Zap className="h-3 w-3 text-blue-500" />
                                Auto-apply
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-medium text-slate-900">{kind.label}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{r.valueLabel}</p>
                      </td>

                      <td className="px-3 py-4">
                        <p className="max-w-[200px] text-slate-700">{r.condition}</p>
                        <ChannelChips channels={r.channels} />
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-slate-700">
                          {formatDate(r.startsAt)} – {formatDate(r.endsAt)}
                        </p>
                        <p
                          className={cx(
                            "mt-0.5 text-xs",
                            r.status === "expired" || r.status === "paused"
                              ? "text-slate-400"
                              : "text-slate-500"
                          )}
                        >
                          {scheduleNote(r)}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex w-32 items-baseline justify-between gap-2">
                          <span className="font-semibold tabular-nums text-slate-900">
                            {r.usage.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400">
                            {r.maxUses ? `of ${r.maxUses.toLocaleString()}` : "unlimited"}
                          </span>
                        </div>
                        {pct !== null && (
                          <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-semibold text-slate-900">
                          {r.revenue === null ? (
                            <span className="text-slate-300">—</span>
                          ) : (
                            money(r.revenue)
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">Influenced sales</p>
                      </td>

                      <td className="px-3 py-4">
                        <StatusPill status={r.status} />
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
                            aria-label={`More actions for ${r.name}`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {visible.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <p className="text-sm font-medium text-slate-700">
                        No rules match these filters
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Clear the search or pick a different status to see your rules again.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            <span>
              {visible.length} of {filtered.length} rules shown
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Automatic rules apply at checkout without a coupon code
            </span>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}-
              {(current - 1) * PAGE_SIZE + visible.length}
            </span>{" "}
            of <span className="font-medium text-slate-700">{filtered.length}</span>
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((n) => Math.max(1, n - 1))}
              disabled={current === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === current ? "page" : undefined}
                className={cx(
                  "h-8 w-8 rounded-lg text-sm font-medium transition",
                  n === current
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((n) => Math.min(pageCount, n + 1))}
              disabled={current === pageCount}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}