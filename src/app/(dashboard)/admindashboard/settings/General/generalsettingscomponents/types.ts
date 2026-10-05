export interface Settings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  timezone: string; // IANA naam, jemon "Asia/Dhaka"
  language: string; // language code, jemon "en"
  allowRegistrations: boolean;
  emailNotifications: boolean;
  maintenanceMode: boolean;
}

// key er jayga field er naam, jemon "supportEmail"
export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;