import { Check } from "lucide-react";

export type ChecklistItem = { label: string; done: boolean };

export default function CompletenessPanel({
  completeness,
  checklist,
}: {
  completeness: number;
  checklist: ChecklistItem[];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-900">Completeness</h3>
        <span className="text-[12px] font-semibold text-blue-600">{completeness}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={completeness}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"
      >
        <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${completeness}%` }} />
      </div>
      <ul className="mt-5 space-y-3">
        {checklist.map((c) => (
          <li key={c.label} className="flex items-center gap-2.5 text-[12px]">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                c.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 text-transparent"
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span className={c.done ? "text-slate-800" : "text-slate-400"}>{c.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}