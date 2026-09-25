export interface BonusMetricCard {
  title: string;
  amount: string;
  percentage: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
}

export interface ActiveCampaign {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  current: string;
  target: string;
  footerText: string;
  status: 'Active' | 'Unlocked' | 'Pending';
  icon: string;
}

export interface BonusHistoryItem {
  id: string;
  name: string;
  type: 'Performance' | 'Referral' | 'Campaign' | 'Milestone';
  requirement: string;
  reward: string;
  earnedDate: string;
  status: 'Claimed' | 'Completed' | 'In Progress' | 'Expired';
}