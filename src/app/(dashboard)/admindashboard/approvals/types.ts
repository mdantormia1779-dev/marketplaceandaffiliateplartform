export type ApprovalStatus = "Pending" | "Approved" | "Rejected" | "Suspended";

export interface Application {
  id: number;
  store: string;
  owner: string;
  email: string;
  category: string;
  country: string;
  submitted: string; // YYYY-MM-DD
  status: ApprovalStatus;
}