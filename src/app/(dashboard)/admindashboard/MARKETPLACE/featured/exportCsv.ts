import { FeaturedView } from "./types";

export function exportCsv(items: FeaturedView[]) {
  const head = ["Product", "Supplier", "Placement", "Start", "End", "Status"];
  const body = items.map((f) => [f.product, f.supplier, f.placement, f.start, f.end, f.status]);
  const csv = [head, ...body].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "featured-products.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}