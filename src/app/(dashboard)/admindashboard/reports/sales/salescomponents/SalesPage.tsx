"use client";

import { exportCsv } from "./exportCsv";
import { exportPdf } from "./exportPdf";
import OrderVolumeChart from "./OrderVolumeChart";
import Pager from "./Pager";
import RevenueTrendChart from "./RevenueTrendChart";
import SalesHeader from "./SalesHeader";
import SalesStats from "./SalesStats";
import SalesTable from "./SalesTable";
import SalesToolbar from "./SalesToolbar";
import { useSales } from "./useSales";

export default function SalesPage() {
  const sales = useSales();

  return (
    <div className="space-y-6 p-6">
      <SalesHeader />
      <SalesStats stats={sales.stats} trends={sales.trends} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueTrendChart rows={sales.rows} trigger={sales.period} />
        <OrderVolumeChart rows={sales.rows} trigger={sales.period} />
      </div>
      <section className="rounded-xl border border-gray-200 bg-white">
        <SalesToolbar
          query={sales.query}
          onQuery={sales.setQuery}
          period={sales.period}
          onPeriod={sales.setPeriod}
          onCsv={() => exportCsv(sales.visible, sales.period)}
          onPdf={() => exportPdf(sales.visible, sales.period)}
        />
        <SalesTable rows={sales.tableRows} sort={sales.sort} onSort={sales.toggleSort} />
        <Pager
          from={sales.from}
          to={sales.to}
          total={sales.visible.length}
          page={sales.page}
          pageCount={sales.pageCount}
          pageSize={sales.pageSize}
          onPage={sales.setPage}
          onPageSize={sales.setPageSize}
        />
      </section>
    </div>
  );
}
