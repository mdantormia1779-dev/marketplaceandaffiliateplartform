export type Plan = "Elite" | "Growth" | "Starter" | "Trial";
export type Billing = "Monthly" | "Yearly";
export type Status = "Active" | "Trial" | "Past Due" | "Suspended" | "Cancelled";

export interface Subscription {
  id: string;
  store: string;
  plan: Plan;
  billing: Billing;
  amount: number;
  started: string;
  renews: string;
  status: Status;
}

export type SubscriptionInput = Omit<Subscription, "id" | "status">;

export const PLANS: Plan[] = ["Elite", "Growth", "Starter", "Trial"];
export const BILLINGS: Billing[] = ["Monthly", "Yearly"];
export const STATUSES: Status[] = ["Active", "Trial", "Past Due", "Suspended", "Cancelled"];