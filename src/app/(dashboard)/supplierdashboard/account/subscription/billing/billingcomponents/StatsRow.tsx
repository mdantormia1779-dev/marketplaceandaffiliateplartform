import { CalendarCheck, Crown, Wallet } from "lucide-react";
import StatCard from "./StatCard";
import { Subscription } from "./types";
import { formatBDT, formatDate, formatMonthYear } from "./utils";

export default function StatsRow({ subscription: s }: { subscription: Subscription }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard highlight icon={<Crown size={16} />} label="Current Plan" value={formatBDT(s.price)} caption="/ month" />
      <StatCard icon={<CalendarCheck size={16} />} label="Next Payment" value={formatBDT(s.price)} caption={formatDate(s.nextBillingDate)} />
      <StatCard icon={<Wallet size={16} />} label="Total Paid" value={formatBDT(s.totalPaid)} caption={`since ${formatMonthYear(s.since)}`} />
    </div>
  );
}