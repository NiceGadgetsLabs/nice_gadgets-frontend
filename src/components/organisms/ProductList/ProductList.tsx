import type { FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../../types/Products';
import './ProductList.scss';

interface Props {
  products: Product[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
