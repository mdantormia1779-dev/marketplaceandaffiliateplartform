export type TimeRange = 'Today' | '7 days' | '30 days' | '12 months';

export interface StatItem {
  title: string;
  value: string;
  growth: string;
  isUp: boolean;
  subText: string;
  type: 'sales' | 'orders' | 'products' | 'available' | 'pending' | 'subscription';
}

export interface ChartPoint {
  month: string;
  sales: number;
}

export const dynamicStoreData: Record<TimeRange, { stats: StatItem[]; chart: ChartPoint[] }> = {
  'Today': {
    stats: [
      { title: 'Total Sales', value: '$12,450', growth: '3.2%', isUp: true, subText: 'vs yesterday', type: 'sales' },
      { title: 'Total Orders', value: '84', growth: '5.1%', isUp: true, subText: 'vs yesterday', type: 'orders' },
      { title: 'Total Products', value: '248', growth: '0.0%', isUp: true, subText: '18 low in stock', type: 'products' },
      { title: 'Available Balance', value: '$42,250.75', growth: '1.2%', isUp: true, subText: 'Ready to withdraw', type: 'available' },
      { title: 'Pending Balance', value: '$1,420.00', growth: '0.5%', isUp: false, subText: 'Clears in 24 hours', type: 'pending' },
      { title: 'Subscription', value: 'Professional', growth: '', isUp: true, subText: 'Renews on Oct 24', type: 'subscription' },
    ],
    chart: [
      { month: '6 AM', sales: 2 },
      { month: '9 AM', sales: 5 },
      { month: '12 PM', sales: 12 },
      { month: '3 PM', sales: 18 },
      { month: '6 PM', sales: 24 },
      { month: '9 PM', sales: 15 },
    ]
  },
  '7 days': {
    stats: [
      { title: 'Total Sales', value: '$98,200', growth: '8.4%', isUp: true, subText: 'vs last week', type: 'sales' },
      { title: 'Total Orders', value: '640', growth: '6.2%', isUp: true, subText: 'vs last week', type: 'orders' },
      { title: 'Total Products', value: '248', growth: '1.2%', isUp: true, subText: '18 low in stock', type: 'products' },
      { title: 'Available Balance', value: '$42,250.75', growth: '2.5%', isUp: true, subText: 'Ready to withdraw', type: 'available' },
      { title: 'Pending Balance', value: '$4,350.00', growth: '1.1%', isUp: false, subText: 'Clears in 3 days', type: 'pending' },
      { title: 'Subscription', value: 'Professional', growth: '', isUp: true, subText: 'Renews on Oct 24', type: 'subscription' },
    ],
    chart: [
      { month: 'Mon', sales: 12 },
      { month: 'Tue', sales: 15 },
      { month: 'Wed', sales: 18 },
      { month: 'Thu', sales: 14 },
      { month: 'Fri', sales: 22 },
      { month: 'Sat', sales: 25 },
      { month: 'Sun', sales: 20 },
    ]
  },
  '30 days': {
    stats: [
      { title: 'Total Sales', value: '$486,920', growth: '12.4%', isUp: true, subText: 'vs last month', type: 'sales' },
      { title: 'Total Orders', value: '3,128', growth: '8.1%', isUp: true, subText: 'vs last month', type: 'orders' },
      { title: 'Total Products', value: '248', growth: '4.6%', isUp: true, subText: '18 low in stock', type: 'products' },
      { title: 'Available Balance', value: '$42,250.75', growth: '6.2%', isUp: true, subText: 'Ready to withdraw', type: 'available' },
      { title: 'Pending Balance', value: '$12,840.50', growth: '2.3%', isUp: false, subText: 'Clears in 7 days', type: 'pending' },
      { title: 'Subscription', value: 'Professional', growth: '', isUp: true, subText: 'Renews on Oct 24', type: 'subscription' },
    ],
    chart: [
      { month: 'Jan', sales: 25 },
      { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 27 },
      { month: 'Apr', sales: 38 },
      { month: 'May', sales: 40 },
      { month: 'Jun', sales: 38 },
      { month: 'Jul', sales: 46 },
      { month: 'Aug', sales: 50 },
      { month: 'Sep', sales: 49 },
      { month: 'Oct', sales: 58 },
      { month: 'Nov', sales: 62 },
      { month: 'Dec', sales: 60 },
    ]
  },
  '12 months': {
    stats: [
      { title: 'Total Sales', value: '$5,420,000', growth: '24.8%', isUp: true, subText: 'vs last year', type: 'sales' },
      { title: 'Total Orders', value: '38,450', growth: '19.4%', isUp: true, subText: 'vs last year', type: 'orders' },
      { title: 'Total Products', value: '248', growth: '15.0%', isUp: true, subText: '18 low in stock', type: 'products' },
      { title: 'Available Balance', value: '$42,250.75', growth: '18.5%', isUp: true, subText: 'Ready to withdraw', type: 'available' },
      { title: 'Pending Balance', value: '$12,840.50', growth: '5.2%', isUp: false, subText: 'Clears in 7 days', type: 'pending' },
      { title: 'Subscription', value: 'Professional', growth: '', isUp: true, subText: 'Renews on Oct 24', type: 'subscription' },
    ],
    chart: [
      { month: '2023 Q1', sales: 120 },
      { month: '2023 Q2', sales: 150 },
      { month: '2023 Q3', sales: 180 },
      { month: '2023 Q4', sales: 220 },
      { month: '2024 Q1', sales: 260 },
      { month: '2024 Q2', sales: 310 },
    ]
  }
};

export const categoryData = [
  { name: 'Electronics', value: 42, color: '#3b82f6' },
  { name: 'Fashion', value: 26, color: '#10b981' },
  { name: 'Home & Living', value: 18, color: '#64748b' },
  { name: 'Beauty', value: 9, color: '#60a5fa' },
  { name: 'Others', value: 5, color: '#cbd5e1' },
];