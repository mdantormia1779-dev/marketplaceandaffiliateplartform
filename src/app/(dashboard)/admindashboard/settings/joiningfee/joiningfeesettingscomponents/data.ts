import { Settings } from "./types";

export const MAX_FEE = 100000;
export const MAX_REFUND_DAYS = 365;
export const MAX_CODE = 20;
export const MAX_WAIVERS = 20;

// Pore ei data API theke load korbi (useJoiningFeeSettings e)
export const INITIAL_SETTINGS: Settings = {
  enabled: true,
  fees: [
    { id: "starter", plan: "Starter", amount: 99 },
    { id: "growth", plan: "Growth", amount: 199 },
    { id: "elite", plan: "Elite", amount: 399 },
  ],
  refundDays: 30,
  allowWaivers: true,
  waivers: [
    { id: "w1", code: "WELCOME50", percent: 50 },
    { id: "w2", code: "FREEJOIN", percent: 100 },
  ],
};