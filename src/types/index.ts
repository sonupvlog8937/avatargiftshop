import type { LucideIcon } from 'lucide-react';

export type CategorySlug =
  | 'birthday-gifts'
  | 'anniversary-gifts'
  | 'flowers-bouquets'
  | 'soft-toys'
  | 'chocolates-hampers'
  | 'home-decor'
  | 'personalised-gifts'
  | 'surprise-gifts';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Original price (MRP) in INR */
  price: number;
  /** Discounted selling price in INR */
  salePrice: number;
  inStock: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  badge?: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  deliveryInstructions: string;
  notes: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
