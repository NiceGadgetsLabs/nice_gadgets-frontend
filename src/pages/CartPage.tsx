import { useState, useContext, useMemo } from 'react';
import { CartContext } from '../contexts/cart/CartContext';
import { Modal } from '../components/organisms/Modal/Modal';
import { Button } from '../components/atoms/Button/Button';

export const CartPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { subtotal, itemsCount } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, itemsCount };
  }, [cart]);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

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
                {item.name} - {item.quantity} шт. - ${item.price * item.quantity}
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${subtotal}</h2>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        message="Please enter recipient's details and select a delivery option"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        subtotal={subtotal}
        itemsCount={itemsCount}
      />
    </div>
  );
};
