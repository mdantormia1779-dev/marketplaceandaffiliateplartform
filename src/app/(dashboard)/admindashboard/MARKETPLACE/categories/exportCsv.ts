import { Category } from "./types";

export function exportCsv(categories: Category[]) {
  const head = ["Name", "Slug", "Products", "Status", "Created"];
  const body = categories.map((c) => [c.name, c.slug, c.products, c.status, c.created]);
  const csv = [head, ...body].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "categories.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}