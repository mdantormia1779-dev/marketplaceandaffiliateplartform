import type { DiscountKind, Rule } from "./data";

export interface RuleFormState {
  name: string;
  kind: DiscountKind;
  numericValue: string;
  customValueLabel: string;
  condition: string;
  channels: string[];
  startsAt: string;
  endsAt: string;
  maxUses: string;
}

export const emptyRuleFormState: RuleFormState = {
  name: "",
  kind: "percentage",
  numericValue: "",
  customValueLabel: "",
  condition: "",
  channels: [],
  startsAt: "",
  endsAt: "",
  maxUses: "",
};

function parseValueLabel(kind: DiscountKind, valueLabel: string) {
  if (kind === "percentage" || kind === "fixed") {
    const match = valueLabel.match(/[\d.]+/);
    return { numericValue: match ? match[0] : "", customValueLabel: "" };
  }
  return { numericValue: "", customValueLabel: valueLabel };
}

/** Prefills the form when opening the Edit dialog for an existing rule. */
export function stateFromRule(rule: Rule): RuleFormState {
  const { numericValue, customValueLabel } = parseValueLabel(rule.kind, rule.valueLabel);
  return {
    name: rule.name,
    kind: rule.kind,
    numericValue,
    customValueLabel,
    condition: rule.condition,
    channels: rule.channels,
    startsAt: rule.startsAt,
    endsAt: rule.endsAt,
    maxUses: rule.maxUses !== null ? String(rule.maxUses) : "",
  };
}

export function validateRuleForm(form: RuleFormState): string | null {
  if (!form.name.trim()) return "Rule name is required.";
  if (!form.startsAt || !form.endsAt) return "Start and end dates are required.";
  if (form.startsAt > form.endsAt) return "Start date must be before end date.";
  if (form.channels.length === 0) return "Select at least one channel.";

  const isNumericKind = form.kind === "percentage" || form.kind === "fixed";
  if (isNumericKind) {
    const num = Number(form.numericValue);
    if (!form.numericValue || Number.isNaN(num) || num <= 0) {
      return "Enter a valid discount value.";
    }
  } else if (!form.customValueLabel.trim()) {
    return "Describe the offer (e.g. Buy 2 get 1 free).";
  }
  return null;
}

export function buildValueLabel(form: RuleFormState): string {
  if (form.kind === "percentage") return `${Number(form.numericValue)}% off`;
  if (form.kind === "fixed") return `$${Number(form.numericValue)} off`;
  return form.customValueLabel.trim();
}