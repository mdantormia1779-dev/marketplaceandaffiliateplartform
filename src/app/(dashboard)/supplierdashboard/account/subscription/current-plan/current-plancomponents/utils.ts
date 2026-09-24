export const formatBDT = (n: number) => `৳${n.toLocaleString("en-US")}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const percent = (used: number, limit: number) =>
  limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;