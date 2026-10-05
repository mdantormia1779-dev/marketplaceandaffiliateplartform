import { MAX_GRACE_DAYS, MAX_NAME, MAX_TRIAL_DAYS } from "../data";
import { Errors, Settings } from "./types";

export const planKey = (id: string, field: "name" | "price" | "features") => `plan.${id}.${field}`;
export const featureKey = (planId: string, featureId: string) => `plan.${planId}.feature.${featureId}`;
export const behaviorKey = (field: "trialDays" | "graceDays") => `behavior.${field}`;

// plan er jekono error ache kina (card kholar jonno)
export const planHasError = (errors: Errors, planId: string) =>
  Object.keys(errors).some((k) => k.startsWith(`plan.${planId}.`));

const isWhole = (n: number, max: number) => Number.isFinite(n) && Number.isInteger(n) && n >= 0 && n <= max;

export function validate(s: Settings): Errors {
  const e: Errors = {};

  if (s.plans.length === 0) e.plans = "Add at least one plan.";

  const names = new Set<string>();
  s.plans.forEach((p) => {
    const name = p.name.trim();
    const lower = name.toLowerCase();
    if (!name) e[planKey(p.id, "name")] = "Enter a plan name.";
    else if (name.length > MAX_NAME) e[planKey(p.id, "name")] = `Use ${MAX_NAME} characters or fewer.`;
    else if (names.has(lower)) e[planKey(p.id, "name")] = "Plan names must be different.";
    else names.add(lower);

    if (!Number.isFinite(p.price) || p.price < 0) e[planKey(p.id, "price")] = "Enter 0 or more.";

    const filled = p.features.filter((x) => x.text.trim());
    if (filled.length === 0) {
      e[planKey(p.id, "features")] = "Add at least one feature.";
    } else {
      p.features.forEach((x) => {
        if (!x.text.trim()) e[featureKey(p.id, x.id)] = "Enter a feature or remove this line.";
      });
    }
  });

  const b = s.behavior;
  if (!isWhole(b.trialDays, MAX_TRIAL_DAYS)) {
    e[behaviorKey("trialDays")] = `Use a whole number from 0 to ${MAX_TRIAL_DAYS}.`;
  }
  if (!isWhole(b.graceDays, MAX_GRACE_DAYS)) {
    e[behaviorKey("graceDays")] = `Use a whole number from 0 to ${MAX_GRACE_DAYS}.`;
  }

  return e;
}