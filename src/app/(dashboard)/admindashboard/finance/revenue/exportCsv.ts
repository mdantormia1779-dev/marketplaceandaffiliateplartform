import { PeriodData } from "./types";

export function exportCsv(period: string, data: PeriodData) {
  const rows: (string | number)[][] = [
    ["Revenue report", period],
    [],
    ["Month", "Revenue", "Payouts"],
    ...data.months.map((m, i) => [m, data.revenue[i], data.payouts[i]]),
    [],
    ["Payment method", "Share %"],
    ...data.methods.map((x) => [x.name, x.share]),
    [],
    ["Revenue source", "Amount"],
    ...data.breakdown.map((b) => [b.label, b.amount]),
  ];
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `revenue-${period.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
