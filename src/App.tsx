import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'sonner';
import { CartProvider } from './contexts/cart/CartProvider';
import { FavoritesProvider } from './contexts/favorites/FavoritesProvider';
import { ThemeProvider } from './contexts/theme/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" toastOptions={{ unstyled: true }} />
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};
