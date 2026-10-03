import ChartCard from "../financecomponents/ChartCard";
import { money } from "../financecomponents/format";
import { BreakdownItem } from "./types";

export default function BreakdownCard({ items }: { items: BreakdownItem[] }) {
  return (
    <ChartCard title="Revenue Breakdown" subtitle="Platform earnings by revenue source">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((b) => (
          <div key={b.label} className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-600">{b.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{money(b.amount)}</p>
            <p className="mt-2 text-xs text-emerald-600">
              +{b.trend}% <span className="text-gray-500">vs last period</span>
            </p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
