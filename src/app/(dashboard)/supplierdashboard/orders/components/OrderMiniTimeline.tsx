import { Check } from "lucide-react";

const STEPS = ["Placed", "Accept", "Processing", "Shipped", "Delivered"];
const CURRENT_INDEX = 1; // pending orders are waiting at "Accept"

export function OrderMiniTimeline() {
  return (
    <div className="mt-4 flex items-center">
      {STEPS.map((step, i) => {
        const done = i < CURRENT_INDEX;
        const current = i === CURRENT_INDEX;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${
                  done
                    ? "bg-emerald-500 text-white"
                    : current
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <Check size={12} /> : i + 1}
              </span>
              <span
                className={`text-[10px] ${
                  current ? "font-medium text-indigo-600" : "text-slate-400"
                }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-1 mb-4 h-0.5 flex-1 rounded-full ${
                  done ? "bg-emerald-400" : "bg-slate-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}