import { toast } from 'sonner';
import { Toast } from '../components/molecules/Toast/Toast';
import type { Product } from '../types/Products';

const DURATION = 2500;

export const notify = {
  addedToCart(product: Product) {
    toast.custom(
      (id) => <Toast id={id} variant="success" title="Added to cart" description={product.name} />,
      { duration: DURATION },
    );
  },

  removedFromCart(product: Product) {
    toast.custom(
      (id) => <Toast id={id} variant="info" title="Removed from cart" description={product.name} />,
      { duration: DURATION },
    );
  },

  addedToFavorites(product: Product) {
    toast.custom(
      (id) => (
        <Toast id={id} variant="success" title="Added to favorites" description={product.name} />
      ),
      { duration: DURATION },
    );
  },

  removedFromFavorites(product: Product) {
    toast.custom(
      (id) => (
        <Toast id={id} variant="info" title="Removed from favorites" description={product.name} />
      ),
      { duration: DURATION },
    );
  },

  error(message: string) {
    toast.custom(
      (id) => <Toast id={id} variant="error" title="Something went wrong" description={message} />,
      { duration: DURATION },
    );
  },

  orderPlaced(onLeaveFeedback: () => void) {
    toast.custom(
      (id) => (
        <Toast
          id={id}
          variant="info"
          title="How was your experience?"
          description="Your order is on its way — tell us how we did."
          action={{ label: 'Leave feedback', onClick: onLeaveFeedback }}
        />
      ),
      { duration: DURATION * 2 },
    );
  },

  feedbackSubmitted(rating: number) {
    if (rating >= 4) {
      toast.custom(
        (id) => (
          <Toast
            id={id}
            variant="success"
            title="Thank you! 🎉"
            description="We're glad you enjoyed shopping with Nice Gadgets."
          />
        ),
        { duration: DURATION },
      );

      return;
    }

    toast.custom(
      (id) => (
        <Toast
          id={id}
          variant="info"
          title="Thanks for your feedback"
          description="We're sorry it wasn't perfect — we'll use your notes to do better."
        />
      ),
      { duration: DURATION },
    );
  },
};
