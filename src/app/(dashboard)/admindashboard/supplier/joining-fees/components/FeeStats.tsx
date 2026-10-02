import { CheckCircle2, Clock, DollarSign, FileText } from "lucide-react";
import StatCard from "../../suppliers/components/StatCard"; // suppliers theke reuse

interface FeeStatsProps {
  paid: number;
  pending: number;
  waived: number;
}

export default function FeeStats({ paid, pending, waived }: FeeStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Collected er taka ta backend theke ashbe, tai ekhane fixed */}
      <StatCard
        title="Collected This Month" value="$3,376" trend="6.4%" trendLabel="vs last month"
        iconBg="bg-emerald-100" icon={<DollarSign size={18} className="text-emerald-700" />}
      />
      <StatCard
        title="Paid Fees" value={String(paid)} trend="2" trendLabel="this month"
        iconBg="bg-teal-50" icon={<CheckCircle2 size={18} className="text-teal-800" />}
      />
      <StatCard
        title="Pending Payment" value={String(pending)} trend="2" trendLabel="awaiting"
        iconBg="bg-amber-100" icon={<Clock size={18} className="text-amber-700" />}
      />
      <StatCard
        title="Waived" value={String(waived)} trend="0%" trendLabel="promotional"
        iconBg="bg-gray-100" icon={<FileText size={18} className="text-gray-700" />}
      />
    </div>
  );
}