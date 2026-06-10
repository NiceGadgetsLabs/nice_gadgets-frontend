import type { FC } from 'react';
import './ProductPrice.scss';

interface Props {
  price: number;
  fullPrice?: number | null;
}

export const ProductPrice: FC<Props> = ({ price, fullPrice = null }) => {
  return (
    <div className="product-price">
      <p className="product-price__current">${price}</p>
      {fullPrice !== null && <p className="product-price__old">${fullPrice}</p>}
    </div>
  );
};
