import { type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Carousel.scss';
import { Link } from 'react-router-dom';

export const Carousel: FC = () => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.carousel-next',
          prevEl: '.carousel-prev',
        }}
        pagination={{
          el: '.banner-slider__dots',
          clickable: true,
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="banner-slider"
      >
        <SwiperSlide>
          <Link to="/books/constitution-day" className="banner-slider__link">
            <div className="banner-slider__banner banner-slider--first">
              <div className="banner-slider__main-content"></div>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/books/constitution-day" className="banner-slider__link">
            <div className="banner-slider__banner banner-slider--second">
              <div className="banner-slider__main-content"></div>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/books/constitution-day" className="banner-slider__link">
            <div className="banner-slider__banner banner-slider--third">
              <div className="banner-slider__main-content"></div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>

      <div className="carousel-prev"></div>
      <div className="carousel-next"></div>

      <div className="banner-slider__dots" />
    </div>
  );
};
