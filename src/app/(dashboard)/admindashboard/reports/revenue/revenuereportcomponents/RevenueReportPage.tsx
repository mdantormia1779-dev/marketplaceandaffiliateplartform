"use client";

import CategoryDonut from "./CategoryDonut";
import CategoryTable from "./CategoryTable";
import CategoryToolbar from "./CategoryToolbar";
import ChannelChart from "./ChannelChart";
import { exportCsv } from "./exportCsv";
import { exportPdf } from "./exportPdf";
import Pager from "./Pager";
import RevenueReportHeader from "./RevenueReportHeader";
import RevenueStats from "./RevenueStats";
import { useReveal } from "./useAnimations";
import { useRevenueReport } from "./useRevenueReport";

export default function RevenueReportPage() {
  const r = useRevenueReport();
  const barProgress = useReveal(r.period, 1000);

  return (
    <div className="space-y-6 p-6">
      <RevenueReportHeader />
      <RevenueStats stats={r.stats} trends={r.trends} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChannelChart months={r.months} trigger={r.period} />
        <CategoryDonut categories={r.categories} trigger={r.period} />
      </div>
      <section className="rounded-xl border border-gray-200 bg-white">
        <CategoryToolbar
          query={r.query}
          onQuery={r.setQuery}
          period={r.period}
          onPeriod={r.setPeriod}
          onCsv={() => exportCsv(r.months, r.visible, r.period)}
          onPdf={() => exportPdf(r.months, r.visible, r.period)}
        />
        <CategoryTable rows={r.tableRows} sort={r.sort} onSort={r.toggleSort} progress={barProgress} />
        <Pager
          from={r.from}
          to={r.to}
          total={r.visible.length}
          page={r.page}
          pageCount={r.pageCount}
          pageSize={r.pageSize}
          onPage={r.setPage}
          onPageSize={r.setPageSize}
        />
      </section>
    </div>
  );
}
