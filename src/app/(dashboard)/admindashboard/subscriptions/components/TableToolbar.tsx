import { Download, Search, SlidersHorizontal } from "lucide-react";
import { PLANS, STATUSES } from "../types";

interface Props {
  query: string;
  status: string;
  plan: string;
  onQuery: (v: string) => void;
  onStatus: (v: string) => void;
  onPlan: (v: string) => void;
  onExport: () => void;
}

const selectCls = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none";

export default function TableToolbar({ query, status, plan, onQuery, onStatus, onPlan, onExport }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="flex w-full max-w-[320px] items-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search by store or plan..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-[13px] text-slate-500">
          <SlidersHorizontal size={14} /> Filters
        </span>
        <select value={status} onChange={(e) => onStatus(e.target.value)} className={selectCls}>
          <option value="All">Status: All</option>
          {STATUSES.map((s) => <option key={s} value={s}>Status: {s}</option>)}
        </select>
        <select value={plan} onChange={(e) => onPlan(e.target.value)} className={selectCls}>
          <option value="All">Plan: All</option>
          {PLANS.map((p) => <option key={p} value={p}>Plan: {p}</option>)}
        </select>
        <button onClick={onExport} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-800 hover:bg-slate-50">
          <Download size={14} /> Export
        </button>
      </div>
    </div>
  );
}