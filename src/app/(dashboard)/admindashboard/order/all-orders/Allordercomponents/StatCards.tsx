import {
  ShoppingCart, Clock, PackageSearch, DollarSign, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const cards = [
  { label: "Total Orders", value: "18,420", icon: ShoppingCart, iconCls: "bg-green-100 text-green-600", trend: "up", badge: "6.2%", note: "vs last month", badgeCls: "bg-green-100 text-green-700" },
  { label: "Pending", value: "37", icon: Clock, iconCls: "bg-orange-100 text-orange-700", trend: "down", badge: "3.1%", note: "needs action", badgeCls: "bg-orange-100 text-orange-700" },
  { label: "Delivered", value: "17,204", icon: PackageSearch, iconCls: "bg-slate-100 text-slate-700", trend: "up", badge: "5.8%", note: "vs last month", badgeCls: "bg-green-100 text-green-700" },
  { label: "Gross Revenue", value: "$2,634", icon: DollarSign, iconCls: "bg-gray-100 text-gray-700", trend: "up", badge: "12.4%", note: "this period", badgeCls: "bg-green-100 text-green-700" },
] as const;

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Arrow = c.trend === "up" ? ArrowUpRight : ArrowDownRight;
        return (
          <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{c.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{c.value}</p>
              </div>
              <div className={`rounded-lg p-3 ${c.iconCls}`}>
                <c.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-medium ${c.badgeCls}`}>
                <Arrow size={12} /> {c.badge}
              </span>
              {c.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}