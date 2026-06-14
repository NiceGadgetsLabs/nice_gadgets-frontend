import type { CartItem } from '../contexts/cart/CartContext';

export interface CartTotals {
  totalPrice: number;
  totalQuantity: number;
}

export function getCartTotals(cart: CartItem[]): CartTotals {
  return cart.reduce<CartTotals>(
    (totals, item) => ({
      totalPrice: totals.totalPrice + item.price * item.quantity,
      totalQuantity: totals.totalQuantity + item.quantity,
    }),
    { totalPrice: 0, totalQuantity: 0 },
  );
}
