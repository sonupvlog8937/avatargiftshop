import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE } from '../data/business';
import type { CartLine, CustomerDetails, Product } from '../types';
import { formatINR } from './format';

/** Builds a wa.me click-to-chat URL. The message is always URI-encoded. */
export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const defaultWhatsAppUrl = () => buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

export const productPageUrl = (product: Product) =>
  `${window.location.origin}/product/${product.slug}`;

export const buildProductMessage = (product: Product) =>
  [
    'Hello Avataar :: Decor & Gifts!',
    '',
    'I am interested in this product:',
    '',
    `Product: ${product.name}`,
    `Price: ${formatINR(product.salePrice)}`,
    `Link: ${productPageUrl(product)}`,
    '',
    'Please share availability and delivery details.',
  ].join('\n');

export const productWhatsAppUrl = (product: Product) =>
  buildWhatsAppUrl(buildProductMessage(product));

interface OrderTotals {
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

/** Builds the order message in the exact structure requested by the shop. */
export const buildOrderMessage = (
  customer: CustomerDetails,
  lines: CartLine[],
  totals: OrderTotals,
) => {
  const items = lines
    .map(
      (l, i) =>
        `${i + 1}. Product Name: ${l.product.name}\n` +
        `   Quantity: ${l.quantity}\n` +
        `   Price: ${formatINR(l.product.salePrice)}\n` +
        `   Subtotal: ${formatINR(l.lineTotal)}`,
    )
    .join('\n\n');

  const extraNotes = [
    customer.deliveryInstructions.trim() && `Delivery Instructions: ${customer.deliveryInstructions.trim()}`,
    customer.notes.trim() && customer.notes.trim(),
  ]
    .filter(Boolean)
    .join(' | ');

  return [
    'Hello Avataar :: Decor & Gifts!',
    '',
    'I want to place an order through your website.',
    '',
    'CUSTOMER DETAILS:',
    `Name: ${customer.name.trim()}`,
    `Phone: ${customer.phone.trim()}`,
    `Delivery Address: ${customer.address.trim()}`,
    `City: ${customer.city.trim() || '-'}`,
    `Pincode: ${customer.pincode.trim() || '-'}`,
    '',
    'ORDER DETAILS:',
    '',
    items,
    '',
    'ORDER SUMMARY:',
    `Subtotal: ${formatINR(totals.subtotal)}`,
    `Delivery Charges: ${totals.deliveryCharge === 0 ? '₹0 (Free)' : formatINR(totals.deliveryCharge)}`,
    `Total Amount: ${formatINR(totals.total)}`,
    '',
    `Additional Notes: ${extraNotes || '-'}`,
    '',
    'Please confirm product availability and delivery details.',
    '',
    'Thank you!',
  ].join('\n');
};

export const buildEnquiryMessage = (name: string, phone: string, message: string) =>
  [
    'Hello Avataar :: Decor & Gifts!',
    '',
    `Name: ${name}`,
    phone ? `Phone: ${phone}` : '',
    '',
    message,
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n');
