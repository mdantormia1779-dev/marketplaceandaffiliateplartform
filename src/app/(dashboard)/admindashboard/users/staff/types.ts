import type { LucideIcon } from "lucide-react";

export type StaffStatus = "Active" | "Inactive" | "Suspended";

export type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: string;
  status: StaffStatus;
};

export type StaffForm = {
  name: string;
  email: string;
  role: string;
  department: string;
  status: StaffStatus;
};

export type Stat = {
  label: string;
  value: string;
  change: string;
  note: string;
  up: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};