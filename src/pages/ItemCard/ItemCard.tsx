import { AddToCartButton, FavoriteButton } from '../../components/Buttons';
import { useStore } from '../../hooks/useStore';
import './ItemCard.scss';
import { useParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList';
import { useFetchAllBooks } from '../../hooks/useFetchAllBooks';
import { Loader } from '../../components/Loader';
import { ImageGallery } from '../../components/ImageGallery';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

import { useLanguage } from '../../context/LanguageContext';
import { useTranslate } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ItemCard = () => {
  const { data, loading, error } = useFetchAllBooks();
  const { cart, favourites, addToCart, addToFavourites, removeFromFavourites } =
    useStore();
  const { slug } = useParams();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();

  const book = data.find(b => b.slug === slug);
  const t = useTranslate();
  const { formatPrice } = useLanguage();

  useEffect(() => {
    if (book && book.lang && lang !== book.lang) {
      setLang(book.lang as 'en' | 'uk');
    }
  }, [book, lang, setLang]);

  if (!book) {
    return <p>Book not found</p>;
  }

  const changeBookLang = (newLang: 'en' | 'uk') => {
    if (!book) {
      return;
    }

    setLang(newLang);

    if (book.lang === newLang) {
      return;
    }

    const sameBookOtherLang = data.find(
      b => b.namespaceId === book.namespaceId && b.lang === newLang,
    );

    if (sameBookOtherLang) {
      navigate(
        `/${sameBookOtherLang.type}/${sameBookOtherLang.category}/${sameBookOtherLang.slug}`,
        { replace: true },
      );
    }
  };

  const images = Array.isArray(book.images) ? book.images : [book.images];

  const normalizeCategory = book.category
    .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
    .join(' / ');

  const inCart = cart.some(item => item.book.id === book.id);
  const inFav = favourites.some(item => item.id === book.id);

  const recommended = data.filter(
    item =>
      item.id !== book.id &&
      item.category.some(cat => book.category.includes(cat)),
  );

  const formatLocalized = (format?: string) => {
    if (!format) {
      return '';
    }

    return format.replace(/\bmm\b/, 'мм');
  };

  const getIllustrationsText = (hasIllustrations: boolean | undefined) => {
    return hasIllustrations ? t('illustrations') : t('noIllustrations');
  };

  const characteristics = [
    { label: t('author'), value: book.author },
    { label: t('coverType'), value: book.coverType },
    { label: t('numberOfPages'), value: book.numberOfPages },
    { label: t('yearOfPublication'), value: book.publicationYear },
    { label: t('format'), value: formatLocalized(book.format) },
    { label: t('language'), value: book.lang },
    {
      label: t('illustrations'),
      value: getIllustrationsText(book.illustrations ?? false),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading book.</p>;
  }

  return (
    <>
      <div className="book">
        <div className="container book__container">
          <Breadcrumbs book={book} />

          <h1 className="book__title">{book.name}</h1>
          <p className="book__author">{book.author}</p>
          <div className="book__card">
            <ImageGallery images={images} book={book} />

            <div className="book__price-block">
              <div className="book__category">
                <div className="book__label">{t('category')}</div>

                <span className="book__category-value">
                  {normalizeCategory}
                </span>
              </div>

              <div className="book__language">
                <div className="book__label">{t('selectLanguage')}</div>
                <div className="book__lang-buttons">
                  <button
                    className={`book__lang-btn ${lang === 'uk' ? 'active' : ''}`}
                    onClick={() => changeBookLang('uk')}
                  >
                    UA
                  </button>

                  <button
                    className={`book__lang-btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => changeBookLang('en')}
                  >
                    ENG
                  </button>
                </div>
              </div>
              <div className="book__prices">
                <span className="book__price">
                  {formatPrice(book.priceDiscount || book.priceRegular)}
                </span>
                {book.priceDiscount && (
                  <span className="book__old-price">
                    {formatPrice(book.priceRegular)}
                  </span>
                )}
              </div>

              <div className="book__cart-buttons">
                <AddToCartButton
                  selected={inCart}
                  onSelect={() => addToCart(book)}
                />
                <FavoriteButton
                  selected={inFav}
                  onSelect={() =>
                    inFav
                      ? removeFromFavourites(book.id)
                      : addToFavourites(book)
                  }
                />
              </div>
              <ul className="book__descr-list book__descr-list--top">
                <li className="book__descr-item">
                  <span className="book__descr--left">{t('author')}</span>
                  <span className="book__descr--right">{book.author}</span>
                </li>
                {book.coverType !== null && (
                  <li className="book__descr-item">
                    <span className="book__descr--left">{t('coverType')}</span>
                    <span className="book__descr--right">{book.coverType}</span>
                  </li>
                )}

                {'numberOfPages' in book && book.numberOfPages !== null && (
                  <li className="book__descr-item">
                    <span className="book__descr--left">
                      {t('numberOfPages')}
                    </span>
                    <span className="book__descr--right">
                      {book.numberOfPages}
                    </span>
                  </li>
                )}

                <li className="book__descr-item">
                  <span className="book__descr--left">
                    {t('yearOfPublication')}
                  </span>
                  <span className="book__descr--right">
                    {book.publicationYear}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="book__description">
            <div className="book__about">
              <h2 className="book__description-title">{t('about')}</h2>
              {book.description.map((sentence, index) => (
                <p key={index} className="book__about-descr">
                  {sentence}
                </p>
              ))}
            </div>
            <div className="book__characteristics">
              <h2 className="book__description-title">
                {t('characteristics')}
              </h2>
              <ul className="book__descr-list">
                {characteristics
                  .filter(
                    item =>
                      item.value !== undefined &&
                      item.value !== null &&
                      item.value !== '',
                  )
                  .map((item, index) => (
                    <li key={index} className="book__descr-item">
                      <span className="book__descr--left">{item.label}</span>
                      <span className="book__descr--right">{item.value}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <ProductList
          id="card"
          title={t('youMayAlsoLike')}
          books={recommended}
        />
      </div>
    </>
  );
};
