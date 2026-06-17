import { Modal } from '../components/organisms/Modal/Modal';
import { useContext, useEffect, useState, type FC } from 'react';
import { CartContext } from '../contexts/cart/CartContext';
import { CartLayout } from '../layouts/CartLayout/CartLayout';
import { CartList } from '../components/organisms/CartList/CartList';
import { CartSummary } from '../components/molecules/CartSummary/CartSummary';
import { EmptyState } from '../components/molecules/EmptyState/EmptyState';
import { getCartTotals } from '../utils/getCartTotals';
import { scrollToTop } from '../utils/scrollToTop';
import cartEmptyImage from '../assets/images/cart-is-empty.avif';

export const CartPage: FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { totalPrice, totalQuantity } = getCartTotals(cart);

  useEffect(() => {
    document.title = 'Cart';
  }, []);

  const handleConfirm = () => {
    clearCart();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    scrollToTop();
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
          message="Please enter recipient's details and select a delivery option"
          onClose={handleClose}
          onConfirm={handleConfirm}
          subtotal={totalPrice}
          itemsCount={totalQuantity}
        />
      )}
    </>
  );
};
