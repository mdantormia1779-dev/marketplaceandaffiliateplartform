import { CurrentSub, Cycle, Plan } from "./types";

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-US")}`;

// yearly = 10 mash er dam (2 mash free)
export const priceFor = (plan: Plan, cycle: Cycle) =>
  cycle === "monthly" ? plan.monthlyPrice : plan.monthlyPrice * 10;

export const billedText = (cycle: Cycle) =>
  cycle === "monthly" ? "Billed monthly · cancel anytime" : "Billed yearly · 2 months free";

export interface PlanAction {
  label: string;
  isCurrent: boolean;
}

export function getAction(plan: Plan, cycle: Cycle, current: CurrentSub, currentRank: number): PlanAction {
  if (plan.id === current.planId) {
    if (cycle === current.cycle) return { label: "Current Plan", isCurrent: true };
    return { label: `Switch to ${cycle === "yearly" ? "Yearly" : "Monthly"}`, isCurrent: false };
  }
  return { label: plan.rank > currentRank ? `Upgrade to ${plan.name}` : `Choose ${plan.name}`, isCurrent: false };
}