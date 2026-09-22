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