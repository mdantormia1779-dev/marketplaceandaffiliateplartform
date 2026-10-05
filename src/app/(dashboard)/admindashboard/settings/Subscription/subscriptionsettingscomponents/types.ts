export interface Feature {
  id: string;
  text: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number; // per month
  subscribers: number; // server theke ashe, ekhane edit hoy na
  popular: boolean;
  features: Feature[];
}

export interface Behavior {
  enabled: boolean;
  trialDays: number;
  graceDays: number;
  autoRenew: boolean;
  prorate: boolean;
}

export interface Settings {
  plans: Plan[];
  behavior: Behavior;
}

// key e field er jayga thake, jemon "plan.<id>.price"
export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;