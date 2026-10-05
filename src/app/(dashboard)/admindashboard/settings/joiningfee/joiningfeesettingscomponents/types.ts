export interface PlanFee {
  id: string;
  plan: string; // plan er naam, Subscription page er plan er sathe mile
  amount: number;
}

export interface Waiver {
  id: string;
  code: string;
  percent: number; // 100 mane puro fee maf
}

export interface Settings {
  enabled: boolean;
  fees: PlanFee[];
  refundDays: number;
  allowWaivers: boolean;
  waivers: Waiver[];
}

// key e field er jayga thake, jemon "fee.<id>"
export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;