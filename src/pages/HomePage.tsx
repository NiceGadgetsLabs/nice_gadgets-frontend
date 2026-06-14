import { type FC } from 'react';
import { useProducts } from '../hooks/useProducts';
import { sortProducts } from '../utils/sortProducts';
import { HomeLayout } from '../layouts/HomeLayout/HomeLayout';
import { PictureSlider } from '../components/organisms/PictureSlider/PictureSlider';
import { ProductSlider } from '../components/organisms/ProductSlider/ProductSlider';
import { Categories } from '../components/organisms/Categories/Categories';

export const HomePage: FC = () => {
  const { products } = useProducts();

  const newestProducts = sortProducts(products, 'newest').filter(
    (product) => Number(product.year) >= 2021,
  );

  const hotPriceProducts = sortProducts(products, 'discountDesc');

  return (
    <HomeLayout title="Welcome to Nice Gadgets store!">
      <PictureSlider />
      <ProductSlider title="Brand new models" products={newestProducts} />
      <Categories products={products} />
      <ProductSlider title="Hot prices" products={hotPriceProducts} />
    </HomeLayout>
  );
};
