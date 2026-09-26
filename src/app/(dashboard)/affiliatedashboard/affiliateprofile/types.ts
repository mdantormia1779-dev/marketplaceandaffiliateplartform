export type AffiliateStatus = "active" | "inactive" | "suspended";

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
};

export type AffiliateProfile = {
  fullName: string;
  avatarUrl: string;
  status: AffiliateStatus;
  tierLabel: string; // e.g. "Gold Partner"
  affiliateId: string;
  email: string;
  memberSince: string; // display string e.g. "March 2024"
  referralCode: string;
  phone: string;
  address: string;
  country: string;
  dateOfBirth: string; // MM/DD/YYYY
  joinedDate: string; // ISO
  commissionTier: string; // e.g. "Gold · 15% base"
  socialLinks: SocialLinks;
};

export type StatTone = "indigo" | "amber" | "emerald" | "blue";

export type StatItem = {
  id: string;
  label: string;
  value: string;
  changeLabel: string;
  changeTone: "up" | "down";
  periodLabel: string;
  icon: "sales" | "clicks" | "commission" | "referrals";
  tone: StatTone;
};

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type EditProfileFormValues = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
};