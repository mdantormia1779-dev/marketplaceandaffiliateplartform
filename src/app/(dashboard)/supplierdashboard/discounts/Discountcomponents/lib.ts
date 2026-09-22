import { TODAY, type Rule } from "./data";

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