import {
  DollarSign, Percent, ShoppingCart, Users, Truck, Share2, Wallet, ClipboardCheck,
} from "lucide-react";
import StatCard, { StatCardProps } from "./admincomponents/StatCard";
import RevenueChart from "./admincomponents/RevenueChart";
import OrdersChart from "./admincomponents/OrdersChart";
import MarketplaceStats from "./admincomponents/MarketplaceStats";
import PendingActions from "./admincomponents/PendingActions";
import RecentOrders from "./admincomponents/RecentOrders";
import TopSuppliers from "./admincomponents/TopSuppliers";


const stats: StatCardProps[] = [
  { label: "Total Revenue", value: "$1,284,590", icon: DollarSign, tone: "green", change: "12.4%" },
  { label: "Platform Commission", value: "$192,688", icon: Percent, tone: "orange", change: "9.8%" },
  { label: "Total Orders", value: "18,420", icon: ShoppingCart, tone: "blue", change: "6.2%" },
  { label: "Customers", value: "9,842", icon: Users, tone: "gray", change: "4.1%" },
  { label: "Active Suppliers", value: "186", icon: Truck, tone: "green", change: "2.3%" },
  { label: "Active Affiliates", value: "412", icon: Share2, tone: "orange", change: "7.6%" },
  { label: "Pending Withdrawals", value: "$24,180", icon: Wallet, tone: "blue", change: "3.1%", trend: "down" },
  { label: "Pending Approvals", value: "37", icon: ClipboardCheck, tone: "gray", change: "5.4%", note: "needs review" },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Overview of marketplace performance, operations and affiliate activity.
          </p>
        </div>
        <select
          defaultValue="30"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <RevenueChart />
        <OrdersChart />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 [&>section]:h-full">
          <MarketplaceStats />
        </div>
        <PendingActions />
        <div className="xl:col-span-2 [&>section]:h-full">
          <RecentOrders />
        </div>
        <TopSuppliers />
      </div>
    </div>
  );
}