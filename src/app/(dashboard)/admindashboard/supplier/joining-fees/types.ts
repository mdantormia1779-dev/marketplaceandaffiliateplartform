export type FeeStatus = "Paid" | "Pending" | "Waived" | "Suspended";

export interface Fee {
  id: number;
  store: string;
  plan: string;
  amount: number;
  method: string;
  paidOn: string | null; // YYYY-MM-DD, na dile null (table e "—" dekhabe)
  status: FeeStatus;
}