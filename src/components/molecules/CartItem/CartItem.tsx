import { useContext, type FC } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, type CartItem as CartItemType } from '../../../contexts/cart/CartContext';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import './CartItem.scss';

interface Props {
  item: CartItemType;
}

export const CartItem: FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <article className="cart-item">
      <div className="cart-item__info">
        <Button
          className="cart-item__remove"
          variant="ghost"
          aria-label={`Remove ${item.name} from cart`}
          style={{ width: 16, height: 16 }}
          onClick={() => removeFromCart(item.itemId)}
        >
          <Icon type="close" width="16px" height="16px" />
        </Button>

        <Link className="cart-item__image-link" to={`/${item.category}/${item.itemId}`}>
          <img
            className="cart-item__image"
            decoding="async"
            src={`/${item.image}`}
            alt={item.name}
          />
        </Link>

        <Link to={`/${item.category}/${item.itemId}`}>
          <p className="cart-item__name">{item.name}</p>
        </Link>
      </div>

      <div className="cart-item__controls">
        <div className="cart-item__quantity">
          <Button
            variant="icon"
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
            style={{ width: 32, height: 32 }}
            onClick={() => decreaseQuantity(item.itemId)}
          >
            <Icon type="minus" width="16px" height="16px" />
          </Button>

          <span className="cart-item__count">{item.quantity}</span>

          <Button
            variant="icon"
            aria-label="Increase quantity"
            style={{ width: 32, height: 32 }}
            onClick={() => increaseQuantity(item.itemId)}
          >
            <Icon type="plus" width="16px" height="16px" />
          </Button>
        </div>

        <p className="cart-item__total">${item.price * item.quantity}</p>
      </div>
    </article>
  );
};
