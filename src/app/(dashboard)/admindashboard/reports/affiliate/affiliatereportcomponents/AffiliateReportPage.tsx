"use client";

import AffiliateReportHeader from "./AffiliateReportHeader";
import AffiliateStats from "./AffiliateStats";
import AffiliateTable from "./AffiliateTable";
import AffiliateToolbar from "./AffiliateToolbar";
import ClicksTrendChart from "./ClicksTrendChart";
import ConversionsChart from "./ConversionsChart";
import { exportCsv } from "./exportCsv";
import { exportPdf } from "./exportPdf";
import Pager from "./Pager";
import { useAffiliateReport } from "./useAffiliateReport";

export default function AffiliateReportPage() {
  const r = useAffiliateReport();

  return (
    <div className="space-y-6 p-6">
      <AffiliateReportHeader />
      <AffiliateStats stats={r.stats} trends={r.trends} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ClicksTrendChart months={r.months} trigger={r.period} />
        <ConversionsChart months={r.months} trigger={r.period} />
      </div>
      <section className="rounded-xl border border-gray-200 bg-white">
        <AffiliateToolbar
          query={r.query}
          onQuery={r.setQuery}
          status={r.status}
          onStatus={r.setStatus}
          period={r.period}
          onPeriod={r.setPeriod}
          onCsv={() => exportCsv(r.months, r.visible, r.period)}
          onPdf={() => exportPdf(r.months, r.visible, r.period)}
        />
        <AffiliateTable rows={r.tableRows} sort={r.sort} onSort={r.toggleSort} />
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
