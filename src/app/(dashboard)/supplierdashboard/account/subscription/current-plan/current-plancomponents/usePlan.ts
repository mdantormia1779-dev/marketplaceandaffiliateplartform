"use client";

import { useState } from "react";
import { initialPlan } from "./data";
import { PlanData } from "./types";

export function usePlan() {
  const [plan, setPlan] = useState<PlanData>(initialPlan);

  const toggleAutoRenewal = () =>
    setPlan((p) => (p.status === "Active" ? { ...p, autoRenewal: !p.autoRenewal } : p));

  const cancel = () => setPlan((p) => ({ ...p, status: "Cancelled", autoRenewal: false }));

  const resume = () => setPlan((p) => ({ ...p, status: "Active", autoRenewal: true }));

  return { plan, toggleAutoRenewal, cancel, resume };
}