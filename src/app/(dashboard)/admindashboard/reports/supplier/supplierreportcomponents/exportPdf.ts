import { count, money, percent } from "./format";
import { MonthPoint, Supplier } from "./types";

export function exportPdf(months: MonthPoint[], rows: Supplier[], period: string) {
  const w = window.open("", "_blank");
  if (!w) return;

  const monthRows = months
    .map((m) => `<tr><td>${m.month}</td><td>${count(m.orders)}</td><td>${money(m.payouts)}</td><td>${count(m.newSuppliers)}</td></tr>`)
    .join("");

  const supplierRows = rows
    .map(
      (s) =>
        `<tr><td>${s.name}</td><td>${s.category}</td><td>${count(s.orders)}</td><td>${percent(s.fillRate)}</td><td>${money(s.payouts)}</td><td>${s.rating.toFixed(1)}</td><td>${s.status}</td></tr>`
    )
    .join("");

  w.document.write(`<!doctype html><html><head><title>Supplier Report</title><style>
    body{font-family:system-ui,sans-serif;padding:32px;color:#111}
    h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:28px 0 8px}p{color:#666;margin:0 0 12px;font-size:13px}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e5e7eb}
    th{font-size:12px;color:#6b7280;text-transform:uppercase}
  </style></head><body>
    <h1>Supplier Report</h1><p>${period}</p>
    <h2>Monthly performance</h2>
    <table><thead><tr><th>Month</th><th>Orders</th><th>Payouts</th><th>New suppliers</th></tr></thead><tbody>${monthRows}</tbody></table>
    <h2>Suppliers</h2>
    <table><thead><tr><th>Supplier</th><th>Category</th><th>Orders</th><th>Fill rate</th><th>Payouts</th><th>Rating</th><th>Status</th></tr></thead><tbody>${supplierRows}</tbody></table>
  </body></html>`);

  w.document.close();
  w.focus();
  w.print();
}
