import { AffiliateProfile, ChecklistItem, StatItem } from "./types";

// Replace with data fetched from your API layer / database
export const PROFILE: AffiliateProfile = {
  fullName: "Debraz Pul",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  status: "active",
  tierLabel: "Gold Partner",
  affiliateId: "AFF-10254",
  email: "debraz@marketplace.com",
  memberSince: "March 2024",
  referralCode: "DEBRAZ25",
  phone: "01712-345678",
  address: "House 42, Road 7, Banani, Dhaka 1213",
  country: "Bangladesh",
  dateOfBirth: "07/22/1996",
  joinedDate: "2024-03-14",
  commissionTier: "Gold · 15% base",
  socialLinks: {
    facebook: "facebook.com/debraz.deals",
    instagram: "instagram.com/debraz.picks",
    youtube: "youtube.com/@debrazreviews",
    tiktok: "tiktok.com/@debraz.finds",
    linkedin: "linkedin.com/in/debraz",
  },
};

export const STATS: StatItem[] = [
  {
    id: "sales",
    label: "Total Sales",
    value: "428",
    changeLabel: "+8.4%",
    changeTone: "up",
    periodLabel: "this month",
    icon: "sales",
    tone: "indigo",
  },
  {
    id: "clicks",
    label: "Total Clicks",
    value: "24,850",
    changeLabel: "+12.5%",
    changeTone: "up",
    periodLabel: "this month",
    icon: "clicks",
    tone: "amber",
  },
  {
    id: "commission",
    label: "Total Commission",
    value: "৳58,420",
    changeLabel: "+15.2%",
    changeTone: "up",
    periodLabel: "all-time",
    icon: "commission",
    tone: "emerald",
  },
  {
    id: "referrals",
    label: "Referrals",
    value: "48",
    changeLabel: "+6 this month",
    changeTone: "up",
    periodLabel: "total invited",
    icon: "referrals",
    tone: "blue",
  },
];

export const CHECKLIST: ChecklistItem[] = [
  { id: "photo", label: "Profile photo", done: true },
  { id: "personal", label: "Personal information", done: true },
  { id: "payment", label: "Payment method", done: true },
  { id: "social", label: "Social profiles", done: true },
  { id: "identity", label: "Identity verification", done: false },
];