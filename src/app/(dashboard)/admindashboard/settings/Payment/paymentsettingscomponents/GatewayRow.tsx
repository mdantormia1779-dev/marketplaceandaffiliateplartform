"use client";
import { CreditCard, Pencil, X } from "lucide-react";
import { useState } from "react";
import { feeLabel } from "./format";
import NumberField from "./NumberField";
import Toggle from "./Toggle";
import { Errors, Gateway } from "./types";
import { gatewayHasError, gatewayKey } from "./validate";

interface Props {
  gateway: Gateway;
  symbol: string;
  errors: Errors;
  onChange: (patch: Partial<Gateway>) => void;
}

export default function GatewayRow({ gateway: g, symbol, errors, onChange }: Props) {
  const [manual, setManual] = useState(false);
  // error thakle editor nijei khule jay, jate user dekhte pay
  const editing = manual || gatewayHasError(errors, g.id);
  const pctErr = errors[gatewayKey(g.id, "percent")];
  const fixedErr = errors[gatewayKey(g.id, "fixed")];

  return (
    <div className="border-t border-gray-100">
      <div className="flex items-center gap-3 px-5 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <CreditCard size={16} />
        </span>
        <div className={`min-w-0 flex-1 ${g.active ? "" : "opacity-60"}`}>
          <p className="text-sm font-medium text-gray-900">{g.name}</p>
          <p className="text-xs text-gray-500">
            {g.company} · fee {feeLabel(g, symbol)}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            g.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {g.active ? "Active" : "Inactive"}
        </span>
        <Toggle label={`${g.active ? "Deactivate" : "Activate"} ${g.name}`} checked={g.active} onChange={(v) => onChange({ active: v })} />
        <button
          onClick={() => setManual(!editing)}
          aria-label={editing ? `Close ${g.name} fee editor` : `Edit ${g.name} fees`}
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          {editing ? <X size={16} /> : <Pencil size={14} />}
        </button>
      </div>

      {editing && (
        <div className="flex flex-wrap items-start gap-6 bg-gray-50 px-5 py-4 pl-17">
          <div>
            <p className="mb-1 text-xs text-gray-600">Percentage fee</p>
            <NumberField
              label={`${g.name} percentage fee`}
              suffix="%"
              width="w-36"
              value={g.percent}
              invalid={Boolean(pctErr)}
              onChange={(n) => onChange({ percent: n })}
            />
            {pctErr && <p className="mt-1 text-xs text-red-600">{pctErr}</p>}
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-600">Fixed fee per transaction</p>
            <NumberField
              label={`${g.name} fixed fee`}
              suffix={symbol}
              width="w-36"
              value={g.fixed}
              invalid={Boolean(fixedErr)}
              onChange={(n) => onChange({ fixed: n })}
            />
            {fixedErr && <p className="mt-1 text-xs text-red-600">{fixedErr}</p>}
          </div>
        </div>
      )}
    </div>
  );
}