import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './contexts/cart/CartProvider';
import { FavoritesProvider } from './contexts/favorites/FavoritesProvider';
import { ThemeProvider } from './contexts/theme/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};
