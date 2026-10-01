import { TODAY } from "./data";
import { FeaturedStatus } from "./types";

export function getStatus(start: string, end: string): FeaturedStatus {
  if (end < TODAY) return "Expired";
  if (start > TODAY) return "Scheduled";
  return "Active";
}

// YYYY-MM-DD string e din jog/biyog
export function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}