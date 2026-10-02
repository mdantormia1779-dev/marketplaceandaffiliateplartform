import { Refund } from "./types";

export function exportCsv(list: Refund[]) {
  const head = ["Refund", "Order", "Customer", "Amount", "Reason", "Method", "Status"];
  const body = list.map((r) => [r.id, r.order, r.customer, r.amount.toFixed(2), r.reason, r.method, r.status]);
  const csv = [head, ...body]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "refunds.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
