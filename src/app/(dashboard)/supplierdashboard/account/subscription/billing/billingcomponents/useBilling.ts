"use client";

import { useState } from "react";
import { initialBilling } from "./data";
import { BillingData } from "./types";

export function useBilling() {
  const [data, setData] = useState<BillingData>(initialBilling);

  const toggleAutoRenewal = () =>
    setData((d) => ({
      ...d,
      subscription: { ...d.subscription, autoRenewal: !d.subscription.autoRenewal },
    }));

  // form er sathe compatible rakhar jonno async; invalid hole error throw kore
  const savePaymentMethod = async (v: { provider: string; number: string }) => {
    if (!/^\d{4,}$/.test(v.number)) throw new Error("Please enter a valid number.");
    setData((d) => ({
      ...d,
      paymentMethod: { id: "pm_" + Date.now(), provider: v.provider, last4: v.number.slice(-4), primary: true },
    }));
  };

  const removePaymentMethod = () => setData((d) => ({ ...d, paymentMethod: null }));

  return { data, toggleAutoRenewal, savePaymentMethod, removePaymentMethod };
}