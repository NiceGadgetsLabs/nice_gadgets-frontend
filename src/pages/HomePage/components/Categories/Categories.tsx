import './Categories.scss';
import clsx from 'clsx';
import type { Product } from '../../../../types/Products';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
};

const categoryImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain' as const,
  objectPosition: 'right bottom',
};

export const Categories = ({ products }: Props) => {
  const phonesAmount = products.filter((product) => product.category === 'phones').length;

  const tabletsAmount = products.filter((product) => product.category === 'tablets').length;

  const accessoriesAmount = products.filter((product) => product.category === 'accessories').length;

  return (
    <section className="cat">
      <div className="cat__content">
        <h2 className="cat__title">Shop by category</h2>

        <Link to="/phones" className="cat__link">
          <div className={clsx('cat__category', 'cat__category--phones')}>
            <img
              src="img/home_page/category-phones1.svg"
              alt="phones"
              className="cat__category__img"
              style={categoryImageStyle}
            />
          </div>

          <div className="cat__category__details">
            <p className="cat__category__title">Mobile phones</p>
            <p className="cat__category__amount">{phonesAmount} models</p>
          </div>
        </Link>

        <Link to="/tablets" className="cat__link">
          <div className={clsx('cat__category', 'cat__category--tablets')}>
            <img
              src="img/home_page/category-tablets_1.png"
              alt="tablets"
              className="cat__category__img"
              style={categoryImageStyle}
            />
          </div>

          <div className="cat__category__details">
            <p className="cat__category__title">Tablets</p>
            <p className="cat__category__amount">{tabletsAmount} models</p>
          </div>
        </Link>

        <Link to="/accessories" className="cat__link">
          <div className={clsx('cat__category', 'cat__category--accessories')}>
            <img
              src="img/home_page/category-accessories_1.png"
              alt="accessories"
              className="cat__category__img"
              style={categoryImageStyle}
            />
          </div>

          <div className="cat__category__details">
            <p className="cat__category__title">Accessories</p>
            <p className="cat__category__amount">{accessoriesAmount} models</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
