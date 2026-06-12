import { useState, type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Button } from '../../atoms/Button/Button';
import 'swiper/css';
import './ProductGallery.scss';

interface Props {
  images: string[];
  alt: string;
}

export const ProductGallery: FC<Props> = ({ images, alt }) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="gallery">
      <Swiper
        className="gallery__main"
        onSwiper={setMainSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={16}
        observer
        observeParents
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} className="gallery__slide">
            <img src={`/${image}`} alt={`${alt} view ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="gallery__thumbs">
        {images.map((image, index) => (
          <Button
            key={image}
            type="button"
            variant="icon"
            selected={index === activeIndex}
            className="gallery__thumb"
            onClick={() => mainSwiper?.slideTo(index)}
            aria-label={`Show ${alt} view ${index + 1}`}
          >
            <img src={`/${image}`} alt={`${alt} thumbnail ${index + 1}`} />
          </Button>
        ))}
      </div>
    </div>
  );
};
