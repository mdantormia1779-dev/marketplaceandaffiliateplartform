import { MAX_REWARD, MAX_THRESHOLD } from "./data";
import { Errors, Settings } from "./types";

export const rewardKey = (id: string) => `reward.${id}`;
export const thresholdKey = "rule.threshold";

export function validate(s: Settings): Errors {
  const e: Errors = {};
  // program bondho thakle kono field edit kora jay na, tai validate o kori na
  if (!s.enabled) return e;

  s.rewards.forEach((r) => {
    if (!Number.isFinite(r.amount) || r.amount < 0 || r.amount > MAX_REWARD) {
      e[rewardKey(r.id)] = `Use 0 to ${MAX_REWARD.toLocaleString("en-US")}.`;
    }
  });

  // threshold shudhu cash reward er jonno
  if (s.rewardType === "Cash") {
    if (!Number.isFinite(s.threshold) || s.threshold < 0 || s.threshold > MAX_THRESHOLD) {
      e[thresholdKey] = `Use 0 to ${MAX_THRESHOLD.toLocaleString("en-US")}.`;
    }
  }

  return e;
}