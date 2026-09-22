import { EyeOff, RotateCcw } from "lucide-react";

export function HiddenReviewBanner({ onUnhide }: { onUnhide: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5">
      <div className="flex items-center gap-2 text-amber-800">
        <EyeOff size={14} />
        <p className="text-xs font-medium">This review is hidden from your storefront.</p>
      </div>
      <button
        onClick={onUnhide}
        className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-700"
      >
        <RotateCcw size={12} /> Restore to storefront
      </button>
    </div>
  );
}