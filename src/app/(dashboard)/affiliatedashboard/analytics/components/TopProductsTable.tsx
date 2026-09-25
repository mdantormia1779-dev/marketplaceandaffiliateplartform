import { BarChart3 } from "lucide-react";
import { ProductPerformance } from "./types";

interface TopProductsTableProps {
  products: ProductPerformance[];
  delay?: number;
}

export default function TopProductsTable({ products, delay = 0 }: TopProductsTableProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div className="p-6 pb-0 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
          <BarChart3 className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Top Products</h2>
          <p className="text-xs text-slate-500 mt-0.5">Best performers by revenue and commission.</p>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Product</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Clicks</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Orders</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Conversion</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Revenue</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Commission</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base">
                      {product.emoji}
                    </div>
                    <span className="font-medium text-slate-700">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-slate-600">{product.clicks}</td>
                <td className="px-6 py-4 text-right text-slate-600">{product.orders}</td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                    {product.conversion}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-slate-800">৳{product.revenue}</td>
                <td className="px-6 py-4 text-right font-semibold text-indigo-600">৳{product.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}