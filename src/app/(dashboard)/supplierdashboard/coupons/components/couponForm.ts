import type { Coupon, DiscountType } from "./data";

export interface CouponFormState {
  code: string;
  name: string;
  type: DiscountType;
  value: string;
  appliesTo: string;
  maxUses: string;
  perCustomer: string;
  stackable: boolean;
  startsAt: string;
  endsAt: string;
}

export const emptyCouponFormState: CouponFormState = {
  code: "",
  name: "",
  type: "percent",
  value: "",
  appliesTo: "",
  maxUses: "",
  perCustomer: "1",
  stackable: false,
  startsAt: "",
  endsAt: "",
};

/** Prefills the form when opening the Edit dialog for an existing coupon. */
export function stateFromCoupon(c: Coupon): CouponFormState {
  return {
    code: c.code,
    name: c.name,
    type: c.type,
    value: c.type === "shipping" ? "" : String(c.value),
    appliesTo: c.appliesTo,
    maxUses: c.maxUses !== null ? String(c.maxUses) : "",
    perCustomer: String(c.perCustomer),
    stackable: c.stackable,
    startsAt: c.startsAt,
    endsAt: c.endsAt,
  };
}

export function validateCouponForm(form: CouponFormState, existingCodes: string[]): string | null {
  if (!form.code.trim()) return "Coupon code is required.";
  if (existingCodes.includes(form.code.trim().toUpperCase())) {
    return "This code is already in use — pick a different one.";
  }
  if (!form.name.trim()) return "Give the coupon a short name.";

  if (form.type !== "shipping") {
    const num = Number(form.value);
    if (!form.value || Number.isNaN(num) || num <= 0) return "Enter a valid discount value.";
    if (form.type === "percent" && num > 100) return "Percent off can't exceed 100.";
  }

  if (!form.startsAt || !form.endsAt) return "Start and end dates are required.";
  if (form.startsAt > form.endsAt) return "Start date must be before end date.";

  const perCustomer = Number(form.perCustomer);
  if (!form.perCustomer || Number.isNaN(perCustomer) || perCustomer <= 0) {
    return "Per-customer limit must be at least 1.";
  }

  if (form.maxUses.trim()) {
    const maxUses = Number(form.maxUses);
    if (Number.isNaN(maxUses) || maxUses <= 0) return "Max uses must be a positive number.";
  }

  return null;
}

export function buildCouponValue(form: CouponFormState): number {
  return form.type === "shipping" ? 0 : Number(form.value);
}