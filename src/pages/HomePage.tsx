import { useEffect, type FC } from 'react';
import { useProducts } from '../hooks/useProducts';
import { HomeLayout } from '../layouts/HomeLayout/HomeLayout';
import { PictureSlider } from '../components/organisms/PictureSlider/PictureSlider';
import { ProductSlider } from '../components/organisms/ProductSlider/ProductSlider';
import { Categories } from '../components/organisms/Categories/Categories';
import { ErrorState } from '../components/molecules/ErrorState/ErrorState';
import { getHotPriceProducts, getNewestProducts } from '../utils/productCollections';
import { notify } from '../utils/notify';

const BANNERS = [
  { link: '/phones', image: './img/slider/phones.avif' },
  { link: '/tablets', image: './img/slider/tablets.avif' },
  { link: '/accessories', image: './img/slider/accessories.avif' },
  { link: '/phones/apple-iphone-14-pro-256gb-spaceblack', image: './img/slider/product.avif' },
];

export const HomePage: FC = () => {
  const { products, errorMessage, isLoading } = useProducts();

  useEffect(() => {
    document.title = 'Home';
  }, []);

  useEffect(() => {
    if (errorMessage) notify.error(errorMessage);
  }, [errorMessage]);

  const newestProducts = getNewestProducts(products);

  const hotPriceProducts = getHotPriceProducts(products);

  if (errorMessage) {
    return <ErrorState />;
  }

  return (
    <HomeLayout title="Welcome to Nice Gadgets store!">
      <PictureSlider banners={BANNERS} isLoading={isLoading} />
      <ProductSlider title="Brand new models" products={newestProducts} isLoading={isLoading} />
      <Categories products={products} />
      <ProductSlider title="Hot prices" products={hotPriceProducts} isLoading={isLoading} />
    </HomeLayout>
  );
};
