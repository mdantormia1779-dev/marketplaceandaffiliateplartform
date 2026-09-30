import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Panel from "./Panel";

type Status = "Pending" | "Processing" | "Shipped" | "Delivered";

const statusStyle: Record<Status, { pill: string; dot: string }> = {
  Pending: { pill: "bg-amber-100 text-amber-800", dot: "bg-amber-600" },
  Processing: { pill: "bg-amber-100 text-amber-800", dot: "bg-amber-600" },
  Shipped: { pill: "bg-slate-200 text-slate-700", dot: "bg-slate-500" },
  Delivered: { pill: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-600" },
};

const orders: { id: string; customer: string; amount: string; status: Status; date: string }[] = [
  { id: "ORD-48219", customer: "Noah Patel", amount: "$258.00", status: "Pending", date: "2024-06-19" },
  { id: "ORD-48218", customer: "Emma Lawson", amount: "$102.00", status: "Processing", date: "2024-06-19" },
  { id: "ORD-48217", customer: "Liam Schmidt", amount: "$178.00", status: "Shipped", date: "2024-06-18" },
  { id: "ORD-48216", customer: "Olivia Brown", amount: "$342.50", status: "Delivered", date: "2024-06-18" },
  { id: "ORD-48215", customer: "Lucas Meyer", amount: "$89.90", status: "Delivered", date: "2024-06-17" },
];

const th = "px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";

export default function RecentOrders() {
  return (
    <Panel
      title="Recent Orders"
      subtitle="Latest transactions across the marketplace"
      action={
        <Link href="/admindashboard/orders" className="flex items-center gap-0.5 text-xs font-medium text-emerald-700 hover:underline">
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className={th}>Order ID</th>
              <th className={th}>Customer</th>
              <th className={th}>Amount</th>
              <th className={th}>Status</th>
              <th className={th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-200 last:border-b-0">
                <td className="px-5 py-4 text-slate-900">{o.id}</td>
                <td className="px-5 py-4 text-slate-600">{o.customer}</td>
                <td className="px-5 py-4 font-medium text-slate-900">{o.amount}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyle[o.status].pill}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle[o.status].dot}`} />
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}