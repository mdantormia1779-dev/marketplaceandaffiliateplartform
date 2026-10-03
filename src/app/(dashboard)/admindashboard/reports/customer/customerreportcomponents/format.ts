export const count = (n: number) => Math.round(n).toLocaleString("en-US");
export const money0 = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const money2 = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const percent1 = (n: number) => `${n.toFixed(1)}%`;
export const axisCount = (n: number) => (n >= 10000 ? `${n / 1000}k` : count(n));

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
