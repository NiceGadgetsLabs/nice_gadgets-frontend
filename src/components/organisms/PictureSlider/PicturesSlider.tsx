import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import './PictureSlider.scss';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PictureSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const images = [
    { id: 1, link: './img/slider/img_1.jpg', className: 'slider__picture' },
    { id: 2, link: './img/slider/img_2.png', className: 'slider__picture' },
    { id: 3, link: './img/slider/img_3.avif', className: 'slider__picture' },
    { id: 4, link: './img/slider/img_4.jpg', className: 'slider__picture' },
    { id: 5, link: './img/slider/img_5.jpg', className: 'slider__picture' },
    { id: 6, link: './img/slider/img_6.png', className: 'slider__picture' },
  ];

  return (
    <div className="picture-slider">
      <div className="slider">
        <div className="slider__viewport">
          <button
            type="button"
            className={clsx('slider__button', 'slider__button__left')}
            onClick={() => swiperRef.current?.slidePrev()}
          />

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
            className="slider__swiper"
          >
            {images.map(({ id, link, className }) => (
              <SwiperSlide key={id} className="slide">
                <div className="slide__inner">
                  <img src={link} alt="" className={clsx('image', className)} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className={clsx('slider__button', 'slider__button__right')}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>

      <div className="pagination">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={clsx('pagination__point', {
              pagination__point__active: activeIndex === index,
            })}
            onClick={() => swiperRef.current?.slideToLoop(index)}
          />
        ))}
      </div>
    </div>
  );
};
