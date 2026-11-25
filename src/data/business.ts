export const BUSINESS = {
  name: 'Avataar :: Decor & Gifts',
  shortName: 'Avataar',
  tagline: 'Decor & Gifts',
  category: 'Gift Shop | Flowers & Gifts',
  addressLines: ['Dighi More, Rajendra Ashram', 'Gaya, Bihar 823001, India'],
  address: 'Dighi More, Rajendra Ashram, Gaya, Bihar 823001, India',
  phoneDisplay: '+91 90600 25117',
  phoneTel: '+919060025117',
  // wa.me needs digits only (country code + number, no "+")
  whatsappNumber: '919060025117',
  instagramUrl: 'https://www.instagram.com/avataardg/',
  rating: 4.9,
  reviewCount: 285,
  hours: 'Daily, 11:00 AM – 9:00 PM',
  hoursShort: '11:00 AM – 9:00 PM',
  lat: 24.788344,
  lng: 85.005314,
  announcement: 'Make Every Moment Special – Discover Beautiful Gifts.',
} as const;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.lat},${BUSINESS.lng}`;
export const MAPS_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${BUSINESS.lat},${BUSINESS.lng}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${BUSINESS.lat},${BUSINESS.lng}&z=16&hl=en&output=embed`;

/** Delivery rules – change here to update everywhere. */
export const DELIVERY = {
  charge: 60,
  freeAbove: 999,
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello Avataar :: Decor & Gifts, I would like to know more about your products.';
