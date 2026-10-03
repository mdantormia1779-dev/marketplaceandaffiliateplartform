"use client";

import CustomerReportHeader from "./CustomerReportHeader";
import CustomerStats from "./CustomerStats";
import CustomerTable from "./CustomerTable";
import CustomerToolbar from "./CustomerToolbar";
import GrowthChart from "./GrowthChart";
import Pager from "./Pager";
import SegmentsDonut from "./SegmentsDonut";
import { exportCsv } from "./exportCsv";
import { exportPdf } from "./exportPdf";
import { useCustomerReport } from "./useCustomerReport";

export default function CustomerReportPage() {
  const r = useCustomerReport();

  return (
    <div className="space-y-6 p-6">
      <CustomerReportHeader />
      <CustomerStats stats={r.stats} trends={r.trends} latestLabel={r.latestLabel} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GrowthChart months={r.months} trigger={r.period} />
        <SegmentsDonut segments={r.segments} trigger={r.period} />
      </div>
      <section className="rounded-xl border border-gray-200 bg-white">
        <CustomerToolbar
          query={r.query}
          onQuery={r.setQuery}
          segment={r.segment}
          onSegment={r.setSegment}
          status={r.status}
          onStatus={r.setStatus}
          period={r.period}
          onPeriod={r.setPeriod}
          onCsv={() => exportCsv(r.months, r.segments, r.visible, r.period)}
          onPdf={() => exportPdf(r.months, r.segments, r.visible, r.period)}
        />
        <CustomerTable rows={r.tableRows} sort={r.sort} onSort={r.toggleSort} />
        <Pager page={r.page} totalPages={r.pageCount} onPage={r.setPage} />
      </section>
    </div>
  );
}
