import { useRef, useState, type FC } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PictureSlider.scss';
import { Link } from 'react-router-dom';

type Banner = {
  link: string;
  image: string;
};

interface Props {
  banners: Banner[];
}

export const PictureSlider: FC<Props> = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

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
            {banners.map(({ link, image }) => (
              <SwiperSlide key={link} className="picture-slider__slide">
                <Link to={link} className="picture-slider__inner">
                  <img decoding="async" src={image} alt="" className="picture-slider__image" />
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
