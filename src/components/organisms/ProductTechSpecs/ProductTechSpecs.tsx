import type { FC } from 'react';
import { SectionHeading } from '../../molecules/SectionHeading/SectionHeading';
import { ProductSpecs } from '../../molecules/ProductSpecs/ProductSpecs';
import type { Spec } from '../../../types/Spec';
import './ProductTechSpecs.scss';

interface Props {
  specs: Spec[];
}

export const ProductTechSpecs: FC<Props> = ({ specs }) => {
  return (
    <section className="tech-specs">
      <SectionHeading title="Tech specs" />
      <ProductSpecs specs={specs} bold={false} />
    </section>
  );
};
