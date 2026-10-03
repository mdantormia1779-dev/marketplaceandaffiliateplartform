import { Affiliate, MonthPoint } from "./types";

export function exportCsv(months: MonthPoint[], rows: Affiliate[], period: string) {
  const data: (string | number)[][] = [
    ["Affiliate report", period],
    [],
    ["Month", "Clicks", "Conversions"],
    ...months.map((m) => [m.month, m.clicks, m.conversions]),
    [],
    ["Affiliate", "Clicks", "Conversions", "Revenue", "Commission", "Status"],
    ...rows.map((a) => [a.name, a.clicks, a.conversions, a.revenue, a.commission, a.status]),
  ];

  const csv = data
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `affiliate-report-${period.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
