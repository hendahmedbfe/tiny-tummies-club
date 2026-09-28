import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { fetchProducts, type ShopProduct } from "./shop";

const CART_KEY = "bfe-cart";

type CartContextValue = {
  items: ShopProduct[];
  addItem: (product: ShopProduct) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
  hasItem: (productId: number) => boolean;
  total: number;
};

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
  hasItem: () => false,
  total: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShopProduct[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) setItems(JSON.parse(saved) as ShopProduct[]);
    } catch {
      // A blocked storage setting should not prevent shopping.
    }
  }, []);

  // Keep cart prices in sync with the live WordPress shop prices.
  const ids = items.map((i) => i.id).join(",");
  useEffect(() => {
    if (!ids) return;
    let cancelled = false;
    fetchProducts()
      .then((live) => {
        if (cancelled) return;
        setItems((current) => {
          const next = current
            .map((item) => live.find((p) => p.id === item.id) ?? item);
          const changed = next.some(
            (n, i) => n.price !== current[i]?.price || n.regularPrice !== current[i]?.regularPrice || n.discountPercent !== current[i]?.discountPercent,
          );
          if (!changed) return current;
          try {
            window.localStorage.setItem(CART_KEY, JSON.stringify(next));
          } catch {
            // ignore
          }
          return next;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [ids]);

  const update = useCallback((next: ShopProduct[]) => {
    setItems(next);
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(next));
    } catch {
      // Keep the in-memory cart available when storage is blocked.
    }
  }, []);

  const addItem = useCallback(
    (product: ShopProduct) => {
      if (items.some((item) => item.id === product.id)) {
        toast("This book is already in your cart");
        return;
      }
      update([...items, product]);
      toast.success("Book added to cart successfully!", { description: product.title });
    },
    [items, update],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem: (productId) => update(items.filter((item) => item.id !== productId)),
      clear: () => update([]),
      hasItem: (productId) => items.some((item) => item.id === productId),
      total: items.reduce((sum, item) => sum + item.price, 0),
    }),
    [addItem, items, update],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const OLD_CART_KEY = "oldSiteCart";

/** Replace the previous-site cart with the current cart, then return the checkout URL. */
export function syncToOldCart(items: ShopProduct[]) {
  try {
    window.localStorage.removeItem(OLD_CART_KEY);
    window.localStorage.setItem(
      OLD_CART_KEY,
      JSON.stringify(items.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: 1 }))),
    );
  } catch {
    // Storage blocked — checkout link still carries the items.
  }
  return `https://babyfoodessentials.com/checkout/?add-to-cart=${items.map((i) => i.id).join(",")}`;
}

export const useCart = () => useContext(CartContext);