import { MonthRow } from "./types";

export function exportCsv(rows: MonthRow[], period: string) {
  const header = ["Month", "Revenue", "Orders", "Avg. order value"];
  const body = rows.map((row) => [row.month, row.revenue, row.orders, row.aov]);
  const csv = [header, ...body]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `sales-${period.toLowerCase().replace(/\s+/g, "-")}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
