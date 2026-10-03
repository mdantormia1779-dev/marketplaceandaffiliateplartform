import { Withdrawal } from "./types";

export function exportCsv(list: Withdrawal[]) {
  const head = ["Request", "Requested by", "Type", "Amount", "Method", "Requested", "Status"];
  const body = list.map((w) => [w.id, w.requester, w.type, w.amount.toFixed(2), w.method, w.requested, w.status]);
  const csv = [head, ...body]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "withdrawals.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
