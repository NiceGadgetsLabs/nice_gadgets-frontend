import { useContext, type FC } from 'react';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { notify } from '../../../utils/notify';
import type { Product } from '../../../types/Products';
import './ProductActions.scss';

interface Props {
  product: Product;
  height?: number;
}

export const ProductActions: FC<Props> = ({ product, height = 40 }) => {
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const inCart = isInCart(product.itemId);
  const inFavorites = isFavorite(product.itemId);

  const handleToggleCart = () => {
    if (inCart) {
      notify.removedFromCart(product);
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
      notify.addedToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    if (inFavorites) {
      notify.removedFromFavorites(product);
    } else {
      notify.addedToFavorites(product);
    }
    toggleFavorite(product);
  };

  return (
    <div className="product-actions">
      <Button
        className="product-actions__add"
        variant="primary"
        selected={inCart}
        onClick={handleToggleCart}
        style={{ height }}
      >
        {inCart ? 'Added to cart' : 'Add to cart'}
      </Button>

      <Button
        className="product-actions__like"
        variant="icon"
        selected={inFavorites}
        onClick={handleToggleFavorite}
        style={{ height, width: height }}
        aria-label="Add to favorites"
      >
        <Icon type={inFavorites ? 'favorites-filled' : 'favorites'} width="16px" height="16px" />
      </Button>
    </div>
  );
};
