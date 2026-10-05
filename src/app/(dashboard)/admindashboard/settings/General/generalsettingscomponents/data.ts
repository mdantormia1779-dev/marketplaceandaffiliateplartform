import { Settings } from "./types";

export const MIN_NAME = 2;
export const MAX_NAME = 50;

export const TIMEZONES: { value: string; label: string }[] = [
  { value: "UTC", label: "UTC" },
  { value: "America/Los_Angeles", label: "Los Angeles (Pacific)" },
  { value: "America/New_York", label: "New York (Eastern)" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Berlin", label: "Berlin (Central Europe)" },
  { value: "Asia/Dubai", label: "Dubai" },
  { value: "Asia/Dhaka", label: "Dhaka" },
  { value: "Asia/Kolkata", label: "Kolkata" },
  { value: "Asia/Singapore", label: "Singapore" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sydney" },
];

export const LANGUAGES: { value: string; label: string }[] = [
  { value: "en", label: "English" },
  { value: "bn", label: "Bengali" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ar", label: "Arabic" },
];

// Pore ei data API theke load korbi (useGeneralSettings e)
export const INITIAL_SETTINGS: Settings = {
  platformName: "Vendora",
  supportEmail: "support@vendora.io",
  supportPhone: "+1 415 555 0142",
  timezone: "UTC",
  language: "en",
  allowRegistrations: true,
  emailNotifications: true,
  maintenanceMode: false,
};