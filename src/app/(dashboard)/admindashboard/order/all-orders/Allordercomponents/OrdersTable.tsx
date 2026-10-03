import { Search } from "lucide-react";
import { Order } from "./types";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

interface Props {
  orders: Order[];
  query: string;
  onQuery: (q: string) => void;
  bulkMode: boolean;
  selected: string[];
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onView: (id: string) => void;
  onShip: (id: string) => void;
  onRefund: (id: string) => void;
  onCancel: (id: string) => void;
  onPrint: (id: string) => void;
}

const heads = ["Order ID", "Customer", "Supplier", "Affiliate", "Amount", "Payment", "Status", "Date", ""];

export default function OrdersTable({
  orders, query, onQuery, bulkMode, selected, onToggle, onToggleAll,
  onView, onShip, onRefund, onCancel, onPrint,
}: Props) {
  const allChecked = orders.length > 0 && orders.every((o) => selected.includes(o.id));
  const box = "h-4 w-4 cursor-pointer accent-green-600";

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between p-5">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search by order, customer, supplier..."
            className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pl-9 pr-3 text-sm outline-none focus:border-green-500"
          />
        </div>
        <span className="text-sm text-gray-500">{orders.length} orders found</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              {bulkMode && (
                <th className="w-10 py-3 pl-5">
                  <input type="checkbox" className={box} checked={allChecked} onChange={onToggleAll} />
                </th>
              )}
              {heads.map((h, i) => (
                <th key={i} className="px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const checked = selected.includes(o.id);
              return (
                <tr
                  key={o.id}
                  className={`border-b border-gray-100 last:border-0 ${
                    checked ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  {bulkMode && (
                    <td className="py-4 pl-5">
                      <input type="checkbox" className={box} checked={checked} onChange={() => onToggle(o.id)} />
                    </td>
                  )}
                  <td className="px-5 py-4 font-medium">{o.id}</td>
                  <td className="px-5 py-4">
                    <div className="font-medium">{o.customer.name}</div>
                    <div className="text-xs text-gray-500">{o.customer.email}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{o.supplier}</td>
                  <td className="px-5 py-4">
                    {o.affiliate ? (
                      <>
                        <div className="font-medium">{o.affiliate.name}</div>
                        <div className="font-mono text-[10px] text-gray-500">{o.affiliate.code}</div>
                      </>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-4 font-semibold">${o.amount.toFixed(2)}</td>
                  <td className="px-5 py-4"><StatusBadge label={o.payment} /></td>
                  <td className="px-5 py-4"><StatusBadge label={o.status} /></td>
                  <td className="px-5 py-4 text-gray-700">{o.date}</td>
                  <td className="px-5 py-4">
                    <ActionMenu
                      order={o}
                      onView={() => onView(o.id)}
                      onShip={() => onShip(o.id)}
                      onPrint={() => onPrint(o.id)}
                      onRefund={() => onRefund(o.id)}
                      onCancel={() => onCancel(o.id)}
                    />
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={heads.length + 1} className="py-12 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}