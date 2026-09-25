import { Smartphone, Landmark, LucideIcon } from "lucide-react";
import { PaymentMethodType } from "./types";

export const PAYMENT_METHOD_TYPES: PaymentMethodType[] = ["bKash", "Nagad", "Bank Transfer"];

export const METHOD_ICONS: Record<PaymentMethodType, LucideIcon> = {
  bKash: Smartphone,
  Nagad: Smartphone,
  "Bank Transfer": Landmark,
};

export const METHOD_STYLES: Record<PaymentMethodType, { bg: string; color: string }> = {
  bKash: { bg: "bg-pink-50", color: "text-pink-600" },
  Nagad: { bg: "bg-orange-50", color: "text-orange-600" },
  "Bank Transfer": { bg: "bg-indigo-50", color: "text-indigo-600" },
};

export const QUICK_AMOUNTS: number[] = [1000, 5000, 10000];