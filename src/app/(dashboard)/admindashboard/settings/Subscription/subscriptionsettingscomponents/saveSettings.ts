import { Settings } from "./types";

// Backend er shomoy ekhane real API call boshabi (jemon PUT /api/settings/subscription)
export async function saveSettings(settings: Settings): Promise<void> {
  void settings;
  await new Promise((resolve) => setTimeout(resolve, 700));
}