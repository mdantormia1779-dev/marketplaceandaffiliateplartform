import { Search } from "lucide-react";
import Select from "./ui/Select";

export default function Toolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  warehouse,
  onWarehouseChange,
  warehouses,
  sort,
  onSortChange,
  sorts,
  resultCount,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  categories: string[];
  warehouse: string;
  onWarehouseChange: (v: string) => void;
  warehouses: string[];
  sort: string;
  onSortChange: (v: string) => void;
  sorts: string[];
  resultCount: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by product or SKU..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <Select value={category} onChange={onCategoryChange} options={categories} className="w-44" />
        <Select value={warehouse} onChange={onWarehouseChange} options={warehouses} className="w-44" />
        <Select value={sort} onChange={onSortChange} options={sorts} className="ml-auto w-48" />
      </div>
      <p className="mt-3 text-xs text-slate-400">
        <span className="font-medium text-slate-600">{resultCount}</span> SKUs in view
      </p>
    </div>
  );
}