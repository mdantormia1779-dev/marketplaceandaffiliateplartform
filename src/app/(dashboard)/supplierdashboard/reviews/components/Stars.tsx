import { Star } from "lucide-react";

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= value ? "fill-amber-400 text-amber-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}