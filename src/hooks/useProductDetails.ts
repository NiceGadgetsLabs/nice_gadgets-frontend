import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsApi } from '../api/products';
import { isCategory } from '../utils/isCategory';
import { getProductDetailsSpecs } from '../utils/getProductDetailsSpecs';
import type { ProductDetails } from '../types/ProductDetails';
import type { Product } from '../types/Products';

export const useProductDetails = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!productId || !isCategory(category)) {
      return;
    }

    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const [details, products] = await Promise.all([
          productsApi.loadByCategory(category),
          productsApi.load(),
        ]);

        const foundDetails = details.find((item) => item.id === productId) ?? null;
        const foundProduct = products.find((item) => item.itemId === productId) ?? null;

        if (!ignore) {
          setProductDetails(foundDetails);
          setProduct(foundProduct);
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
  }, [category, productId]);

  const productSpecs = productDetails ? getProductDetailsSpecs(productDetails) : [];

  return { productDetails, productSpecs, product, isLoading, errorMessage };
};
