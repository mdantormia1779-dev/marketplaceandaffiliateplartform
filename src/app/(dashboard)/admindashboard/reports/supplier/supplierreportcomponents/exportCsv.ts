import { MonthPoint, Supplier } from "./types";

export function exportCsv(months: MonthPoint[], rows: Supplier[], period: string) {
  const data: (string | number)[][] = [
    ["Supplier report", period],
    [],
    ["Month", "Orders", "Payouts", "New suppliers"],
    ...months.map((m) => [m.month, m.orders, m.payouts, m.newSuppliers]),
    [],
    ["Supplier", "Category", "Orders", "Fill Rate %", "Payouts", "Rating", "Status"],
    ...rows.map((s) => [s.name, s.category, s.orders, s.fillRate, s.payouts, s.rating, s.status]),
  ];

  const csv = data
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `supplier-report-${period.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
