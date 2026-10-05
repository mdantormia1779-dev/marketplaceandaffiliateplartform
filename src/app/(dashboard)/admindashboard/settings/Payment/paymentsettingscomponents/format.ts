import { Gateway } from "./types";

const num = (n: number) => (Number.isFinite(n) ? n : 0);

// $0.30
export const money2 = (n: number, symbol: string) =>
  symbol + num(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// 2.9 -> "2.9", 2.50 -> "2.5"
const trim = (n: number) => String(Number(num(n).toFixed(2)));

// "2.9% + $0.30", "2.2%", "Flat $1.00" ba "No fee"
export function feeLabel(g: Gateway, symbol: string) {
  const pct = num(g.percent) > 0 ? `${trim(g.percent)}%` : "";
  const fixed = num(g.fixed) > 0 ? money2(g.fixed, symbol) : "";
  if (pct && fixed) return `${pct} + ${fixed}`;
  if (pct) return pct;
  if (fixed) return `Flat ${fixed}`;
  return "No fee";
}