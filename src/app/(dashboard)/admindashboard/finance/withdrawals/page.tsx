"use client";

import { exportCsv } from "./exportCsv";
import TablePagination from "./TablePagination";
import { useWithdrawals } from "./useWithdrawals";
import WithdrawalStats from "./WithdrawalStats";
import WithdrawalsHeader from "./WithdrawalsHeader";
import WithdrawalsTable from "./WithdrawalsTable";
import WithdrawalsToolbar from "./WithdrawalsToolbar";

export default function WithdrawalsPage() {
  const w = useWithdrawals();

  return (
    <div className="space-y-6 p-6">
      <WithdrawalsHeader />
      <WithdrawalStats stats={w.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <WithdrawalsToolbar filters={w.filters} onChange={w.updateFilters} onExport={() => exportCsv(w.filtered)} />
        <WithdrawalsTable rows={w.rows} onStatus={w.setStatus} />
        <TablePagination
          from={w.from}
          to={w.to}
          total={w.filtered.length}
          page={w.page}
          pageCount={w.pageCount}
          pageSize={w.pageSize}
          onPage={w.setPage}
          onPageSize={w.setPageSize}
        />
      </section>
    </div>
  );
}
