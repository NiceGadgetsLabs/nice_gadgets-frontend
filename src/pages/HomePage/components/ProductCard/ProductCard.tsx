import { useContext } from 'react';
import clsx from 'clsx';
import './ProductCard.scss';
import type { Product } from '../../../../types/Products';
import { FavoritesContext } from '../../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../../contexts/cart/CartContext';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  const isActive = isFavorite(product.itemId);
  const isInCartAlready = isInCart(product.itemId);

  return (
    <article className="card">
      <div className="card__wrapper">
        <div className="card__img">
          <img src={product.image} alt={product.itemId} className="card__img" />
        </div>
        <p className="card__name"> {product.name} </p>
        <div className="card__prices">
          {product.year !== 2022 ? (
            <>
              <span className="card__price">{`$${product.price}`}</span>
              <span className={clsx('card__price', 'card__price--full')}>
                {`$${product.fullPrice}`}
              </span>
            </>
          ) : (
            <div className="card__price">{`$${product.fullPrice}`}</div>
          )}
        </div>
        <div className="card__line"></div>
        <section className="card__details">
          <article className="details">
            <span className="details__title">Screen</span>
            <span className="details__value">{product.screen}</span>
          </article>
          <article className="details">
            <span className="details__title">Capacity</span>
            <span className="details__value">{product.capacity}</span>
          </article>
          <article className="details">
            <span className="details__title">RAM</span>
            <span className="details__value">{product.ram}</span>
          </article>
        </section>
        <div className="card__buttons">
          {isInCartAlready ? (
            <button
              type="button"
              className="card__buttonAddedToCart"
              onClick={() => {
                removeFromCart(product.itemId);
              }}
            >
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className="card__buttonAddToCart"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          )}
          <button
            type="button"
            className={clsx('card__buttonAddToFav', {
              card__buttonAddToFav__active: isActive,
            })}
            onClick={() => toggleFavorite(product)}
          ></button>
        </div>
      </div>
    </article>
  );
};
