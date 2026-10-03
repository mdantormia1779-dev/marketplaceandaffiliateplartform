import { Trash2, X } from "lucide-react";
import ExportMenu from "./ExportMenu";
import { Order } from "./types";

interface Props {
  title: string;
  subtitle: string;
  orders: Order[];
  bulkMode: boolean;
  onToggleBulk: () => void;
}

export default function OrdersHeader({ title, subtitle, orders, bulkMode, onToggleBulk }: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-gray-500">{subtitle}</p>
      </div>
      <div className="flex gap-3">
        <ExportMenu orders={orders} />
        <button
          onClick={onToggleBulk}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white ${
            bulkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {bulkMode ? <X size={16} /> : <Trash2 size={16} />}
          {bulkMode ? "Exit Bulk Mode" : "Bulk Actions"}
        </button>
      </div>
    </div>
  );
}