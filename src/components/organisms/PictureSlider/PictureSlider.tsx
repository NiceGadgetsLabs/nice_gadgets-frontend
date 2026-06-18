import { useRef, useState, type FC } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PictureSlider.scss';
import { Link } from 'react-router-dom';

type Banner = {
  link: string;
  image: string;
  alt: string;
};

interface Props {
  banners: Banner[];
  isLoading?: boolean;
}

const PictureSliderSkeleton: FC = () => (
  <div className="picture-slider" aria-hidden="true">
    <div className="picture-slider__slider">
      <Button
        type="button"
        variant="icon"
        className="picture-slider__button"
        aria-label="Previous slide"
        disabled
      >
        <Icon type="arrow-left" width="16px" height="16px" />
      </Button>

      <div className="picture-slider__viewport">
        <Skeleton className="picture-slider__viewport-skeleton" />
      </div>

      <Button
        type="button"
        variant="icon"
        className="picture-slider__button"
        aria-label="Next slide"
        disabled
      >
        <Icon type="arrow-right" width="16px" height="16px" />
      </Button>
    </div>

    <div className="picture-slider__pagination">
      {Array.from({ length: 4 }).map((_, index) => (
        <span key={index} className="picture-slider__dot picture-slider__dot--skeleton">
          <Skeleton width={14} height={4} />
        </span>
      ))}
    </div>
  </div>
);

export const PictureSlider: FC<Props> = ({ banners, isLoading = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  if (isLoading) {
    return <PictureSliderSkeleton />;
  }

  return (
    <div className="picture-slider">
      <div className="picture-slider__slider">
        <Button
          type="button"
          variant="icon"
          className="picture-slider__button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Icon type="arrow-left" width="16px" height="16px" />
        </Button>

        <div className="picture-slider__viewport">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop
            speed={1000}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="picture-slider__swiper"
          >
            {banners.map(({ link, image, alt }) => (
              <SwiperSlide key={link} className="picture-slider__slide">
                <Link to={link} className="picture-slider__inner">
                  <img decoding="async" src={image} alt={alt} className="picture-slider__image" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Button
          type="button"
          variant="icon"
          className="picture-slider__button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Icon type="arrow-right" width="16px" height="16px" />
        </Button>
      </div>

      <div className="picture-slider__pagination">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={clsx('picture-slider__dot', {
              'picture-slider__dot--active': activeIndex === index,
            })}
            onClick={() => swiperRef.current?.slideToLoop(index)}
          />
        ))}
      </div>
    </div>
  );
};
