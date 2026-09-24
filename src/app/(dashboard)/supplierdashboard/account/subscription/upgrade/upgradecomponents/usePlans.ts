"use client";

import { useState } from "react";
import { initialCurrent, plans } from "./data";
import { CurrentSub, Cycle, Plan } from "./types";

export function usePlans() {
  const [cycle, setCycle] = useState<Cycle>(initialCurrent.cycle);
  const [current, setCurrent] = useState<CurrentSub>(initialCurrent);
  const [pending, setPending] = useState<Plan | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const requestChange = (plan: Plan) => {
    setNotice(null);
    setPending(plan);
  };

  const confirmChange = () => {
    if (!pending) return;
    setCurrent({ planId: pending.id, cycle });
    setNotice(`You are now on the ${pending.name} plan (${cycle}).`);
    setPending(null);
  };

  const cancelChange = () => setPending(null);

  return { cycle, setCycle, current, pending, notice, requestChange, confirmChange, cancelChange, plans };
}