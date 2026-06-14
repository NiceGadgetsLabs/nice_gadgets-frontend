import type { FC } from 'react';
import './ProductSpecs.scss';
import type { Spec } from '../../../types/Spec';
import clsx from 'clsx';

interface Props {
  specs: Spec[];
  bold?: boolean;
}

export const ProductSpecs: FC<Props> = ({ specs, bold = true }) => {
  return (
    <dl className="product-specs">
      {specs.map((spec) => (
        <div
          key={spec.title}
          className={clsx('product-specs__row', { 'product-specs__row--bold': bold })}
        >
          <dt className="product-specs__title">{spec.title}</dt>
          <dd className="product-specs__value">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
};
