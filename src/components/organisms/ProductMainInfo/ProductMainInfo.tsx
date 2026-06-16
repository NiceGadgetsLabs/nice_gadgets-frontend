import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CapacityPicker } from '../../molecules/CapacityPicker/CapacityPicker';
import { ColorPicker } from '../../molecules/ColorPicker/ColorPicker';
import { ProductActions } from '../../molecules/ProductActions/ProductActions';
import { ProductPrice } from '../../molecules/ProductPrice/ProductPrice';
import { ProductSpecs } from '../../molecules/ProductSpecs/ProductSpecs';
import { getProductId } from '../../../utils/getProductId';
import type { ProductDetails } from '../../../types/ProductDetails';
import type { Product } from '../../../types/Products';
import './ProductMainInfo.scss';

interface Props {
  productDetails: ProductDetails;
  product: Product;
}

export const ProductMainInfo: FC<Props> = ({ productDetails, product }) => {
  const {
    category,
    namespaceId,
    capacity,
    color,
    colorsAvailable,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
  } = productDetails;

  const navigate = useNavigate();

  const handleSelectColor = (selectedColor: string) => {
    navigate(`/${category}/${getProductId(namespaceId, capacity, selectedColor)}`);
  };

  const handleSelectCapacity = (selectedCapacity: string) => {
    navigate(`/${category}/${getProductId(namespaceId, selectedCapacity, color)}`);
  };

  const shortSpecs = [
    { title: 'Screen', value: screen },
    { title: 'Resolution', value: resolution },
    { title: 'Processor', value: processor },
    { title: 'RAM', value: ram },
  ];

  return (
    <section className="product-main-info">
      <span className="product-main-info__product-id">Id: {product.id}</span>
      <div className="product-main-info__options">
        <ColorPicker colors={colorsAvailable} selected={color} onSelect={handleSelectColor} />
        <hr className="product-main-info__divider" />
        <CapacityPicker
          capacities={capacityAvailable}
          selected={capacity}
          onSelect={handleSelectCapacity}
        />
        <hr className="product-main-info__divider" />
      </div>

      <div className="product-main-info__actions">
        <ProductPrice
          price={priceDiscount}
          fullPrice={priceRegular !== priceDiscount ? priceRegular : null}
          large
        />
        <ProductActions product={product} height={48} />
      </div>

      <ProductSpecs specs={shortSpecs} />
    </section>
  );
};
