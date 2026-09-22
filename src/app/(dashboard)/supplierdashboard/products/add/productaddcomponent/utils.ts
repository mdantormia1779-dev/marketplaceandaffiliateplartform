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

export const inputCls = (error?: boolean) =>
  `h-10 w-full rounded-md border bg-white px-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
  }`;