import { CurrentSub, Cycle, Plan } from "./types";
import { formatBDT, priceFor } from "./utils";
import { plans } from "./data";

interface Props {
  plan: Plan;
  cycle: Cycle;
  current: CurrentSub;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({ plan, cycle, current, onConfirm, onClose }: Props) {
  const from = plans.find((p) => p.id === current.planId);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-slate-900">Confirm plan change</h3>
        <p className="mt-2 text-sm text-slate-600">
          Switch from <b>{from?.name} ({current.cycle})</b> to <b>{plan.name} ({cycle})</b> at{" "}
          <b>{formatBDT(priceFor(plan, cycle))}</b> / {cycle === "monthly" ? "month" : "year"}?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}