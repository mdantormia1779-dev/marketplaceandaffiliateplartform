export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export const signedMoney = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
