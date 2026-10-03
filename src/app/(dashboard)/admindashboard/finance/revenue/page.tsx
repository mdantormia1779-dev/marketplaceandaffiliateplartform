"use client";

import BreakdownCard from "./BreakdownCard";
import { exportCsv } from "./exportCsv";
import PaymentMethodsCard from "./PaymentMethodsCard";
import RevenueChart from "./RevenueChart";
import RevenueHeader from "./RevenueHeader";
import RevenueStats from "./RevenueStats";
import { useRevenue } from "./useRevenue";

export default function RevenuePage() {
  const { period, setPeriod, data, stats } = useRevenue();

  return (
    <div className="space-y-6 p-6">
      <RevenueHeader period={period} onPeriod={setPeriod} onExport={() => exportCsv(period, data)} />
      <RevenueStats stats={stats} data={data} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChart months={data.months} revenue={data.revenue} payouts={data.payouts} />
        <PaymentMethodsCard methods={data.methods} />
      </div>
      <BreakdownCard items={data.breakdown} />
    </div>
  );
}
