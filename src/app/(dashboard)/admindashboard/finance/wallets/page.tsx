"use client";

import { useState } from "react";
import AdjustBalanceModal from "./AdjustBalanceModal";
import { exportCsv } from "./exportCsv";
import TablePagination from "./TablePagination";
import { useWallets } from "./useWallets";
import WalletsHeader from "./WalletsHeader";
import WalletStats from "./WalletStats";
import WalletsTable from "./WalletsTable";
import WalletsToolbar from "./WalletsToolbar";

export default function WalletsPage() {
  const w = useWallets();
  const [adjustId, setAdjustId] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-6">
      <WalletsHeader onAdjust={() => setAdjustId("")} />
      <WalletStats stats={w.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <WalletsToolbar filters={w.filters} onChange={w.updateFilters} onExport={() => exportCsv(w.filtered)} />
        <WalletsTable rows={w.rows} onAdjust={setAdjustId} onToggleFreeze={w.toggleFreeze} />
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
      {adjustId !== null && (
        <AdjustBalanceModal
          wallets={w.wallets}
          initialId={adjustId}
          onClose={() => setAdjustId(null)}
          onAdjust={w.adjust}
        />
      )}
    </div>
  );
}
