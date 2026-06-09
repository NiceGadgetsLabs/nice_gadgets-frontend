import { RouterProvider } from 'react-router/dom';
import { router } from './router';
import { CartProvider } from './components/organisms/Cart/Cart';
import { FavouritesProvider } from './components/organisms/Favorites/Favorites';

export const App = () => {
  return (
    <CartProvider>
      <FavouritesProvider>
        <RouterProvider router={router} />
      </FavouritesProvider>
    </CartProvider>
  );
};
