"use client";

import { exportCsv } from "./exportCsv";
import RefundsHeader from "./RefundsHeader";
import RefundStats from "./RefundStats";
import RefundsTable from "./RefundsTable";
import RefundsToolbar from "./RefundsToolbar";
import TablePagination from "./TablePagination";
import { useRefunds } from "./useRefunds";

export default function RefundsPage() {
  const r = useRefunds();

  return (
    <div className="space-y-6 p-6">
      <RefundsHeader />
      <RefundStats stats={r.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <RefundsToolbar filters={r.filters} onChange={r.updateFilters} onExport={() => exportCsv(r.filtered)} />
        <RefundsTable rows={r.rows} onStatus={r.setStatus} />
        <TablePagination
          from={r.from}
          to={r.to}
          total={r.filtered.length}
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
