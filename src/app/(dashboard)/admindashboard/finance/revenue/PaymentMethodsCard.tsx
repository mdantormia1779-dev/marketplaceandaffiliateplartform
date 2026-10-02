"use client";

import { useState } from "react";
import ChartCard from "../financecomponents/ChartCard";
import { METHOD_COLORS } from "./data";
import DonutChart from "./DonutChart";
import { Method } from "./types";

export default function PaymentMethodsCard({ methods }: { methods: Method[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ChartCard title="Payment Methods" subtitle="Share of transaction volume">
      <DonutChart methods={methods} colors={METHOD_COLORS} hovered={hovered} onHover={setHovered} />
      <ul className="mt-6 space-y-1">
        {methods.map((m, i) => (
          <li
            key={m.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors duration-200 ${
              hovered === i ? "bg-gray-50" : ""
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: METHOD_COLORS[i % METHOD_COLORS.length] }} />
              {m.name}
            </span>
            <span>{m.share}%</span>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
