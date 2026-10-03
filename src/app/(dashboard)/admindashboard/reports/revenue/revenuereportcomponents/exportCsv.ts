import { Category, MonthPoint } from "./types";

export function exportCsv(months: MonthPoint[], categories: Category[], period: string) {
  const rows: (string | number)[][] = [
    ["Revenue report", period],
    [],
    ["Month", "Marketplace", "Subscriptions", "Joining fees"],
    ...months.map((m) => [m.month, m.marketplace, m.subscriptions, m.joining]),
    [],
    ["Category", "Revenue", "Share %"],
    ...categories.map((c) => [c.name, c.revenue, Math.round(c.share)]),
  ];

  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `revenue-report-${period.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
