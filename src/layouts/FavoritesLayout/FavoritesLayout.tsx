import { type FC, type ReactNode } from 'react';
import './FavoritesLayout.scss';
import { Breadcrumbs } from '../../components/molecules/Breadcrumbs/Breadcrumbs';

interface Props {
  title: string;
  count: number;
  children: ReactNode;
}

export const FavoritesLayout: FC<Props> = ({ title, count, children }) => {
  return (
    <>
      <header className="favorites-header">
        <Breadcrumbs />
      </header>

      <div className="favorites-layout">
        <div className="favorites-layout__heading">
          <h1 className="favorites-layout__title">{title}</h1>
          <p className="favorites-layout__count">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>

        {children}
      </div>
    </>
  );
};
