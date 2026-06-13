import { useContext } from 'react';
import { CartContext } from '../../../../contexts/cart/CartContext';
import './ItemsForCart.scss';
import clsx from 'clsx';

export const ItemsForCart = () => {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(CartContext);

  return (
    <div className="items">
      {cart.map((item) => (
        <div className="items__item" key={item.itemId}>
          <div className="item__content">
            <div className="item__leftSide">
              <button className="item__remove" onClick={() => removeFromCart(item.itemId)}></button>
              <div className="item__img">
                <img src={item.image} alt={item.itemId} className="item__img" />
              </div>
              <p className="item__name">{item.name}</p>
            </div>

            <div className="item__RightSide">
              <div className="item__count">
                <button
                  className={clsx('item__button', 'item__button__minus', {
                    item__button__minus__disabled: item.quantity === 1,
                  })}
                  onClick={() => {
                    decreaseQuantity(item.itemId);
                  }}
                ></button>
                <p className="item__amount">{item.quantity}</p>
                <button
                  className={clsx('item__button', 'item__button__plus')}
                  onClick={() => {
                    increaseQuantity(item.itemId);
                  }}
                ></button>
              </div>
              <div className="item__total">${item.price * item.quantity}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
