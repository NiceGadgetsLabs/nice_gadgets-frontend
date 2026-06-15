import type { FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton/ProductCardSkeleton';
import type { Product } from '../../../types/Products';
import './ProductList.scss';

interface Props {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export const ProductList: FC<Props> = ({ products, isLoading = false, skeletonCount = 12 }) => {
  return (
    <div className="product-list" aria-busy={isLoading}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))
        : products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};
