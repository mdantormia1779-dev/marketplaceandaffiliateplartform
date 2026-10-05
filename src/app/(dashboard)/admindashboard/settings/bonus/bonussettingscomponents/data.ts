import { Settings } from "./types";

export const MAX_BONUS = 10000;
export const MAX_CONVERSIONS = 10000;

// Tier milestone bonus Commission page er tier bonus theke ashe (shob cheye boro tier = Platinum $500).
// Ekhane edit hoy na. Backend er shomoy Commission settings theke nibi.
export const TIER_MAX_BONUS = 500;

// Pore ei data API theke load korbi (useBonusSettings e)
export const INITIAL_SETTINGS: Settings = {
  enabled: true,
  tierEnabled: true,
  quarterlyEnabled: true,
  quarterlyAmount: 350,
  welcomeEnabled: true,
  welcomeAmount: 50,
  welcomeConversions: 100,
  seasonalEnabled: true,
  seasonalAmount: 220,
};