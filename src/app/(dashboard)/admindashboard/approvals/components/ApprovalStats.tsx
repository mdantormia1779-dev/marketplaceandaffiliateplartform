import { CheckCircle2, Clock, ShieldCheck, Users } from "lucide-react";
import ApprovalStatCard from "./ApprovalStatCard";

export default function ApprovalStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ApprovalStatCard
        title="Pending Applications" value="11" trend="2" trendLabel="awaiting review"
        direction="up" tone="green"
        iconBg="bg-amber-100" icon={<Clock size={18} className="text-amber-700" />}
      />
      <ApprovalStatCard
        title="Approved This Month" value="24" trend="6.1%" trendLabel="vs last month"
        direction="up" tone="green"
        iconBg="bg-emerald-100" icon={<CheckCircle2 size={18} className="text-emerald-700" />}
      />
      <ApprovalStatCard
        title="Rejected" value="4" trend="1" trendLabel="this month"
        direction="down" tone="amber"
        iconBg="bg-gray-100" icon={<Users size={18} className="text-gray-700" />}
      />
      <ApprovalStatCard
        title="Avg. Review Time" value="1.8 days" trend="0.4" trendLabel="faster than last month"
        direction="down" tone="amber"
        iconBg="bg-teal-50" icon={<ShieldCheck size={18} className="text-teal-800" />}
      />
    </div>
  );
}