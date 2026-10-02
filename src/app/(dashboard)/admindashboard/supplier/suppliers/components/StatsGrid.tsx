import { Clock, ShieldCheck, Star, Truck } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Suppliers" value="264" trend="3.4%" trendLabel="vs last month"
        iconBg="bg-emerald-100" icon={<Truck size={18} className="text-emerald-700" />}
      />
      <StatCard
        title="Active Stores" value="238" trend="2.8%" trendLabel="vs last month"
        iconBg="bg-teal-50" icon={<ShieldCheck size={18} className="text-teal-800" />}
      />
      <StatCard
        title="Avg. Rating" value="4.7" trend="0.2%" trendLabel="vs last month"
        iconBg="bg-amber-100" icon={<Star size={18} className="text-amber-700" />}
      />
      <StatCard
        title="Pending Approval" value="11" trend="2" trendLabel="needs review"
        iconBg="bg-gray-100" icon={<Clock size={18} className="text-gray-700" />}
      />
    </div>
  );
}