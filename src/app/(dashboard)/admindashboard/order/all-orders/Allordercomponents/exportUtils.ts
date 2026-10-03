import { Order } from "./types";

const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

function download(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const stamp = () => new Date().toISOString().slice(0, 10);

export function downloadCSV(orders: Order[]) {
  const head = ["Order ID", "Customer", "Email", "Supplier", "Affiliate", "Amount", "Payment", "Status", "Date"];
  const rows = orders.map((o) => [
    o.id, o.customer.name, o.customer.email, o.supplier,
    o.affiliate?.name ?? "", o.amount.toFixed(2), o.payment, o.status, o.date,
  ]);
  const csv = [head, ...rows].map((r) => r.map(esc).join(",")).join("\n");
  download("\uFEFF" + csv, `orders-${stamp()}.csv`, "text/csv;charset=utf-8;");
}

export function downloadJSON(orders: Order[]) {
  download(JSON.stringify(orders, null, 2), `orders-${stamp()}.json`, "application/json");
}