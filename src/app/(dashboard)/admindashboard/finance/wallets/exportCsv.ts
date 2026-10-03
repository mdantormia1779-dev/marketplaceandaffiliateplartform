import { Wallet } from "./types";

export function exportCsv(list: Wallet[]) {
  const head = ["Wallet ID", "Owner", "Type", "Balance", "Pending", "Currency", "Status"];
  const body = list.map((w) => [w.id, w.owner, w.type, w.balance.toFixed(2), w.pending.toFixed(2), w.currency, w.status]);
  const csv = [head, ...body]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "wallets.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
