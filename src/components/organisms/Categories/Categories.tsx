import { type FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Category } from '../../../types/Category';
import type { Product } from '../../../types/Products';
import categoryPhones from '../../../assets/images/category-phones.webp';
import categoryTablets from '../../../assets/images/category-tablets.webp';
import categoryAccessories from '../../../assets/images/category-accessories.webp';
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
          <Link className="categories__card" to={`/${category}`} key={category}>
            <div className={clsx('categories__image-box', `categories__image-box--${category}`)}>
              <img className="categories__image" src={image} alt={title} />
            </div>

            <h3 className="categories__name">{title}</h3>
            <p className="categories__count">{countByCategory[category] ?? 0} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
