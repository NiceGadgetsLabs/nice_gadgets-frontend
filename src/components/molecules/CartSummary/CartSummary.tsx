import type { FC } from 'react';
import { Button } from '../../atoms/Button/Button';
import './CartSummary.scss';

interface Props {
  totalPrice: number;
  totalQuantity: number;
  onCheckout: () => void;
}

export const CartSummary: FC<Props> = ({ totalPrice, totalQuantity, onCheckout }) => {
  return (
    <section className="cart-summary">
      <p className="cart-summary__price">${totalPrice}</p>
      <p className="cart-summary__amount">
        Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
      </p>

      <hr className="cart-summary__divider" />

      <Button className="cart-summary__checkout" variant="primary" onClick={onCheckout}>
        Checkout
      </Button>
    </section>
  );
};
