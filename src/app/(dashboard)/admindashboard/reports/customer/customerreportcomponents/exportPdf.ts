import { count, money0, money2 } from "./format";
import { Customer, MonthPoint, SegmentSlice } from "./types";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export function exportPdf(months: MonthPoint[], segments: SegmentSlice[], rows: Customer[], period: string) {
  const w = window.open("", "_blank");
  if (!w) return;

  const monthRows = months
    .map((m) => `<tr><td>${esc(m.month)}</td><td>${count(m.newCustomers)}</td><td>${count(m.returning)}</td></tr>`)
    .join("");
  const segRows = segments
    .map((s) => `<tr><td>${esc(s.name)}</td><td>${count(s.count)}</td><td>${Math.round(s.share)}%</td></tr>`)
    .join("");
  const customerRows = rows
    .map(
      (c) =>
        `<tr><td>${esc(c.name)}</td><td>${count(c.orders)}</td><td>${money2(c.spent)}</td><td>${money0(c.aov)}</td><td>${esc(c.segment)}</td><td>${esc(c.status)}</td></tr>`
    )
    .join("");

  w.document.write(`<!doctype html><html><head><title>Customer Report</title><style>
    body{font-family:system-ui,sans-serif;padding:32px;color:#111}
    h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:28px 0 8px}p{color:#666;margin:0 0 12px;font-size:13px}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e5e7eb}
    th{font-size:12px;color:#6b7280;text-transform:uppercase}
  </style></head><body>
    <h1>Customer Report</h1><p>${esc(period)}</p>
    <h2>Customer growth</h2>
    <table><thead><tr><th>Month</th><th>New</th><th>Returning</th></tr></thead><tbody>${monthRows}</tbody></table>
    <h2>Segments</h2>
    <table><thead><tr><th>Segment</th><th>Customers</th><th>Share</th></tr></thead><tbody>${segRows}</tbody></table>
    <h2>Customers</h2>
    <table><thead><tr><th>Customer</th><th>Orders</th><th>Total spent</th><th>AOV</th><th>Segment</th><th>Status</th></tr></thead><tbody>${customerRows}</tbody></table>
  </body></html>`);
  w.document.close();
  w.focus();
  w.print();
}
