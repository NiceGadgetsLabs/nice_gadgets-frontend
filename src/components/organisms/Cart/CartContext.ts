import { createContext } from 'react';
import type { Product } from '../../../types/Products';

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  isInCart: () => false,
  clearCart: () => {},
});
