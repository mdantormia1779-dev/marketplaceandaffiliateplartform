export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export const compact = (n: number) => (n === 0 ? "$0" : `$${Math.round(n / 1000)}k`);

export const percent = (n: number) => `${Math.round(n)}%`;
