import { BarChart3, Lightbulb } from "lucide-react";
import { PERIOD_STATS } from "./data";

interface RedemptionHealthProps {
  fullyRedeemed: number;
}

export default function RedemptionHealth({ fullyRedeemed }: RedemptionHealthProps) {
  const metrics = [
    { label: "Avg. discount / order", value: `$${PERIOD_STATS.avgDiscount.toFixed(2)}` },
    { label: "Codes fully redeemed", value: String(fullyRedeemed) },
    { label: "Unique customers", value: PERIOD_STATS.uniqueCustomers.toLocaleString() },
  ];

  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold">Redemption Health</h3>
          <p className="mt-1 text-sm text-slate-500">
            How your live codes are performing this period.
          </p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500">
          <BarChart3 className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs text-slate-500">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-auto flex items-start gap-2 pt-6 text-xs text-slate-500">
        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
        Codes near their limit are flagged in the table so you can extend them before they run out.
      </p>
    </section>
  );
}