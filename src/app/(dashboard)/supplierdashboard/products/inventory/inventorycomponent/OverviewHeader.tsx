import { Download, Plus } from "lucide-react";

type Props = {
  onExport: () => void;
  onAddStockClick: () => void;
};

export default function OverviewHeader({ onExport, onAddStockClick }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Inventory Overview</h2>
        <p className="mt-1 text-sm text-slate-500">
          Monitor stock across your warehouses, spot low-stock risks and restock in a few clicks.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export stock
        </button>
        <button
          type="button"
          onClick={onAddStockClick}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          <Plus className="h-4 w-4" />
          Add stock
        </button>
      </div>
    </div>
  );
}