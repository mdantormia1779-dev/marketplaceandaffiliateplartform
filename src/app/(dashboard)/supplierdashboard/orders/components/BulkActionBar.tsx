import { Check, X } from "lucide-react";

export function BulkActionBar({
  selectedCount,
  onAcceptSelected,
  onClear,
}: {
  selectedCount: number;
  onAcceptSelected: () => void;
  onClear: () => void;
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="flex items-center gap-4 rounded-2xl bg-slate-900 px-5 py-3 text-white shadow-xl">
        <span className="text-sm font-medium">{selectedCount} selected</span>
        <button
          onClick={onAcceptSelected}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium transition hover:bg-indigo-400"
        >
          <Check size={14} />
          Accept selected
        </button>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-slate-300 transition hover:text-white"
        >
          <X size={14} />
          Clear
        </button>
      </div>
    </div>
  );
}