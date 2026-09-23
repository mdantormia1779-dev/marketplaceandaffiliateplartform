import { TODAY, type Rule, type RuleStatus, type DiscountKind } from "./data";

export const DAY = 86_400_000;
export const toTime = (iso: string) => new Date(`${iso}T00:00:00Z`).getTime();
export const daysFromToday = (iso: string) => Math.round((toTime(iso) - TODAY.getTime()) / DAY);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(iso: string, withYear = true) {
  const [y, m, d] = iso.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${d}`;
}

export function formatStamp(t: number) {
  const d = new Date(t);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function money(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

export function scheduleNote(r: Rule) {
  if (r.status === "paused") return "Paused";
  if (r.status === "expired") return `Ended ${formatDate(r.endsAt, false)}`;
  const start = daysFromToday(r.startsAt);
  if (start > 0) return start === 1 ? "Starts tomorrow" : `Starts in ${start} days`;
  const end = daysFromToday(r.endsAt);
  if (end <= 0) return "Ending today";
  return end === 1 ? "Ends tomorrow" : `Ends in ${end} days`;
}

export function computeStatus(startsAt: string, endsAt: string): RuleStatus {
  const start = toTime(startsAt);
  const end = toTime(endsAt);
  const now = TODAY.getTime();
  if (now < start) return "scheduled";
  if (now > end) return "expired";
  return "active";
}

const KIND_LABEL: Record<DiscountKind, string> = {
  percentage: "Percentage",
  fixed: "Fixed Amount",
  bundle: "Bundle",
  bxgy: "Buy X Get Y",
};

const STATUS_LABEL: Record<RuleStatus, string> = {
  active: "Active",
  scheduled: "Scheduled",
  paused: "Paused",
  expired: "Expired",
};

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function rulesToCsv(rules: Rule[]) {
  const headers = [
    "Rule Name",
    "Reference",
    "Type",
    "Discount",
    "Condition",
    "Channels",
    "Start Date",
    "End Date",
    "Usage",
    "Max Uses",
    "Revenue",
    "Status",
  ];

  const rows = rules.map((r) => [
    r.name,
    r.ref,
    KIND_LABEL[r.kind],
    r.valueLabel,
    r.condition,
    r.channels.join("; "),
    r.startsAt,
    r.endsAt,
    String(r.usage),
    r.maxUses !== null ? String(r.maxUses) : "Unlimited",
    r.revenue !== null ? String(r.revenue) : "",
    STATUS_LABEL[r.status],
  ]);

  const lines = [headers, ...rows].map((row) => row.map(csvEscape).join(","));
  return lines.join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}