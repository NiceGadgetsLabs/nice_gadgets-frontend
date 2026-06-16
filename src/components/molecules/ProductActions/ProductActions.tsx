import { useContext, type FC } from 'react';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import type { Product } from '../../../types/Products';
import './ProductActions.scss';

interface Props {
  product: Product;
  height?: number;
}

export const ProductActions: FC<Props> = ({ product, height = 40 }) => {
  const { addToCart, isInCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const inCart = isInCart(product.itemId);
  const inFavorites = isFavorite(product.itemId);

  return (
    <div className="product-actions">
      <Button
        className="product-actions__add"
        variant="primary"
        selected={inCart}
        onClick={() => addToCart(product)}
        style={{ height }}
      >
        {inCart ? 'Added to cart' : 'Add to cart'}
      </Button>

      <Button
        className="product-actions__like"
        variant="icon"
        selected={inFavorites}
        onClick={() => toggleFavorite(product)}
        style={{ height, width: height }}
        aria-label="Add to favorites"
      >
        <Icon type={inFavorites ? 'favorites-filled' : 'favorites'} width="16px" height="16px" />
      </Button>
    </div>
  );
};
