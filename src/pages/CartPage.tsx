import { useContext } from 'react';
import { CartContext } from '../contexts/cart/CartContext';
import { Button } from '../components/atoms/Button/Button';

export const CartPage = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.itemId}>
                {item.name} - {item.quantity} шт.
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${total}</h2>

            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
