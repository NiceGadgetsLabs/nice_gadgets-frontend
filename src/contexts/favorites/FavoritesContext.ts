import { createContext } from 'react';
import type { Product } from '../../types/Products';

export type FavoritesContextType = {
  fav: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  fav: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});
