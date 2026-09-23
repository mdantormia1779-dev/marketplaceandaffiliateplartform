import type { Affiliate } from "./data";

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function affiliatesToCsv(affiliates: Affiliate[]): string {
  const headers = [
    "Name",
    "Email",
    "Joined",
    "Products",
    "Clicks",
    "Orders",
    "Conversion",
    "Commission Rate (%)",
    "Commission Earned",
    "Status",
  ];

  const rows = affiliates.map((a) => {
    const conversion = a.clicks > 0 ? `${((a.orders / a.clicks) * 100).toFixed(1)}%` : "0%";
    return [
      a.name,
      a.email,
      a.joinedAt,
      a.products.join("; "),
      a.clicks,
      a.orders,
      conversion,
      a.commissionRate,
      a.commissionEarned,
      a.status,
    ];
  });

  return [headers, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
}

export function downloadCsv(filename: string, csvContent: string) {
  // Prefix with a BOM so Excel opens UTF-8 (৳ etc.) correctly.
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportAffiliatesToCsv(affiliates: Affiliate[], filename = "affiliates.csv") {
  downloadCsv(filename, affiliatesToCsv(affiliates));
}