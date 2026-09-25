import { LucideIcon } from "lucide-react";

export type AnalyticsTimeRange =
  | "Today"
  | "7 Days"
  | "30 Days"
  | "3 Months"
  | "6 Months"
  | "Custom Range";

export interface AnalyticsStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  topBarColor: string;
}

export interface DualLineDataPoint {
  label: string;
  valueA: number;
  valueB: number;
}

export interface TrafficSourceItem {
  label: string;
  value: number;
  color: string;
  dotColor: string;
}

export interface DeviceItem {
  label: string;
  value: number;
  percentage: string;
  icon: LucideIcon;
  barColor: string;
}

export interface ProductPerformance {
  name: string;
  emoji: string;
  clicks: string;
  orders: string;
  conversion: string;
  revenue: string;
  commission: string;
}

export interface CountryPerformance {
  code: string;
  name: string;
  visitors: string;
  clicks: string;
  orders: string;
  conversion: string;
}