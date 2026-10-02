import { Plus } from "lucide-react";

export default function PageHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold leading-tight text-slate-900">Subscriptions</h1>
        <p className="mt-1 text-[15px] text-slate-500">Supplier plans, billing cycles and recurring revenue.</p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-[#1fb06f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#189a60]"
      >
        <Plus size={16} />
        New Subscription
      </button>
    </div>
  );
}