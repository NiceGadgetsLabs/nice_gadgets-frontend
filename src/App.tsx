import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/theme/ThemeProvider';
import { CartProvider } from './contexts/cart/CartProvider';
import { FavoritesProvider } from './contexts/favorites/FavoritesProvider';
import { FeedbackProvider } from './contexts/feedback/FeedbackProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <FeedbackProvider>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" toastOptions={{ unstyled: true }} />
          </FeedbackProvider>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};
