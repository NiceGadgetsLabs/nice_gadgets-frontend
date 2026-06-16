import { useContext, useEffect, type FC } from 'react';
import { FavoritesContext } from '../contexts/favorites/FavoritesContext';
import { FavoritesLayout } from '../layouts/FavoritesLayout/FavoritesLayout';
import { ProductList } from '../components/organisms/ProductList/ProductList';
import { EmptyState } from '../components/molecules/EmptyState/EmptyState';
import favoritesEmptyImage from '../assets/images/product-not-found.avif';

export const FavoritesPage: FC = () => {
  const { fav } = useContext(FavoritesContext);

  useEffect(() => {
    document.title = 'Favorites';
  });

  return (
    <FavoritesLayout title="Favorites" count={fav.length}>
      {fav.length === 0 ? (
        <EmptyState title="There are no favorites yet..." image={favoritesEmptyImage} />
      ) : (
        <ProductList products={fav} />
      )}
    </FavoritesLayout>
  );
};
