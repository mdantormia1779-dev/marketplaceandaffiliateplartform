import { Product } from "./types";

export function exportCsv(products: Product[]) {
  const head = ["Name", "SKU", "Category", "Supplier", "Price", "Stock", "Status", "Submitted"];
  const body = products.map((p) => [p.name, p.sku, p.category, p.supplier, p.price, p.stock, p.status, p.submitted]);
  const csv = [head, ...body].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "products.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}