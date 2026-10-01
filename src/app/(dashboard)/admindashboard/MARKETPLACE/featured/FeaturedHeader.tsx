import { Plus } from "lucide-react";

export default function FeaturedHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Featured Products</h1>
        <p className="mt-1 text-sm text-gray-600">Highlight products across the storefront with scheduled placements.</p>
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
      >
        <Plus size={16} /> Feature Product
      </button>
    </div>
  );
}