import type { FC } from 'react';
import './ProductSpecs.scss';

interface Props {
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductSpecs: FC<Props> = ({ screen, capacity, ram }) => {
  return (
    <dl className="product-specs">
      <div className="product-specs__row">
        <dt className="product-specs__title">Screen</dt>
        <dd className="product-specs__value">{screen}</dd>
      </div>

      <div className="product-specs__row">
        <dt className="product-specs__title">Capacity</dt>
        <dd className="product-specs__value">{capacity}</dd>
      </div>

      <div className="product-specs__row">
        <dt className="product-specs__title">RAM</dt>
        <dd className="product-specs__value">{ram}</dd>
      </div>
    </dl>
  );
};
