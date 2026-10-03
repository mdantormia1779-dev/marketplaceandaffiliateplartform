import { count, money } from "./format";
import { MonthRow } from "./types";

export function exportPdf(rows: MonthRow[], period: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    throw new Error("Could not open the print window. Allow pop-ups and try again.");
  }

  const body = rows
    .map((row) => `<tr><td>${row.month}</td><td>${money(row.revenue)}</td><td>${count(row.orders)}</td><td>${money(row.aov)}</td></tr>`)
    .join("");
  printWindow.document.write(`<!doctype html><html><head><title>Sales Report</title><style>
    body{font-family:system-ui,sans-serif;padding:32px;color:#111}
    h1{font-size:22px;margin:0 0 4px}p{color:#666;margin:0 0 20px;font-size:13px}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e5e7eb}
    th{font-size:12px;color:#6b7280;text-transform:uppercase}
  </style></head><body>
    <h1>Sales Report</h1><p>${period}</p>
    <table><thead><tr><th>Month</th><th>Revenue</th><th>Orders</th><th>Avg. order value</th></tr></thead><tbody>${body}</tbody></table>
  </body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
