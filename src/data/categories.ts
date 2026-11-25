import {
  Cake,
  Heart,
  Flower2,
  Gift,
  Candy,
  Lamp,
  Sparkles,
  PartyPopper,
} from 'lucide-react';
import type { Category } from '../types';

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`;

export const CATEGORIES: Category[] = [
  {
    slug: 'birthday-gifts',
    name: 'Birthday Gifts',
    tagline: 'Make their day unforgettable',
    image: u('photo-1513201099705-a9746e1e201f'),
    icon: Cake,
  },
  {
    slug: 'anniversary-gifts',
    name: 'Anniversary Gifts',
    tagline: 'Celebrate every year of love',
    image: u('photo-1518199266791-5375a83190b7'),
    icon: Heart,
  },
  {
    slug: 'flowers-bouquets',
    name: 'Flowers & Bouquets',
    tagline: 'Fresh, hand-tied blooms',
    image: u('photo-1490750967868-88aa4486c946'),
    icon: Flower2,
  },
  {
    slug: 'soft-toys',
    name: 'Soft Toys',
    tagline: 'Cuddly companions',
    image: u('photo-1559454403-b8fb88521f11'),
    icon: Gift,
  },
  {
    slug: 'chocolates-hampers',
    name: 'Chocolates & Gift Hampers',
    tagline: 'Sweet, curated surprises',
    image: u('photo-1549007994-cb92caebd54b'),
    icon: Candy,
  },
  {
    slug: 'home-decor',
    name: 'Home Decor',
    tagline: 'Elegant touches for your space',
    image: u('photo-1513694203232-719a280e022f'),
    icon: Lamp,
  },
  {
    slug: 'personalised-gifts',
    name: 'Personalised Gifts',
    tagline: 'Made just for them',
    image: u('photo-1607344645866-009c320b63e0'),
    icon: Sparkles,
  },
  {
    slug: 'surprise-gifts',
    name: 'Surprise Gifts',
    tagline: 'Boxes full of delight',
    image: u('photo-1549465220-1a8b9238cd48'),
    icon: PartyPopper,
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
