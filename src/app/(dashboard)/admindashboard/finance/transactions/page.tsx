"use client";

import { exportCsv } from "./exportCsv";
import TablePagination from "./TablePagination";
import TransactionsHeader from "./TransactionsHeader";
import TransactionStats from "./TransactionStats";
import TransactionsTable from "./TransactionsTable";
import TransactionsToolbar from "./TransactionsToolbar";
import { useTransactions } from "./useTransactions";

export default function TransactionsPage() {
  const t = useTransactions();

  return (
    <div className="space-y-6 p-6">
      <TransactionsHeader onExport={() => exportCsv(t.all, "all-transactions")} />
      <TransactionStats stats={t.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <TransactionsToolbar filters={t.filters} onChange={t.updateFilters} onExport={() => exportCsv(t.filtered)} />
        <TransactionsTable rows={t.rows} onStatus={t.setStatus} />
        <TablePagination
          from={t.from}
          to={t.to}
          total={t.filtered.length}
          page={t.page}
          pageCount={t.pageCount}
          pageSize={t.pageSize}
          onPage={t.setPage}
          onPageSize={t.setPageSize}
        />
      </section>
    </div>
  );
}
