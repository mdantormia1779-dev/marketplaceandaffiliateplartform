import { TrendingUp } from "lucide-react";
import Panel from "./Panel";

const categories = [
  { name: "Electronics", products: 486, pct: 86, color: "#1fa85a" },
  { name: "Home & Kitchen", products: 528, pct: 78, color: "#f5a524" },
  { name: "Apparel", products: 372, pct: 62, color: "#6b8f8a" },
  { name: "Beauty", products: 261, pct: 48, color: "#7c8088" },
  { name: "Tools", products: 198, pct: 36, color: "#1fa85a" },
];

const summary = [
  { value: "42", label: "Low stock" },
  { value: "17", label: "Out of stock" },
  { value: "4.7", label: "Avg. rating" },
];

export default function MarketplaceStats() {
  return (
    <Panel
      title="Marketplace Statistics"
      subtitle="Product distribution across top categories"
      action={
        <span className="flex items-center gap-1.5 text-xs text-slate-600">
          <TrendingUp className="h-3.5 w-3.5" />
          3,284 listed products
        </span>
      }
    >
      <div className="space-y-5 px-5 py-5">
        {categories.map((c) => (
          <div key={c.name}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-900">{c.name}</span>
              <span className="text-xs text-slate-500">
                {c.products} products · {c.pct}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.pct}%`, background: c.color }}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-3 gap-3 pt-1">
          {summary.map((s) => (
            <div key={s.label} className="rounded-lg bg-slate-100 py-4 text-center">
              <p className="text-lg font-semibold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}