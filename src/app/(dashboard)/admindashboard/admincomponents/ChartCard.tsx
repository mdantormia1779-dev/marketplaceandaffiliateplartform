import type { ReactNode } from "react";

export type LegendItem = { label: string; color: string };

export default function ChartCard({
  title, subtitle, legend, children,
}: {
  title: string;
  subtitle: string;
  legend: LegendItem[];
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <ul className="flex items-center gap-4 text-xs text-slate-600">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}