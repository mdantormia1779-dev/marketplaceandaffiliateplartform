import { DateRange } from "./types";

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-US")}`;

export const formatDate = (iso: string, month: "long" | "short" = "short") =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month, year: "numeric" });

export const formatMonthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export function inRange(iso: string, range: DateRange) {
  if (range === "all") return true;
  const d = new Date(iso);
  const now = new Date();
  if (range === "year") return d.getFullYear() === now.getFullYear();
  const days = range === "30d" ? 30 : 90;
  return now.getTime() - d.getTime() <= days * 86_400_000;
}