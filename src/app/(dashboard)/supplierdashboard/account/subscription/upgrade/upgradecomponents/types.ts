export type PlanId = "basic" | "professional" | "business";
export type Cycle = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  rank: number; // upgrade/downgrade bujhar jonno
  features: string[];
}

export interface CurrentSub {
  planId: PlanId;
  cycle: Cycle;
}

export interface CompareRow {
  label: string;
  values: Record<PlanId, string | boolean>; // true = check, false = dash
}

export interface Faq {
  q: string;
  a: string;
}

export interface Perk {
  icon: "products" | "analytics" | "tools";
  title: string;
  description: string;
}