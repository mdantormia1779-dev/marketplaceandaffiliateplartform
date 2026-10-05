import { Settings } from "./types";

export async function saveSettings(settings: Settings): Promise<void> {
  void settings;
  await new Promise((resolve) => setTimeout(resolve, 700));
}
