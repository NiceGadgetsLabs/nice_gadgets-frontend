import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PictureSlider.scss';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';

export const PictureSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const images = [
    { id: 1, link: './img/slider/img_1.jpg' },
    { id: 2, link: './img/slider/img_2.png' },
    { id: 3, link: './img/slider/img_3.avif' },
    { id: 4, link: './img/slider/img_4.jpg' },
    { id: 5, link: './img/slider/img_5.jpg' },
    { id: 6, link: './img/slider/img_6.png' },
  ];

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
            {images.map(({ id, link }) => (
              <SwiperSlide key={id} className="picture-slider__slide">
                <div className="picture-slider__inner">
                  <img src={link} alt="" className="picture-slider__image" />
                </div>
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
        {images.map((_, index) => (
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
