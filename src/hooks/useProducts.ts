import { useState } from 'react';
import { productsApi } from '../api/products';
import type { Product } from '../types/Products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const data = await productsApi.load();

    setProducts(data);
  };

  return {
    products,
    loadProducts,
  };
};
