import { type FC, type ReactNode } from 'react';
import { Breadcrumbs } from '../../components/molecules/Breadcrumbs/Breadcrumbs';
import './CatalogLayout.scss';

interface Props {
  title: string;
  count: number;
  controls: ReactNode;
  list: ReactNode;
  pagination: ReactNode;
}

export const CatalogLayout: FC<Props> = ({ title, count, controls, list, pagination }) => {
  return (
    <>
      <header className="catalog__header">
        <Breadcrumbs />
      </header>

      <h1 className="catalog__title">{title}</h1>
      <p className="catalog__models-count">{count} models</p>

      <div className="catalog__selects">{controls}</div>

      {list}

      <div className="catalog__pagination">{pagination}</div>
    </>
  );
};
