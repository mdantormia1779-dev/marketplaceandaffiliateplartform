export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export const money2 = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const compact = (n: number) => (n === 0 ? "$0" : `$${Math.round(n / 1000)}k`);

export const count = (n: number) => Math.round(n).toLocaleString("en-US");

export const percent = (n: number) => `${n.toFixed(1)}%`;
