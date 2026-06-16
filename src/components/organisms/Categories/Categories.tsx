import { type FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Category } from '../../../types/Category';
import type { Product } from '../../../types/Products';
import categoryPhones from '../../../assets/images/category-phones.avif';
import categoryTablets from '../../../assets/images/category-tablets.avif';
import categoryAccessories from '../../../assets/images/category-accessories.avif';
import './Categories.scss';

interface CategoryCard {
  category: Category;
  title: string;
  image: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  { category: 'phones', title: 'Mobile phones', image: categoryPhones },
  { category: 'tablets', title: 'Tablets', image: categoryTablets },
  { category: 'accessories', title: 'Accessories', image: categoryAccessories },
];

interface Props {
  products: Product[];
}

export const Categories: FC<Props> = ({ products }) => {
  const countByCategory = products.reduce<Record<string, number>>((counts, product) => {
    counts[product.category] = (counts[product.category] ?? 0) + 1;

    return counts;
  }, {});

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__list">
        {CATEGORY_CARDS.map(({ category, title, image }) => (
          <div className="categories__card" key={category}>
            <Link
              to={`/${category}`}
              tabIndex={-1}
              className={clsx('categories__image-box', `categories__image-box--${category}`)}
            >
              <img decoding="async" className="categories__image" src={image} alt={title} />
            </Link>

            <Link to={`/${category}`}>
              <h3 className="categories__name">{title}</h3>
            </Link>
            <p className="categories__count">{countByCategory[category] ?? 0} models</p>
          </div>
        ))}
      </div>
    </section>
  );
};
