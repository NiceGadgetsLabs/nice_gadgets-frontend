import { type FC, type ReactNode } from 'react';
import { BackButton } from '../../components/molecules/BackButton/BackButton';
import './ProductLayout.scss';

interface Props {
  title: string;
  gallery: ReactNode;
  info: ReactNode;
  about: ReactNode;
  specs: ReactNode;
  recommended: ReactNode;
}

export const ProductLayout: FC<Props> = ({ title, gallery, info, about, specs, recommended }) => {
  return (
    <div className="product-layout">
      <header className="product-layout__header">
        <BackButton />
      </header>

      <h1 className="product-layout__title">{title}</h1>

      <section className="product-layout__top">
        <div className="product-layout__media">{gallery}</div>
        <div className="product-layout__info">{info}</div>
      </section>

      <section className="product-layout__content">
        <div className="product-layout__about">{about}</div>
        <div className="product-layout__specs">{specs}</div>
      </section>

      <div className="product-layout__recommended">{recommended}</div>
    </div>
  );
};
