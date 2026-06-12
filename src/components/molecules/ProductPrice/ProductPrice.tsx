import clsx from 'clsx';
import type { FC } from 'react';
import './ProductPrice.scss';

interface Props {
  price: number;
  fullPrice?: number | null;
  large?: boolean;
}

export const ProductPrice: FC<Props> = ({ price, fullPrice = null, large = false }) => {
  return (
    <div className="product-price">
      <p className={clsx('product-price__current', { 'product-price__current--large': large })}>
        ${price}
      </p>
      {fullPrice !== null && <p className="product-price__old">${fullPrice}</p>}
    </div>
  );
};
