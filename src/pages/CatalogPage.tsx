import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCatalog } from '../components/organisms/ProductCatalog/ProductCatalog';
import { NotFoundPage } from './NotFoundPage';
import { isCategory } from '../utils/isCategory';

export const CatalogPage: FC = () => {
  const { category } = useParams();
  const { products } = useProducts();

  if (!isCategory(category)) {
    return <NotFoundPage />;
  }

  const visibleProducts = products.filter((product) => product.category === category);

  return <ProductCatalog products={visibleProducts} />;
};
