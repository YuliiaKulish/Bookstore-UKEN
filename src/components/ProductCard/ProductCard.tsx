import './ProductCard.scss';
import { BookStoreIcon, IconName } from '../BookStoreIcon';
import { AddToCartButton, FavoriteButton } from '../Buttons';
import { useStore } from '../../hooks/useStore';
import { NavLink } from 'react-router-dom';
import type { GeneralBook } from '../../types/GeneralBook';
import { normalizeCategory } from '../../utils/normalizeCategory';

type ProductCardProps = {
  book: GeneralBook;
};

export const ProductCard = ({ book }: ProductCardProps) => {
  const { cart, favourites, addToFavourites, removeFromFavourites, addToCart } =
    useStore();

  const inCart = cart.some(item => item.book.id === book.id);
  const inFav = favourites.some(item => item.id === book.id);

  return (
    <div className="productCard">
      {'listeningLength' in book && (
        <div className="productCard__audioImg">
          <BookStoreIcon iconName={IconName.Headphones} />
        </div>
      )}

      <div className="productCard__imageWrapper">
        <NavLink
          to={`/${book.type}/${normalizeCategory(book.category[0])}/${book.slug}`}
        >
          <img
            src={new URL(`../../books/${book.images[0]}`, import.meta.url).href}
            alt={book.name}
            className="productCard__image"
          />
        </NavLink>
      </div>

      <div className="productCard__content">
        <NavLink
          to={`/${book.type}/${normalizeCategory(book.category[0])}/${book.slug}`}
          className="productCard__content-wrapper"
        >
          <h3 className="productCard__name">{book.name}</h3>
          <p className="productCard__author">{book.author}</p>
        </NavLink>

        <div className="productCard__prices">
          <span className="productCard__price">
            &#36;{book.priceDiscount || book.priceRegular}
          </span>
          {book.priceDiscount && (
            <span className="productCard__oldPrice">
              &#36;{book.priceRegular}
            </span>
          )}
        </div>

        <div className="productCard__stock">
          <BookStoreIcon iconName={IconName.Car} />
          <span className="productCard__stock-text">In stock</span>
        </div>

        <div className="productCard__actions">
          <AddToCartButton selected={inCart} onSelect={() => addToCart(book)} />
          <FavoriteButton
            selected={inFav}
            onSelect={() =>
              inFav ? removeFromFavourites(book.id) : addToFavourites(book)
            }
          />
        </div>
      </div>
    </div>
  );
};
