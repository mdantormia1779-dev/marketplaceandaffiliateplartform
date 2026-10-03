import { Download } from "lucide-react";

export default function TransactionsHeader({ onExport }: { onExport: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <p className="mt-1 text-sm text-gray-600">Every money movement across orders, payouts, fees and refunds.</p>
      </div>
      <button
        onClick={onExport}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
      >
        <Download size={16} />
        Export
      </button>
    </div>
  );
}
