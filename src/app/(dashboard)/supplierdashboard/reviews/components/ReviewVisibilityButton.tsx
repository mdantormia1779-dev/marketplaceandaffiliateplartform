import { Eye, EyeOff } from "lucide-react";

export function ReviewVisibilityButton({
  hidden,
  onToggle,
}: {
  hidden: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      title={hidden ? "Unhide review (show on storefront)" : "Hide review (remove from storefront)"}
      className={`group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-all ${
        hidden
          ? "border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200"
          : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      {hidden ? (
        <>
          <Eye size={12} /> Unhide
        </>
      ) : (
        <>
          <EyeOff size={12} className="transition-transform group-hover:scale-110" /> Hide
        </>
      )}
    </button>
  );
}