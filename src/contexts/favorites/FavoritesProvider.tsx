import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Products';

import { FavoritesContext } from './FavoritesContext';

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'favorites';

export function FavoritesProvider({ children }: Props) {
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

  const toggleFavorite = (product: Product) => {
    const id = product.itemId;

    setFav((prev) => {
      const exists = prev.some((product) => product.itemId === id);

      if (exists) {
        return prev.filter((product) => product.itemId !== id);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (id: string) => {
    return fav.some((product) => product.itemId === id);
  };

  const value = {
    fav,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
