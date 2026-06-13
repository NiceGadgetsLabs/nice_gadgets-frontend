import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import './ProductCards.scss';
import type { Product } from '../../../../types/Products';
import { ProductCard } from '../ProductCard/ProductCard';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  products: Product[];
  title?: string;
  filterMode?: 'all' | 'only2022' | 'exclude2022';
};

export const ProductCards = ({ products, title, filterMode }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const filteredProducts = (() => {
    switch (filterMode) {
      case 'only2022':
        return products.filter((product) => product.year === 2022);

      case 'exclude2022':
        return products.filter((product) => product.year !== 2022);

      default:
        return products;
    }
  })();

  return (
    <section className="cards">
      <div className="cards__content">
        <div className="cards__top">
          <h2 className="cards__title">{title}</h2>
          <div className="cards__buttons">
            <button
              className={clsx('cards__button', 'cards__button__left')}
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeIndex === 0}
            ></button>
            <button
              className={clsx('cards__button', 'cards__button__right')}
              onClick={() => swiperRef.current?.slideNext()}
              disabled={activeIndex >= filteredProducts.length - slidesPerView}
            ></button>
          </div>
        </div>
        <div className="cards__swiper">
          <Swiper
            modules={[Navigation]}
            speed={600}
            slidesPerView={1}
            watchOverflow
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            slidesPerGroup={1}
            spaceBetween={16}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setSlidesPerView(swiper.params.slidesPerView as number);
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
