export type ScreenType = 'login' | 'gateway' | 'supplier-onboarding' | 'affiliate-register' | 'customer-register';
export type RoleType = 'customer' | 'affiliate' | 'supplier';
export type PayoutMethod = 'bkash' | 'nagad' | 'bank';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  salesCount: number;
  image: string;
}