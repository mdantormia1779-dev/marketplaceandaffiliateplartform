import { TODAY, type Coupon } from "./data";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(iso: string, withYear = true) {
  const [y, m, d] = iso.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${d}`;
}

export function daysBetween(iso: string) {
  const target = new Date(`${iso}T00:00:00Z`).getTime();
  return Math.round((target - TODAY.getTime()) / 86_400_000);
}

export function money(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: n % 1 ? 2 : 0 })}`;
}

export function discountLabel(c: Coupon) {
  if (c.type === "shipping") return "Free shipping";
  if (c.type === "percent") return `${c.value}% off`;
  return `$${c.value} off`;
}

export function validityNote(c: Coupon) {
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
export function nearLimit(c: Coupon) {
  if (!c.maxUses || c.status !== "active") return false;
  return c.redemptions / c.maxUses >= 0.85;
}

/** Derives active/scheduled/expired from dates. "disabled" is a manual override, kept separately. */
export function computeCouponStatus(startsAt: string, endsAt: string): "active" | "scheduled" | "expired" {
  const startDays = daysBetween(startsAt);
  if (startDays > 0) return "scheduled";
  const endDays = daysBetween(endsAt);
  if (endDays < 0) return "expired";
  return "active";
}

const STATUS_LABEL: Record<Coupon["status"], string> = {
  active: "Active",
  scheduled: "Scheduled",
  expired: "Expired",
  disabled: "Disabled",
};

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function couponsToCsv(coupons: Coupon[]) {
  const headers = [
    "Code",
    "Name",
    "Discount",
    "Applies To",
    "Max Uses",
    "Per Customer",
    "Stackable",
    "Start Date",
    "End Date",
    "Redemptions",
    "Customers",
    "Revenue",
    "Status",
  ];

  const rows = coupons.map((c) => [
    c.code,
    c.name,
    discountLabel(c),
    c.appliesTo,
    c.maxUses !== null ? String(c.maxUses) : "Unlimited",
    String(c.perCustomer),
    c.stackable ? "Yes" : "No",
    c.startsAt,
    c.endsAt,
    String(c.redemptions),
    String(c.customers),
    c.revenue !== null ? String(c.revenue) : "",
    STATUS_LABEL[c.status],
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