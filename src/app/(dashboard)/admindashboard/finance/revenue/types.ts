export type Period = "This year" | "Last year" | "Last 6 months";

export interface Method {
  name: string;
  share: number;
}

export interface BreakdownItem {
  label: string;
  amount: number;
  trend: number;
}

export interface PeriodData {
  months: string[];
  revenue: number[];
  payouts: number[];
  methods: Method[];
  aov: number;
  compareLabel: string;
  trends: { gross: number; payouts: number; net: number; aov: number };
  breakdown: BreakdownItem[];
}
