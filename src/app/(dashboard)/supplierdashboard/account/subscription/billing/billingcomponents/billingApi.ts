import { BillingData, PaymentMethod, Subscription } from "./types";

const BASE = process.env.NEXT_PUBLIC_BILLING_API ?? "/api/supplier/billing";

async function request<T>(init?: RequestInit): Promise<T> {
  const res = await fetch(BASE, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Something went wrong. Please try again.");
  }
  return res.json();
}

export const getBilling = () => request<BillingData>();

export const setAutoRenewal = (autoRenewal: boolean) =>
  request<Subscription>({ method: "PATCH", body: JSON.stringify({ autoRenewal }) });

export const savePaymentMethod = (v: { provider: string; number: string }) =>
  request<PaymentMethod>({ method: "PUT", body: JSON.stringify(v) });

export const removePaymentMethod = () => request<{ ok: true }>({ method: "DELETE" });