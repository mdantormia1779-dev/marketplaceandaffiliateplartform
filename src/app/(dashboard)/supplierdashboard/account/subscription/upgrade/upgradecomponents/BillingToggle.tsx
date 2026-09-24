import { Cycle } from "./types";

interface Props { cycle: Cycle; onChange: (c: Cycle) => void }

export default function BillingToggle({ cycle, onChange }: Props) {
  const btn = (value: Cycle, label: string) => (
    <button
      onClick={() => onChange(value)}
      className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
        cycle === value ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex justify-center">
      <div className="inline-flex gap-1 rounded-full border border-slate-200 bg-white p-1">
        {btn("monthly", "Monthly")}
        {btn("yearly", "Yearly")}
      </div>
    </div>
  );
}