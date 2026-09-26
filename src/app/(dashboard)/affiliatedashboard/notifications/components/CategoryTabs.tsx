import { CATEGORY_LABELS, CATEGORY_ORDER, CategoryFilter } from "../types";

export function CategoryTabs({
  activeCategory,
  onChange,
  counts,
}: {
  activeCategory: CategoryFilter;
  onChange: (v: CategoryFilter) => void;
  counts: Record<string, number>;
}) {
  const pill = (isActive: boolean) =>
    `flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
      isActive
        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
    }`;

  const countBadge = (isActive: boolean) =>
    `flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
      isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => onChange("all")} className={pill(activeCategory === "all")}>
        All
        <span className={countBadge(activeCategory === "all")}>{counts.all}</span>
      </button>

      {CATEGORY_ORDER.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={pill(activeCategory === category)}
        >
          {CATEGORY_LABELS[category]}
          <span className={countBadge(activeCategory === category)}>{counts[category]}</span>
        </button>
      ))}
    </div>
  );
}