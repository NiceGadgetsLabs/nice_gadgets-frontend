import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Products';

import { CartContext, type CartItem } from './CartContext';

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'cart';

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const id = product.itemId;

    setCart((prev) => {
      const exists = prev.find((cartItem) => cartItem.itemId === id);

      if (exists) {
        return prev;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.itemId !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.itemId === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.itemId === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const isInCart = (id: string) => {
    return cart.some((cartItem) => cartItem.itemId === id);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
