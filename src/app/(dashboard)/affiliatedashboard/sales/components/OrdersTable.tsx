import { Order } from "./types";
import StatusBadge from "./StatusBadge";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up"
      style={{ animationDelay: "500ms" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Order ID
              </th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Product
              </th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Customer
              </th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Order Date
              </th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Order Amount
              </th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Commission
              </th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors animate-fade-up"
                style={{ animationDelay: 550 + idx * 40 + "ms" }}
              >
                <td className="px-6 py-4 font-bold text-slate-900">{order.id}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base">
                      {order.emoji}
                    </div>
                    <span className="font-medium text-slate-700">{order.product}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-600">{order.customer}</td>

                <td className="px-6 py-4 text-slate-500">{order.orderDate}</td>

                <td className="px-6 py-4 text-right font-semibold text-slate-800">
                  ৳{order.orderAmount}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-indigo-600">
                  ৳{order.commission}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}

            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                  No orders found matching your search or filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}