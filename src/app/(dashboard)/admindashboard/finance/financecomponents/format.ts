export const money = (n: number, decimals = 0) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const compact = (n: number) => (n === 0 ? "$0" : `$${Math.round(n / 1000)}k`);
