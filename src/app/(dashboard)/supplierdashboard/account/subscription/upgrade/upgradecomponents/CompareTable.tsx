import { Check, Minus } from "lucide-react";
import { compareRows, plans } from "./data";
import { CurrentSub } from "./types";

export default function CompareTable({ current }: { current: CurrentSub }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Compare Plans</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-left font-semibold text-slate-900">Feature</th>
              {plans.map((p) => (
                <th key={p.id} className="px-6 py-4 text-center font-semibold text-slate-900">
                  {p.name}
                  {p.id === current.planId && (
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">CURRENT</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-slate-50/60" : ""}>
                <td className="px-6 py-3.5 font-medium text-slate-800">{row.label}</td>
                {plans.map((p) => {
                  const v = row.values[p.id];
                  return (
                    <td key={p.id} className={`px-6 py-3.5 text-center ${p.id === current.planId ? "bg-blue-50/50" : ""}`}>
                      {typeof v === "string" ? (
                        <span className={p.rank > 0 ? "font-semibold text-slate-900" : "text-slate-500"}>{v}</span>
                      ) : v ? (
                        <span className="inline-flex h-5.5 w-5.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <Check size={12} />
                        </span>
                      ) : (
                        <Minus size={14} className="mx-auto text-slate-300" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}