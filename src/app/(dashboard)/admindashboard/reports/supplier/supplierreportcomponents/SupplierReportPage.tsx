"use client";

import { exportCsv } from "./exportCsv";
import { exportPdf } from "./exportPdf";
import Pager from "./Pager";
import SupplierPerformanceChart from "./SupplierPerformanceChart";
import SupplierReportHeader from "./SupplierReportHeader";
import SupplierStats from "./SupplierStats";
import SupplierTable from "./SupplierTable";
import SupplierToolbar from "./SupplierToolbar";
import SupplierVolumeChart from "./SupplierVolumeChart";
import { useReveal } from "./useAnimations";
import { useSupplierReport } from "./useSupplierReport";

export default function SupplierReportPage() {
  const r = useSupplierReport();
  const barProgress = useReveal(r.period, 1000);

  return (
    <div className="space-y-6 p-6">
      <SupplierReportHeader />
      <SupplierStats stats={r.stats} trends={r.trends} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SupplierPerformanceChart months={r.months} trigger={r.period} />
        <SupplierVolumeChart months={r.months} trigger={r.period} />
      </div>

      <section className="rounded-xl border border-gray-200 bg-white">
        <SupplierToolbar
          query={r.query}
          onQuery={r.setQuery}
          status={r.status}
          onStatus={r.setStatus}
          period={r.period}
          onPeriod={r.setPeriod}
          onCsv={() => exportCsv(r.months, r.visible, r.period)}
          onPdf={() => exportPdf(r.months, r.visible, r.period)}
        />
        <SupplierTable rows={r.tableRows} sort={r.sort} onSort={r.toggleSort} />
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
