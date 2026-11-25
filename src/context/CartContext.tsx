import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DELIVERY } from '../data/business';
import { getProductById } from '../data/products';
import type { CartItem, CartLine } from '../types';

const STORAGE_KEY = 'avataar_cart_v1';
const MAX_QTY = 20;

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        typeof i?.productId === 'string' && Number.isInteger(i?.quantity) && i.quantity > 0,
    );
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable – cart still works for this session */
    }
  }, [items]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) } : i,
        );
      }
      return [...prev, { productId, quantity: Math.min(MAX_QTY, quantity) }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, quantity: Math.min(MAX_QTY, quantity) } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    // Prices are always read from the product file, so updates reflect instantly.
    const lines: CartLine[] = items.flatMap((i) => {
      const product = getProductById(i.productId);
      return product ? [{ product, quantity: i.quantity, lineTotal: product.salePrice * i.quantity }] : [];
    });
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const deliveryCharge = subtotal === 0 || subtotal >= DELIVERY.freeAbove ? 0 : DELIVERY.charge;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal,
      deliveryCharge,
      total: subtotal + deliveryCharge,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [items, addItem, removeItem, setQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
