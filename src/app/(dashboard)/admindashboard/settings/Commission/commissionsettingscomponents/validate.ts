import { MAX_HOLD_DAYS } from "./data";
import { Errors, Settings } from "./types";

const isNum = (n: number) => Number.isFinite(n);
const money = (n: number) => "$" + n.toLocaleString("en-US");

export const tierKey = (id: string, field: "name" | "minSales" | "rate" | "bonus") => `tier.${id}.${field}`;
export const ruleKey = (key: string) => `rule.${key}`;
export const overrideKey = (id: string, field: "category" | "rate") => `override.${id}.${field}`;

export function validate(s: Settings): Errors {
  const e: Errors = {};

  if (s.tiers.length === 0) e.tiers = "Add at least one tier.";
  const names = new Set<string>();
  s.tiers.forEach((t, i) => {
    const name = t.name.trim().toLowerCase();
    if (!name) e[tierKey(t.id, "name")] = "Enter a tier name.";
    else if (names.has(name)) e[tierKey(t.id, "name")] = "Tier names must be different.";
    else names.add(name);

    if (!isNum(t.minSales) || t.minSales < 0) {
      e[tierKey(t.id, "minSales")] = "Enter 0 or more.";
    } else if (i === 0 && t.minSales !== 0) {
      e[tierKey(t.id, "minSales")] = "First tier must start at $0.";
    } else if (i > 0) {
      const prev = s.tiers[i - 1];
      if (isNum(prev.minSales) && t.minSales <= prev.minSales) {
        e[tierKey(t.id, "minSales")] = `Must be above ${money(prev.minSales)}.`;
      }
    }

    if (!isNum(t.rate) || t.rate < 0 || t.rate > 100) e[tierKey(t.id, "rate")] = "Use 0 to 100.";
    if (!isNum(t.bonus) || t.bonus < 0) e[tierKey(t.id, "bonus")] = "Enter 0 or more.";
  });

  const r = s.rules;
  (["defaultRate", "supplierRate", "affiliateRate"] as const).forEach((k) => {
    if (!isNum(r[k]) || r[k] < 0 || r[k] > 100) e[ruleKey(k)] = "Use 0 to 100.";
  });
  if (!isNum(r.minPayout) || r.minPayout < 0) e[ruleKey("minPayout")] = "Enter 0 or more.";
  if (!isNum(r.holdDays) || !Number.isInteger(r.holdDays) || r.holdDays < 0 || r.holdDays > MAX_HOLD_DAYS) {
    e[ruleKey("holdDays")] = `Use a whole number from 0 to ${MAX_HOLD_DAYS}.`;
  }

  if (r.allowOverrides) {
    const cats = new Set<string>();
    s.overrides.forEach((o) => {
      const c = o.category.trim().toLowerCase();
      if (!c) e[overrideKey(o.id, "category")] = "Enter a category.";
      else if (cats.has(c)) e[overrideKey(o.id, "category")] = "Category already added.";
      else cats.add(c);
      if (!isNum(o.rate) || o.rate < 0 || o.rate > 100) e[overrideKey(o.id, "rate")] = "Use 0 to 100.";
    });
  }

  return e;
}
