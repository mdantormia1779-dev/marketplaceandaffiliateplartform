import { Review } from "./types";

export function exportCsv(reviews: Review[]) {
  const head = ["Title", "Product", "Customer", "Rating", "Status", "Date"];
  const body = reviews.map((r) => [r.title, r.product, r.customer, r.rating, r.status, r.date]);
  const csv = [head, ...body].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "reviews.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}