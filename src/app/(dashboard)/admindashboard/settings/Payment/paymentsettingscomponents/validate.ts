import { MAX_AMOUNT, MAX_GATEWAY_FIXED, MAX_GATEWAY_PERCENT } from "./data";
import { Errors, Settings } from "./types";

export const gatewayKey = (id: string, field: "percent" | "fixed") => `gateway.${id}.${field}`;

// gateway er jekono error ache kina (editor kholar jonno)
export const gatewayHasError = (errors: Errors, id: string) =>
  Object.keys(errors).some((k) => k.startsWith(`gateway.${id}.`));

const bad = (n: number, max: number) => !Number.isFinite(n) || n < 0 || n > max;

export function validate(s: Settings): Errors {
  const e: Errors = {};

  if (!s.gateways.some((g) => g.active)) {
    e.gateways = "Keep at least one gateway active so customers can check out.";
  }
  s.gateways.forEach((g) => {
    if (bad(g.percent, MAX_GATEWAY_PERCENT)) e[gatewayKey(g.id, "percent")] = `Use 0 to ${MAX_GATEWAY_PERCENT}.`;
    if (bad(g.fixed, MAX_GATEWAY_FIXED)) e[gatewayKey(g.id, "fixed")] = `Use 0 to ${MAX_GATEWAY_FIXED}.`;
  });

  if (bad(s.minWithdrawal, MAX_AMOUNT)) e.minWithdrawal = `Use 0 to ${MAX_AMOUNT.toLocaleString("en-US")}.`;
  if (bad(s.processingFee, 100)) e.processingFee = "Use 0 to 100.";

  if (bad(s.autoApproveUnder, MAX_AMOUNT)) {
    e.autoApproveUnder = `Use 0 to ${MAX_AMOUNT.toLocaleString("en-US")}.`;
  } else if (s.autoApproveUnder > 0 && Number.isFinite(s.minWithdrawal) && s.autoApproveUnder < s.minWithdrawal) {
    e.autoApproveUnder = "Must be at least the minimum withdrawal, or 0 to review every payout.";
  }

  return e;
}