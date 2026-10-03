import { Customer, MonthPoint, SegmentSlice } from "./types";

export function exportCsv(months: MonthPoint[], segments: SegmentSlice[], rows: Customer[], period: string) {
  const data: (string | number)[][] = [
    ["Customer report", period],
    [],
    ["Month", "New customers", "Returning customers"],
    ...months.map((m) => [m.month, m.newCustomers, m.returning]),
    [],
    ["Segment", "Customers", "Share %"],
    ...segments.map((s) => [s.name, s.count, Math.round(s.share)]),
    [],
    ["Customer", "Orders", "Total spent", "AOV", "Segment", "Status"],
    ...rows.map((c) => [c.name, c.orders, c.spent.toFixed(2), Math.round(c.aov), c.segment, c.status]),
  ];

  const csv = data.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `customer-report-${period.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
