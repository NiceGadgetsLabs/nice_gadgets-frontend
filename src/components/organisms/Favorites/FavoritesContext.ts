import { createContext } from 'react';
import type { Product } from '../../../types/Products';

export type FavouritesContextType = {
  fav: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (id: string) => boolean;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  fav: [],
  toggleFavourite: () => {},
  isFavourite: () => false,
});
