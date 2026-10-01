import type { LucideIcon } from "lucide-react";

export type AffiliateStatus = "Active" | "Pending" | "Suspended";

export type Affiliate = {
  id: number;
  name: string;
  email: string;
  code: string;
  referrals: number;
  earnings: number;
  status: AffiliateStatus;
  joined: string;
};

export type Stat = {
  label: string;
  value: string;
  change: string;
  note: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};
export type AffiliateForm = {
  name: string;
  email: string;
  code: string;
  status: AffiliateStatus;
};
export type InviteForm = {
  name: string;
  email: string;
  code: string;
  status: AffiliateStatus;
};