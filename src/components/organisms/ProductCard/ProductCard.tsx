import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProductPrice } from '../../molecules/ProductPrice/ProductPrice';
import { ProductSpecs } from '../../molecules/ProductSpecs/ProductSpecs';
import { ProductActions } from '../../molecules/ProductActions/ProductActions';
import { getValidSpecs } from '../../../utils/getValidSpecs';
import type { Product } from '../../../types/Products';
import './ProductCard.scss';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const specs = getValidSpecs([
    {
      title: 'Screen',
      value: product.screen,
    },

    {
      title: product.category !== 'accessories' ? 'Capacity' : 'Case size',
      value: product.capacity,
    },

    {
      title: 'RAM',
      value: product.ram,
    },
  ]);

  return (
    <article className="card">
      <Link className="card__link" to={`/${product.category}/${product.itemId}`} tabIndex={-1}>
        <img
          className="card__image"
          src={`/${product.image}`}
          decoding="async"
          alt={product.name}
        />
      </Link>

      <Link className="card__link--title" to={`/${product.category}/${product.itemId}`}>
        <h3 className="card__title">{`${product.name}`}</h3>
      </Link>

      <ProductPrice price={product.price} fullPrice={product.fullPrice} />

      <hr className="card__divider" />

      <ProductSpecs specs={specs} />

      <ProductActions product={product} />
    </article>
  );
};
