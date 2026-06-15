import { useEffect, useState } from 'react';
import { productsApi } from '../api/products';
import type { Product } from '../types/Products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await productsApi.load();

        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    products,
    isLoading,
    errorMessage,
  };
};
