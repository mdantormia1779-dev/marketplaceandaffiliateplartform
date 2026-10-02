import { Clock, CreditCard, DollarSign, ShieldCheck } from "lucide-react";
import StatCard from "./StatCard";
import { stats } from "../data";
import { moneyShort } from "../utils";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Active Subscriptions"
        value={String(stats.active)}
        icon={<CreditCard size={18} />}
        iconClass="bg-emerald-100 text-emerald-700"
        delta="4.2%"
        deltaNote="vs last month"
        deltaTone="up"
      />
      <StatCard
        label="Monthly Recurring"
        value={moneyShort(stats.monthly)}
        icon={<DollarSign size={18} />}
        iconClass="bg-amber-100 text-amber-700"
        delta="5.8%"
        deltaNote="vs last month"
        deltaTone="up"
      />
      <StatCard
        label="On Trial"
        value={String(stats.trial)}
        icon={<Clock size={18} />}
        iconClass="bg-teal-100 text-teal-700"
        delta="4"
        deltaNote="converting soon"
        deltaTone="up"
      />
      <StatCard
        label="Past Due"
        value={String(stats.pastDue)}
        icon={<ShieldCheck size={18} />}
        iconClass="bg-slate-200 text-slate-700"
        delta="1"
        deltaNote="needs attention"
        deltaTone="warn"
      />
    </div>
  );
}