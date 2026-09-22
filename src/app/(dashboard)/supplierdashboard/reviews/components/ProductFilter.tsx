import { Package } from "lucide-react";
import { ProductFilterValue } from "../types";

export function ProductFilter({
  products,
  value,
  onChange,
}: {
  products: string[];
  value: ProductFilterValue;
  onChange: (v: ProductFilterValue) => void;
}) {
  return (
    <div className="relative">
      <Package size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-6 text-xs text-slate-700 outline-none focus:border-indigo-400"
      >
        <option value="all">All products</option>
        {products.map((product) => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
    </div>
  );
}