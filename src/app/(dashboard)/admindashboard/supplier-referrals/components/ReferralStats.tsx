import { CheckCircle2, Clock, DollarSign, Network } from "lucide-react";
import StatCard from "../../suppliers/components/StatCard"; // suppliers theke reuse

interface ReferralStatsProps {
  pending: number; // table er live count
}

export default function ReferralStats({ pending }: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Baki 3ta fixed, backend theke ashbe */}
      <StatCard
        title="Total Referrals" value="64" trend="8.2%" trendLabel="vs last month"
        iconBg="bg-emerald-100" icon={<Network size={18} className="text-emerald-700" />}
      />
      <StatCard
        title="Rewards Paid" value="$2,850" trend="6.1%" trendLabel="this period"
        iconBg="bg-teal-50" icon={<DollarSign size={18} className="text-teal-800" />}
      />
      <StatCard
        title="Pending" value={String(pending)} trend="1" trendLabel="awaiting review"
        iconBg="bg-amber-100" icon={<Clock size={18} className="text-amber-700" />}
      />
      <StatCard
        title="Conversion Rate" value="68%" trend="4.2%" trendLabel="vs last month"
        iconBg="bg-gray-100" icon={<CheckCircle2 size={18} className="text-gray-700" />}
      />
    </div>
  );
}