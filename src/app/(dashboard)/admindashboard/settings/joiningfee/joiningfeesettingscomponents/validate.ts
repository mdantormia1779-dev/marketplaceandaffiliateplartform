import { MAX_CODE, MAX_FEE, MAX_REFUND_DAYS } from "./data";
import { Errors, Settings } from "./types";

export const feeKey = (id: string) => `fee.${id}`;
export const refundKey = "rule.refundDays";
export const waiverKey = (id: string, field: "code" | "percent") => `waiver.${id}.${field}`;

export function validate(s: Settings): Errors {
  const e: Errors = {};
  // joining fee bondho thakle kono field edit kora jay na, tai validate o kori na
  if (!s.enabled) return e;

  s.fees.forEach((f) => {
    if (!Number.isFinite(f.amount) || f.amount < 0 || f.amount > MAX_FEE) {
      e[feeKey(f.id)] = `Use 0 to ${MAX_FEE.toLocaleString("en-US")}.`;
    }
  });

  const d = s.refundDays;
  if (!Number.isFinite(d) || !Number.isInteger(d) || d < 0 || d > MAX_REFUND_DAYS) {
    e[refundKey] = `Use a whole number from 0 to ${MAX_REFUND_DAYS}.`;
  }

  // waiver gulo shudhu toggle on thakle
  if (s.allowWaivers) {
    const codes = new Set<string>();
    s.waivers.forEach((w) => {
      const code = w.code.trim().toUpperCase();
      if (!code) e[waiverKey(w.id, "code")] = "Enter a code.";
      else if (code.length > MAX_CODE) e[waiverKey(w.id, "code")] = `Use ${MAX_CODE} characters or fewer.`;
      else if (codes.has(code)) e[waiverKey(w.id, "code")] = "Code already added.";
      else codes.add(code);

      if (!Number.isFinite(w.percent) || w.percent < 1 || w.percent > 100) {
        e[waiverKey(w.id, "percent")] = "Use 1 to 100.";
      }
    });
  }

  return e;
}