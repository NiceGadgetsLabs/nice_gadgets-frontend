import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cart/CartContext';
import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { ItemsForCart } from './components/ItemForCart/ItemsForCart';

export const CartPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__content">
          <div className="cart__top">
            <button onClick={() => navigate(-1)} className="cart__back">
              back
            </button>
            <h1 className="cart__title">Cart</h1>
          </div>
          {cart.length === 0 ? (
            <div className="not-found-page">
              <h2 className="not-found-page__title">Your cart is empty...</h2>

              <div className="not-found-page__image"></div>
            </div>
          ) : (
            <div className="cart__main">
              <ItemsForCart />
              <div className="cart__checkout">
                <div className="checkout__content">
                  <h2 className="checkout__price">
                    ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                  </h2>

                  <p className="checkout__amount">
                    {`Total for ${cart.reduce((sum, item) => sum + item.quantity, 0)} items`}
                  </p>

                  <div className="checkout__line"></div>

                  <button className="checkout__button" onClick={() => setIsModalOpen(true)}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div className="modal">
            <div
              className="modal__overlay"
              role="button"
              tabIndex={0}
              onClick={handleCancel}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCancel();
                }
              }}
            />

            <div className="modal__content">
              <p className="modal__text">
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>

              <div className="modal__actions">
                <button className="modal__action" onClick={handleConfirm}>
                  Confirm
                </button>

                <button className="modal__action" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
