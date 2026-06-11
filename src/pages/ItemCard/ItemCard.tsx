import { useEffect, useState, type FC } from 'react';
import './ItemCard.scss';
import { useParams } from 'react-router-dom';
import type { Product } from '../../types/Products';
import { client } from '../../utils/fetchClient';
import { ProductPrice } from '../../components/molecules/ProductPrice/ProductPrice';
import { ProductActions } from '../../components/molecules/ProductActions/ProductActions';
import { ProductSpecs } from '../../components/molecules/ProductSpecs/ProductSpecs';
import { Gallery } from './Gallery/Gallery';

export const ItemCard: FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productId) {
      client
        .get<Product>(`/products/${productId}`)
        .then(setProduct)
        .catch(() => setError(true));
    }
  }, [productId]);

  if (error) return <h1>Product was not found</h1>;
  if (!product) return <h1>Loading...</h1>; //або прикрутити Лоадер Андрія

  return (
    <div className="item-card">
      <div className="item-card__breadcrumbs">{product.name}</div>

      <h1 className="item-card__title">{product.name}</h1>

      <div className="item-card__content">
        <section className="item-card__gallery">
          {/* Де мені брати масив images, якщо його немає в типі Product*/}
          <Gallery images={product.images || [product.image]} />
        </section>

        <section className="item-card__purchase">
          <ProductPrice price={product.price} fullPrice={product.fullPrice} />
          <ProductActions product={product} />

          <div className="item-card__specs-short">
            <ProductSpecs screen={product.screen} capacity={product.capacity} ram={product.ram} />
          </div>
        </section>
      </div>

      <section className="item-card__about">
        <h2>About</h2>
        <p>{/* заповнити дані */}</p>
      </section>

      <section className="item-card__tech-specs">
        <h2>Tech specs</h2>
        {/* зробити таблицю характеристик */}
      </section>
    </div>
  );
};
