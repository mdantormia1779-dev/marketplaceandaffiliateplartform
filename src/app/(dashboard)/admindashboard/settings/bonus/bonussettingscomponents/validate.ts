import { MAX_BONUS, MAX_CONVERSIONS } from "./data";
import { Errors, Settings } from "./types";

const badAmount = (n: number) => !Number.isFinite(n) || n < 0 || n > MAX_BONUS;
const amountMsg = `Use 0 to ${MAX_BONUS.toLocaleString("en-US")}.`;

export function validate(s: Settings): Errors {
  const e: Errors = {};
  // bonus bondho thakle kono field edit kora jay na, tai validate o kori na
  if (!s.enabled) return e;

  // protita amount shudhu tar program on thakle validate hoy
  if (s.quarterlyEnabled && badAmount(s.quarterlyAmount)) e.quarterlyAmount = amountMsg;
  if (s.seasonalEnabled && badAmount(s.seasonalAmount)) e.seasonalAmount = amountMsg;

  if (s.welcomeEnabled) {
    if (badAmount(s.welcomeAmount)) e.welcomeAmount = amountMsg;
    const c = s.welcomeConversions;
    if (!Number.isFinite(c) || !Number.isInteger(c) || c < 1 || c > MAX_CONVERSIONS) {
      e.welcomeConversions = `Use a whole number from 1 to ${MAX_CONVERSIONS.toLocaleString("en-US")}.`;
    }
  }

  return e;
}