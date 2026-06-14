import { useContext, useState, type FC } from 'react';
import { CartContext } from '../contexts/cart/CartContext';
import { CartLayout } from '../layouts/CartLayout/CartLayout';
import { CartList } from '../components/organisms/CartList/CartList';
import { CartSummary } from '../components/molecules/CartSummary/CartSummary';
import { ConfirmDialog } from '../components/molecules/ConfirmDialog/ConfirmDialog';
import { EmptyState } from '../components/molecules/EmptyState/EmptyState';
import { getCartTotals } from '../utils/getCartTotals';
import { scrollToTop } from '../utils/scrollToTop';
import cartEmptyImage from '../assets/images/cart-is-empty.webp';

export const CartPage: FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { totalPrice, totalQuantity } = getCartTotals(cart);

  const handleConfirm = () => {
    clearCart();
    setIsConfirmOpen(false);
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
            onCheckout={() => setIsConfirmOpen(true)}
          />
        }
      />

      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Checkout"
        description="Checkout is not implemented yet. Do you want to clear the Cart?"
        confirmLabel="Clear cart"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
      />
    </>
  );
};
