import { LucideIcon } from "lucide-react";

export type TimeRange = "7 Days" | "30 Days" | "3 Months" | "6 Months" | "1 Year";

export type TrendDirection = "up" | "down";

export interface StatCardData {
  label: string;
  value: string;
  change: string;
  trend: TrendDirection;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface TrafficSource {
  label: string;
  height: string;
  count: string;
}

export interface DeviceStat {
  label: string;
  value: string;
  width: string;
  color: string;
  dot: string;
}

export interface CountryStat {
  code: string;
  name: string;
  visitors: string;
  percentage: string;
  width: string;
}

export interface ChartDataPoint {
  day: string;
  clicks: number;
  visitors: number;
}