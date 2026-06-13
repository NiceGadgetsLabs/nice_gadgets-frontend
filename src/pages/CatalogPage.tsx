import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/organisms/ProductList/ProductList';
import { NotFoundPage } from './NotFoundPage';
import { isCategory } from '../utils/isCategory';

export const CatalogPage: FC = () => {
  const { category } = useParams();
  const { products } = useProducts();

  if (!isCategory(category)) {
    return <NotFoundPage />;
  }

  const visibleProducts = products.filter((product) => product.category === category);

  return <ProductList products={visibleProducts} />;
};
