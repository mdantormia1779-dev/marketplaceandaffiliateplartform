"use client";

import { useMemo, useState } from "react";
import { getPeriodData } from "./data";
import { Period } from "./types";

export function useRevenue() {
  const [period, setPeriod] = useState<Period>("This year");

  const data = useMemo(() => getPeriodData(period), [period]);

  const stats = useMemo(() => {
    const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);
    const gross = sum(data.revenue);
    const payouts = sum(data.payouts);
    return { gross, payouts, net: gross - payouts, aov: data.aov };
  }, [data]);

  return { period, setPeriod, data, stats };
}
