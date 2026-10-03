import { money, percent } from "./format";
import { Category, MonthPoint } from "./types";

export function exportPdf(months: MonthPoint[], categories: Category[], period: string) {
  const w = window.open("", "_blank");
  if (!w) return;

  const monthRows = months
    .map(
      (m) =>
        `<tr><td>${m.month}</td><td>${money(m.marketplace)}</td><td>${money(m.subscriptions)}</td><td>${money(m.joining)}</td></tr>`
    )
    .join("");

  const catRows = categories
    .map((c) => `<tr><td>${c.name}</td><td>${money(c.revenue)}</td><td>${percent(c.share)}</td></tr>`)
    .join("");

  w.document.write(`<!doctype html><html><head><title>Revenue Report</title><style>
    body{font-family:system-ui,sans-serif;padding:32px;color:#111}
    h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:28px 0 8px}p{color:#666;margin:0 0 12px;font-size:13px}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e5e7eb}
    th{font-size:12px;color:#6b7280;text-transform:uppercase}
  </style></head><body>
    <h1>Revenue Report</h1><p>${period}</p>
    <h2>Revenue by channel</h2>
    <table><thead><tr><th>Month</th><th>Marketplace</th><th>Subscriptions</th><th>Joining fees</th></tr></thead><tbody>${monthRows}</tbody></table>
    <h2>Category split</h2>
    <table><thead><tr><th>Category</th><th>Revenue</th><th>Share</th></tr></thead><tbody>${catRows}</tbody></table>
  </body></html>`);

  w.document.close();
  w.focus();
  w.print();
}
