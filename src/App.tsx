import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './contexts/cart/CartProvider';
import { FavoritesProvider } from './contexts/favorites/FavoritesProvider';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </CartProvider>
  );
};
