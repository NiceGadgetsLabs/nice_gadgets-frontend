import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './components/organisms/Cart/Cart';
import { FavoritesProvider } from './components/organisms/Favorites/Favorites';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </CartProvider>
  );
};
