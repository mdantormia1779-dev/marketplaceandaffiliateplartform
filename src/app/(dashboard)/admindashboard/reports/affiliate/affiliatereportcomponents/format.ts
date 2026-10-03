export const count = (n: number) => Math.round(n).toLocaleString("en-US");
export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export const axisClicks = (n: number) => (n >= 12000 ? `${n / 1000}k` : count(n));

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
