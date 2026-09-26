export type ReferralStatus = 'Active' | 'Pending' | 'Inactive';

export interface ReferralItem {
  id: string;
  name: string;
  joinedDate: string;
  status: ReferralStatus;
  salesGenerated: number;
  commission: number;
}