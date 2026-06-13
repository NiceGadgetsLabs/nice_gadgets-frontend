import type { Product } from '../../types/Products';
import { ProductCard } from '../HomePage/components/ProductCard/ProductCard';
import './FavoritesPage.scss';

type Props = {
  products: Product[];
};

export const FavoritesPage = ({ products }: Props) => {
  return (
    <div className="favourites">
      <div className="container">
        <div className="favourites__content">
          <div className="favourites__details">
            <br />
            <h1 className="favourites__title">Favourites</h1>
            <p className="favourites__amount">{products.length} items</p>
          </div>

          {products.length === 0 ? (
            <div className="not-found-page">
              <h2 className="not-found-page__title">There are no favourites yet...</h2>

              <div className="not-found-page__image"></div>
            </div>
          ) : (
            <div className="favourites__list">
              {products.map((product) => (
                <div key={product.id} className="favourites__product">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
