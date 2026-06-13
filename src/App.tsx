import { Navigate, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import type { Product } from './types/Products';
import { useContext, useEffect, useState } from 'react';

import { getProductAll } from './services/api';

import { FavoritesContext } from './contexts/favorites/FavoritesContext';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { fav } = useContext(FavoritesContext);

  useEffect(() => {
    getProductAll()
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => {
        alert('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage products={products} loading={loading} />} />
        <Route path="favorites" element={<FavoritesPage products={fav} />} />
        <Route path="favourites" element={<Navigate to="/favorites" replace />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<HomePage products={products} loading={loading} />} />
      </Route>
    </Routes>
  );
};
