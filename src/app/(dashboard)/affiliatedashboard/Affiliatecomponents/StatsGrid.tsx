import {
  MousePointerClick,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Users2,
  CreditCard,
  ArrowDownToLine,
} from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total Clicks"
        value="24,850"
        icon={MousePointerClick}
        iconBg="bg-amber-50"
        iconColor="text-amber-500"
        topBorder="border-t-amber-400"
        change="+12.5%"
        changeLabel="this month"
      />
      <StatCard
        title="Total Sales"
        value="428"
        icon={ShoppingCart}
        iconBg="bg-blue-50"
        iconColor="text-blue-500"
        topBorder="border-t-blue-400"
        change="+8.4%"
        changeLabel="this month"
      />
      <StatCard
        title="Conversion Rate"
        value="3.42%"
        icon={TrendingUp}
        iconBg="bg-amber-50"
        iconColor="text-amber-500"
        topBorder="border-t-amber-400"
        change="+0.8%"
        changeLabel="vs last month"
      />
      <StatCard
        title="Total Commission"
        value="৳58,420"
        icon={Wallet}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-500"
        topBorder="border-t-indigo-400"
        change="+15.2%"
        changeLabel="this month"
      />
      <StatCard
        title="Referral Bonus"
        value="৳8,750"
        icon={Users2}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-500"
        topBorder="border-t-emerald-400"
        change="+10.3%"
        changeLabel="this month"
      />
      <StatCard
        title="Available Balance"
        value="৳42,680"
        icon={CreditCard}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-500"
        topBorder="border-t-emerald-400"
        change="ready to withdraw"
        changeLabel=""
        action={
          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Withdraw
          </button>
        }
      />
    </div>
  );
}