import { type FC } from 'react';
import { useProducts } from '../hooks/useProducts';
import { sortProducts } from '../utils/sortProducts';
import { HomeLayout } from '../layouts/HomeLayout/HomeLayout';
import { PictureSlider } from '../components/organisms/PictureSlider/PictureSlider';
import { ProductSlider } from '../components/organisms/ProductSlider/ProductSlider';
import { Categories } from '../components/organisms/Categories/Categories';

export const HomePage: FC = () => {
  const { products, isLoading } = useProducts();

  const newestProducts = sortProducts(products, 'newest').filter(
    (product) => Number(product.year) >= 2021,
  );

  const hotPriceProducts = sortProducts(products, 'discountDesc');

  const banners = [
    { link: '/phones', image: './img/slider/phones.avif' },
    { link: '/tablets', image: './img/slider/tablets.avif' },
    { link: '/accessories', image: './img/slider/accessories.avif' },
    { link: '/phones/apple-iphone-14-pro-256gb-spaceblack', image: './img/slider/product.avif' },
  ];

  return (
    <HomeLayout title="Welcome to Nice Gadgets store!">
      <PictureSlider banners={banners} />
      <ProductSlider title="Brand new models" products={newestProducts} isLoading={isLoading} />
      <Categories products={products} />
      <ProductSlider title="Hot prices" products={hotPriceProducts} isLoading={isLoading} />
    </HomeLayout>
  );
};
