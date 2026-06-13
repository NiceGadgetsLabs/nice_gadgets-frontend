import type { FC } from 'react';
import { useProductDetails } from '../hooks/useProductDetails';
import { ProductLayout } from '../layouts/ProductLayout/ProductLayout';
import { ProductGallery } from '../components/organisms/ProductGallery/ProductGallery';
import { ProductMainInfo } from '../components/organisms/ProductMainInfo/ProductMainInfo';
import { ProductAbout } from '../components/organisms/ProductAbout/ProductAbout';
import { ProductTechSpecs } from '../components/organisms/ProductTechSpecs/ProductTechSpecs';
import { NotFoundPage } from './NotFoundPage';

export const ProductPage: FC = () => {
  const { productDetails, product, productSpecs, errorMessage, isLoading } = useProductDetails();

  if (isLoading && !productDetails) {
    return <p>Loading</p>;
  }

  if (errorMessage || !productDetails || !product) {
    return <NotFoundPage />;
  }

  return (
    <ProductLayout
      title={productDetails.name}
      gallery={<ProductGallery images={productDetails.images} alt={productDetails.name} />}
      info={<ProductMainInfo productDetails={productDetails} product={product} />}
      about={<ProductAbout description={productDetails.description} />}
      specs={<ProductTechSpecs specs={productSpecs} />}
    />
  );
};
