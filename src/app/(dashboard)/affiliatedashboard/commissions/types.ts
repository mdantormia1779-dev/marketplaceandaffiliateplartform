export interface CommissionItem {
  id: string;
  orderId: string;
  product: string;
  saleAmount: string;
  rate: string;
  commission: string;
  date: string;
  status: 'Approved' | 'Paid' | 'Pending' | 'Cancelled';
}