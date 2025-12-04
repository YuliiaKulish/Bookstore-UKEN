import { useEffect, useMemo, useState } from 'react';
import type { GeneralBook } from '../../types/GeneralBook';
import './ImageGallery.scss';
import classNames from 'classnames';
import { BookStoreIcon, IconName } from '../BookStoreIcon';

type ImageGalleryProps = {
  images: string[];
  book: GeneralBook;
};

export const ImageGallery = ({ images, book }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imagesMap = useMemo(() => {
    const modules = import.meta.glob(
      '../../books/img/**/*.{jpg,jpeg,png,gif,webp}',
      { eager: true },
    ) as Record<string, { default: string }>;

    const map: Record<string, string> = {};

    Object.entries(modules).forEach(([path, module]) => {
      const relativePath = path.replace(/^.*books\//, '');

      map[relativePath] = module.default;
    });

    return map;
  }, []);

  const galleryImages = images
    .map(imgPath => imagesMap[imgPath])
    .filter(Boolean);

  const hasImages = galleryImages.length > 0;
  const safeIndex = hasImages
    ? Math.min(activeIndex, galleryImages.length - 1)
    : 0;
  const activeImg = hasImages ? galleryImages[safeIndex] : '';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showPrev = () => {
    if (!images.length) {
      return;
    }

    setActiveIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    if (!images.length) {
      return;
    }

    setActiveIndex(prev => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const { style } = document.body;
    const previousOverflow = style.overflow;

    style.overflow = 'hidden';

    return () => {
      style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  return (
    <div className="book__images">
      {hasImages && (
        <img
          src={activeImg}
          alt={book.name}
          className="book__main-img"
          onClick={handleOpenModal}
        />
      )}
      <div className="book__img-thumb">
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="preview"
            className={classNames('book__secondary-img', {
              active: index === safeIndex,
            })}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      {isModalOpen && hasImages && (
        <div className="gallery-modal">
          <div className="gallery-modal__overlay" onClick={handleCloseModal} />
          <div
            className="gallery-modal__content"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="gallery-modal__close"
              type="button"
              aria-label="Close image preview"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <button
              className="gallery-modal__nav gallery-modal__nav--prev"
              type="button"
              aria-label="Previous image"
              onClick={showPrev}
            >
              <BookStoreIcon iconName={IconName.ArrowLeft} />
            </button>
            <img src={activeImg} alt={book.name} />
            <button
              className="gallery-modal__nav gallery-modal__nav--next"
              type="button"
              aria-label="Next image"
              onClick={showNext}
            >
              <BookStoreIcon iconName={IconName.ArrowRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
