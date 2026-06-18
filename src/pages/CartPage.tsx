import { Modal } from '../components/organisms/Modal/Modal';
import { useContext, useEffect, useRef, useState, type FC } from 'react';
import { CartContext } from '../contexts/cart/CartContext';
import { FeedbackContext } from '../contexts/feedback/FeedbackContext';
import { CartLayout } from '../layouts/CartLayout/CartLayout';
import { CartList } from '../components/organisms/CartList/CartList';
import { CartSummary } from '../components/molecules/CartSummary/CartSummary';
import { EmptyState } from '../components/molecules/EmptyState/EmptyState';
import { getCartTotals } from '../utils/getCartTotals';
import { scrollToTop } from '../utils/scrollToTop';
import { notify } from '../utils/notify';
import cartEmptyImage from '../assets/images/cart-is-empty.avif';

export const CartPage: FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { openFeedback } = useContext(FeedbackContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orderPlacedRef = useRef(false);

  const { totalPrice, totalQuantity } = getCartTotals(cart);

  useEffect(() => {
    document.title = 'Cart';
  }, []);

  const handleConfirm = () => {
    clearCart();
    orderPlacedRef.current = true;
  };

  const handleClose = () => {
    setIsModalOpen(false);
    scrollToTop();

    if (orderPlacedRef.current) {
      orderPlacedRef.current = false;
      notify.orderPlaced(openFeedback);
    }
  };

  return (
    <>
      <CartLayout
        title="Cart"
        empty={
          cart.length === 0 ? (
            <EmptyState title="Your cart is empty..." image={cartEmptyImage} />
          ) : undefined
        }
        list={<CartList />}
        summary={
          <CartSummary
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            onCheckout={() => setIsModalOpen(true)}
          />
        }
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          message=" "
          onClose={handleClose}
          onConfirm={handleConfirm}
          subtotal={totalPrice}
          itemsCount={totalQuantity}
        />
      )}
    </>
  );
};
