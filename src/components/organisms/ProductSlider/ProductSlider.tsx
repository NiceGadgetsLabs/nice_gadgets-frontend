import { useRef, useState, type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton/ProductCardSkeleton';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import type { Product } from '../../../types/Products';
import './ProductSlider.scss';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  title: string;
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export const ProductSlider: FC<Props> = ({
  title,
  products,
  isLoading = false,
  skeletonCount = 8,
}) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncNav = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title">{title}</h2>

        <div className="product-slider__controls">
          <Button
            variant="icon"
            aria-label="Previous products"
            disabled={isBeginning || isLoading}
            style={{ width: 32, height: 32 }}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Icon type="arrow-left" width="16px" height="16px" />
          </Button>

          <Button
            variant="icon"
            aria-label="Next products"
            disabled={isEnd || isLoading}
            style={{ width: 32, height: 32 }}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Icon type="arrow-right" width="16px" height="16px" />
          </Button>
        </div>
      </div>

      <Swiper
        className="product-slider__swiper"
        modules={[Navigation]}
        speed={600}
        spaceBetween={16}
        slidesPerView={4 / 3}
        slidesPerGroup={1}
        watchOverflow
        breakpoints={{
          640: { slidesPerView: 12 / 5 },
          1200: { slidesPerView: 24 / 6 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          syncNav(swiper);
        }}
        onSlideChange={syncNav}
        onResize={syncNav}
        onBreakpoint={syncNav}
      >
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};
