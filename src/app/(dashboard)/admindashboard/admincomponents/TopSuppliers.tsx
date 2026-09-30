import { Star } from "lucide-react";
import Panel from "./Panel";

const suppliers = [
  { name: "Northline Audio", orders: "1,284", revenue: "$184,320", rating: 4.9 },
  { name: "Cosmo Gadgets", orders: "1,092", revenue: "$156,780", rating: 4.7 },
  { name: "Titan Tools", orders: "968", revenue: "$142,390", rating: 4.8 },
  { name: "Urban Fitwear", orders: "874", revenue: "$121,760", rating: 4.6 },
  { name: "Bloom Beauty", orders: "756", revenue: "$98,240", rating: 4.5 },
];

export default function TopSuppliers() {
  return (
    <Panel title="Top Suppliers" subtitle="By revenue this month">
      <ol>
        {suppliers.map((s, i) => (
          <li
            key={s.name}
            className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-xs font-medium text-slate-700">
                {i + 1}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-slate-900">{s.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{s.orders} orders</p>
              </div>
            </div>
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-slate-900">{s.revenue}</p>
              <p className="mt-0.5 flex items-center justify-end gap-1 text-xs text-slate-500">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {s.rating}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}