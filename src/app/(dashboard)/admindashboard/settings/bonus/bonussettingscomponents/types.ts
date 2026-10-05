export interface Settings {
  enabled: boolean;
  tierEnabled: boolean;
  quarterlyEnabled: boolean;
  quarterlyAmount: number;
  welcomeEnabled: boolean;
  welcomeAmount: number;
  welcomeConversions: number; // koto conversion porjonto welcome bonus
  seasonalEnabled: boolean;
  seasonalAmount: number;
}

// key er jayga field er naam, jemon "welcomeAmount"
export type Errors = Record<string, string>;

export type ToastState = { id: number; type: "success" | "error"; message: string } | null;