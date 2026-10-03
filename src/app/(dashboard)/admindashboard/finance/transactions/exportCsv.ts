import { Transaction } from "./types";

export function exportCsv(list: Transaction[], name = "transactions") {
  const head = ["Transaction", "Date", "Type", "Reference", "Party", "Amount", "Method", "Status"];
  const body = list.map((t) => [t.id, t.date, t.type, t.reference, t.party, t.amount.toFixed(2), t.method, t.status]);
  const csv = [head, ...body]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
