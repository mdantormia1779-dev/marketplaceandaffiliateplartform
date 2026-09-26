import { CheckCircle2, Circle } from "lucide-react";
import { ChecklistItem } from "../types";
import { getCompletionLabel, getCompletionPercentage } from "../profileUtils";

export function ProfileCompletionCard({
  checklist,
  onCompleteClick,
}: {
  checklist: ChecklistItem[];
  onCompleteClick: () => void;
}) {
  const percentage = getCompletionPercentage(checklist);

  return (
    <div className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900">Complete your profile</h3>
      <p className="mt-1 text-xs text-slate-400">
        A complete profile builds buyer trust and boosts conversions.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-3xl font-bold text-slate-900">{percentage}%</span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          {getCompletionLabel(percentage)}
        </span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-indigo-600" style={{ width: `${percentage}%` }} />
      </div>

      <ul className="mt-4 space-y-2.5">
        {checklist.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm">
            {item.done ? (
              <CheckCircle2 size={16} className="text-emerald-600" />
            ) : (
              <Circle size={16} className="text-slate-300" />
            )}
            <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onCompleteClick}
        className="mt-5 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
      >
        Complete Profile
      </button>
    </div>
  );
}