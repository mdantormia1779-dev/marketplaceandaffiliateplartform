import type { Variant } from "./types";

export const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

export const money = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(n).toFixed(2)}`;

export const newVariant = (): Variant => ({
  id: `v-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  price: "",
  stock: "",
});

export const inputCls = (hasError?: boolean) =>
  `w-full rounded-lg border ${
    hasError ? "border-rose-400 focus:ring-rose-500/20" : "border-slate-200 focus:ring-blue-500/20"
  } bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2`;