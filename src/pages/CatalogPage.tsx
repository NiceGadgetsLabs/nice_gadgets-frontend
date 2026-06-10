import { useEffect, type FC } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/organisms/ProductList/ProductList';
import type { Category } from '../types/Category';

interface Props {
  category: Category;
}

export const CatalogPage: FC<Props> = ({ category }) => {
  const { products, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  });

  const visibleProducts = products.filter((product) => product.category === category);

  return <ProductList products={visibleProducts} />;
};
