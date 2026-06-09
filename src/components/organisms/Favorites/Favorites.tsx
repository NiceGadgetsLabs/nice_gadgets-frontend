import React, { useEffect, useState } from 'react';
import type { Product } from '../../../types/Products';

import { FavouritesContext } from './FavoritesContext';

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'favorites';

export function FavouritesProvider({ children }: Props) {
  const [fav, setFav] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as Product[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fav));
  }, [fav]);

  const toggleFavourite = (product: Product) => {
    const id = product.itemId;

    setFav((prev) => {
      const exists = prev.some((p) => p.itemId === id);

      if (exists) {
        return prev.filter((p) => p.itemId !== id);
      }

      return [...prev, product];
    });
  };

  const isFavourite = (id: string) => {
    return fav.some((p) => p.itemId === id);
  };

  const value = {
    fav,
    toggleFavourite,
    isFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
