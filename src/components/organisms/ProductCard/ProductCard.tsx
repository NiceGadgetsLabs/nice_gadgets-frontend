import type { FC } from 'react';
import { ProductPrice } from '../../molecules/ProductPrice/ProductPrice';
import { ProductSpecs } from '../../molecules/ProductSpecs/ProductSpecs';
import { ProductActions } from '../../molecules/ProductActions/ProductActions';
import type { Product } from '../../../types/Products';
import './ProductCard.scss';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <article className="card">
      <img className="card__image" src={`/${product.image}`} alt={product.name} />

      <h3 className="card__title">{`${product.name}`}</h3>

      <ProductPrice price={product.price} fullPrice={product.fullPrice} />

      <hr className="card__divider" />

      <ProductSpecs screen={product.screen} capacity={product.capacity} ram={product.ram} />

      <ProductActions product={product} />
    </article>
  );
};
