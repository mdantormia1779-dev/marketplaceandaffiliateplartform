import { Brand } from "./types";

export function exportCsv(brands: Brand[]) {
  const head = ["Brand", "Company", "Products", "Status", "Created"];
  const body = brands.map((b) => [b.name, b.company, b.products, b.status, b.created]);
  const csv = [head, ...body].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "brands.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}