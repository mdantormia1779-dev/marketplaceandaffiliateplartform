import { Pencil } from "lucide-react";
import { PayoutMethod } from "./types";
import { METHOD_ICONS, METHOD_STYLES } from "./constants";

interface PayoutMethodCardProps {
  method: PayoutMethod;
  onEdit: (method: PayoutMethod) => void;
  onUse: (method: PayoutMethod) => void;
}

export default function PayoutMethodCard({ method, onEdit, onUse }: PayoutMethodCardProps) {
  const Icon = METHOD_ICONS[method.type];
  const style = METHOD_STYLES[method.type];

  return (
    <div
      className={
        "relative rounded-2xl border-2 bg-white p-5 shadow-sm transition-all " +
        (method.isDefault ? "border-indigo-500" : "border-slate-200/80 hover:border-slate-300")
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={"w-10 h-10 rounded-xl flex items-center justify-center " + style.bg + " " + style.color}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-slate-900">{method.type}</p>
              {method.isDefault ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                  Default
                </span>
              ) : null}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{method.accountNumber}</p>
            <p className="text-xs text-slate-400">{method.accountName}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(method)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label={"Edit " + method.type}
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      {method.isDefault ? (
        <button
          type="button"
          disabled
          className="mt-4 w-full py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold cursor-default"
        >
          Selected for payout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onUse(method)}
          className="mt-4 w-full py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Use this method
        </button>
      )}
    </div>
  );
}