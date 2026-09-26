export type TabId = "general" | "notifications" | "security" | "payment" | "privacy";

export interface GeneralSettingsData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  language: string;
  timezone: string;
}

export interface NotificationSettingsData {
  email: boolean;
  commission: boolean;
  sales: boolean;
  bonus: boolean;
  referral: boolean;
  withdrawal: boolean;
  marketing: boolean;
}

export interface LoginSession {
  id: string;
  device: string;
  detail: string;
  location: string;
  current?: boolean;
}

export type PaymentMethodType = "bKash" | "Nagad" | "Bank Transfer";

export interface PaymentAccount {
  id: string;
  method: PaymentMethodType;
  detail: string;
  ownerName: string;
}

export interface PrivacySettingsData {
  publicProfile: boolean;
  personalisedMarketing: boolean;
  partnerDataSharing: boolean;
}