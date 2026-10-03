export const count = (n: number) => Math.round(n).toLocaleString("en-US");
export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const percent = (n: number) => `${Math.round(n)}%`;
export const rating = (n: number) => `${Number(n).toFixed(1)}`;

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
