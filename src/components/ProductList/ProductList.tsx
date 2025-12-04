import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import './ProductList.scss';

import { BookStoreIcon, IconName } from '../BookStoreIcon';
import { ProductCard } from '../ProductCard';
import type { GeneralBook } from '../../types/GeneralBook';

type ProductListProps = {
  id: string;
  title: string;
  books: GeneralBook[];
};

export const ProductList = ({ id, title, books }: ProductListProps) => {
  return (
    <section className={`section product-list product-list--${id}`}>
      <div className="container">
        <div className="product-list__header">
          <h2 className="product-list__title">{title}</h2>
          <div className="custom-buttons">
            <button className={`custom-prev custom-prev--${id}`}>
              <BookStoreIcon iconName={IconName.ArrowLeft} />
            </button>
            <button className={`custom-next custom-next--${id}`}>
              <BookStoreIcon iconName={IconName.ArrowRight} />
            </button>
          </div>
        </div>
        <div className="product-swiper-wrapper">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: `.custom-next--${id}`,
              prevEl: `.custom-prev--${id}`,
            }}
            spaceBetween={16}
            slidesPerView={1.2}
            slidesPerGroup={1}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            }}
            className="product-swiper"
          >
            {books.map(book => (
              <SwiperSlide key={book.id} className="swiper-item">
                <ProductCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
