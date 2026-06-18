import { useEffect, type FC } from 'react';
import { useProductDetails } from '../hooks/useProductDetails';
import { useProducts } from '../hooks/useProducts';
import { ProductLayout } from '../layouts/ProductLayout/ProductLayout';
import { ProductGallery } from '../components/organisms/ProductGallery/ProductGallery';
import { ProductMainInfo } from '../components/organisms/ProductMainInfo/ProductMainInfo';
import { ProductAbout } from '../components/organisms/ProductAbout/ProductAbout';
import { ProductTechSpecs } from '../components/organisms/ProductTechSpecs/ProductTechSpecs';
import { ProductSlider } from '../components/organisms/ProductSlider/ProductSlider';
import { ProductDetailsSkeleton } from '../components/organisms/ProductDetailsSkeleton/ProductDetailsSkeleton';
import { Breadcrumbs } from '../components/molecules/Breadcrumbs/Breadcrumbs';
import { notify } from '../utils/notify';
import { NotFoundPage } from './NotFoundPage';

export const ProductPage: FC = () => {
  const { productDetails, product, productSpecs, errorMessage, isLoading } = useProductDetails();
  const { products, isLoading: isProductsLoading } = useProducts();

  useEffect(() => {
    if (!product) return;
    document.title = product.name;
  }, [product]);

  useEffect(() => {
    if (errorMessage) notify.error(errorMessage);
  }, [errorMessage]);

  //TODO: Add a recommendation algorithm
  const recommendedProducts = products.filter(
    (recommendation) => recommendation.category !== product?.category,
  );

  if (isLoading && !productDetails) {
    return <ProductDetailsSkeleton />;
  }

  if (errorMessage || !productDetails || !product) {
    return <NotFoundPage variant="product" />;
  }

  return (
    <ProductLayout
      breadcrumbs={<Breadcrumbs item={product.name} />}
      title={productDetails.name}
      gallery={<ProductGallery images={productDetails.images} alt={productDetails.name} />}
      info={<ProductMainInfo productDetails={productDetails} product={product} />}
      about={<ProductAbout description={productDetails.description} />}
      specs={<ProductTechSpecs specs={productSpecs} />}
      recommended={
        <ProductSlider
          title="You may also like"
          products={recommendedProducts}
          isLoading={isProductsLoading}
        />
      }
    />
  );
};
