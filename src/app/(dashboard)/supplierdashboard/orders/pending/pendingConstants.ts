export const PENDING_URGENT_HOURS = 24;
export const SLA_HOURS = 48; // supplier should respond within 48 hours

export const REJECT_REASONS = [
  "Out of stock",
  "Unable to deliver to this address",
  "Price or product information changed",
  "Suspicious order",
  "Other",
] as const;

export type RejectReason = (typeof REJECT_REASONS)[number];

export type UrgencyFilter = "all" | "urgent" | "fresh";
export type PaymentFilter = "all" | "cod" | "prepaid";

export const URGENCY_OPTIONS: { value: UrgencyFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "urgent", label: "Urgent 24h+" },
  { value: "fresh", label: "Fresh" },
];

export const PAYMENT_OPTIONS: { value: PaymentFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cod", label: "COD" },
  { value: "prepaid", label: "Prepaid" },
];

export type UrgencyTone = "fresh" | "warning" | "urgent";

export const TONE_STYLES: Record<
  UrgencyTone,
  { accent: string; bar: string; badge: string }
> = {
  fresh: {
    accent: "bg-emerald-500",
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  warning: {
    accent: "bg-amber-500",
    bar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  urgent: {
    accent: "bg-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  },
};