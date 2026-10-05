// $350.00
export const money2 = (n: number) =>
  "$" + (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });