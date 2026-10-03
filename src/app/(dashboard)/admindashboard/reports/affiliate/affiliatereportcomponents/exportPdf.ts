import { count, money } from "./format";
import { Affiliate, MonthPoint } from "./types";

export function exportPdf(months: MonthPoint[], rows: Affiliate[], period: string) {
  const w = window.open("", "_blank");
  if (!w) return;

  const monthRows = months
    .map((m) => `<tr><td>${m.month}</td><td>${count(m.clicks)}</td><td>${count(m.conversions)}</td></tr>`)
    .join("");

  const affRows = rows
    .map(
      (a) =>
        `<tr><td>${a.name}</td><td>${count(a.clicks)}</td><td>${count(a.conversions)}</td><td>${money(a.revenue)}</td><td>${money(a.commission)}</td><td>${a.status}</td></tr>`
    )
    .join("");

  w.document.write(`<!doctype html><html><head><title>Affiliate Report</title><style>
    body{font-family:system-ui,sans-serif;padding:32px;color:#111}
    h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:28px 0 8px}p{color:#666;margin:0 0 12px;font-size:13px}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e5e7eb}
    th{font-size:12px;color:#6b7280;text-transform:uppercase}
  </style></head><body>
    <h1>Affiliate Report</h1><p>${period}</p>
    <h2>Monthly traffic</h2>
    <table><thead><tr><th>Month</th><th>Clicks</th><th>Conversions</th></tr></thead><tbody>${monthRows}</tbody></table>
    <h2>Affiliates</h2>
    <table><thead><tr><th>Affiliate</th><th>Clicks</th><th>Conversions</th><th>Revenue</th><th>Commission</th><th>Status</th></tr></thead><tbody>${affRows}</tbody></table>
  </body></html>`);

  w.document.close();
  w.focus();
  w.print();
}
