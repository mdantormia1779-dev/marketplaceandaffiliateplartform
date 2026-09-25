import AffiliateCodeCard from "./Affiliatecomponents/AffiliateCodeCard";
import CommissionOverview from "./Affiliatecomponents/CommissionOverview";
import DashboardActions from "./Affiliatecomponents/DashboardActions";
import PerformanceChart from "./Affiliatecomponents/PerformanceChart";
import StatsGrid from "./Affiliatecomponents/StatsGrid";

export default function AffiliateDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <h1 className="mb-1 text-3xl font-semibold text-gray-900">
            Affiliate Dashboard
          </h1>
          <p className="mb-4 text-sm text-gray-500">
            Track your performance, earnings, referrals, and affiliate
            activity.
          </p>
          <DashboardActions />
        </div>

        <AffiliateCodeCard />
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PerformanceChart />
        </div>
        <CommissionOverview />
      </div>
    </div>
  );
}