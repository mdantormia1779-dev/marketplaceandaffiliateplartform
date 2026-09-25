import { Plus, Store } from "lucide-react";

export default function DashboardActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
        <Plus className="h-4 w-4" />
        Generate Affiliate Link
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
        <Store className="h-4 w-4" />
        Browse Products
      </button>
    </div>
  );
}