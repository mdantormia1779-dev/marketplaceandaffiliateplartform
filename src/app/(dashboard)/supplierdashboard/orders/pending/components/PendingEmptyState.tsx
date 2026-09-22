import { PackageCheck, SearchX } from "lucide-react";

export function PendingEmptyState({
  filtered,
  onClear,
}: {
  filtered: boolean;
  onClear: () => void;
}) {
  const Icon = filtered ? SearchX : PackageCheck;

  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
        <Icon size={26} />
      </span>
      <p className="mt-4 text-sm font-medium text-slate-800">
        {filtered ? "No orders match your filters" : "You're all caught up!"}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {filtered
          ? "Try a different search or clear the filters."
          : "New orders will appear here as soon as customers place them."}
      </p>
      {filtered && (
        <button
          onClick={onClear}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}