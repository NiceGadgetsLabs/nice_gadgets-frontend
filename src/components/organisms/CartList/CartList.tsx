import { useContext, type FC } from 'react';
import { CartContext } from '../../../contexts/cart/CartContext';
import { CartItem } from '../../molecules/CartItem/CartItem';
import './CartList.scss';

export const CartList: FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-list">
      {cart.map((item) => (
        <CartItem key={item.itemId} item={item} />
      ))}
    </div>
  );
};
