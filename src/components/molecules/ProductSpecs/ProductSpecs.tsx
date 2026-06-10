import type { FC } from 'react';
import './ProductSpecs.scss';

interface Props {
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductSpecs: FC<Props> = ({ screen, capacity, ram }) => {
  const specs = [
    { title: 'Screen', value: screen },
    { title: capacity.includes('mm') ? 'Case size' : 'Capacity', value: capacity },
    { title: 'RAM', value: ram },
  ];

  return (
    <dl className="product-specs">
      {specs.map((spec) => (
        <div key={spec.title} className="product-specs__row">
          <dt className="product-specs__title">{spec.title}</dt>
          <dd className="product-specs__value">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
};
