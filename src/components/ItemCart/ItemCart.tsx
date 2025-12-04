import classNames from 'classnames';
import { useStore } from '../../hooks/useStore';
import { BookStoreIcon, IconName } from '../BookStoreIcon';

import './ItemCart.scss';
import { NavLink } from 'react-router-dom';
import type { GeneralBook } from '../../types/GeneralBook';
import { normalizeCategory } from '../../utils/normalizeCategory';

type ItemCartProps = {
  book: GeneralBook;
  quantity: number;
};

export const ItemCart = ({ book, quantity }: ItemCartProps) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useStore();

  return (
    <div className="item-cart">
      <div className="item-cart__top">
        <button
          className="item-cart__btn item-cart__btn--delete"
          type="button"
          aria-label="Remove from cart"
          onClick={() => removeFromCart(book.id)}
        >
          <BookStoreIcon iconName={IconName.Close} />
        </button>

        <NavLink
          to={`/${book.type}/${normalizeCategory(book.category[0])}/${book.slug}`}
        >
          <img
            className="item-cart__img"
            alt={book.name}
            src={new URL(`../../books/${book.images[0]}`, import.meta.url).href}
          />
        </NavLink>
        <NavLink
          to={`/${book.type}/${normalizeCategory(book.category[0])}/${book.slug}`}
          className="item-cart__descr"
        >
          <h3 className="item-cart__name">{book.name}</h3>
          <p className="item-cart__author">{book.author}</p>
        </NavLink>
      </div>

      <div className="item-cart__bottom">
        <div>
          <button
            className={classNames('item-cart__btn item-cart__btn--minus', {
              disabled: quantity === 1,
            })}
            type="button"
            aria-label="Remove one item"
            disabled={quantity === 1}
            onClick={() => decreaseQuantity(book.id)}
          >
            <BookStoreIcon iconName={IconName.Minus} />
          </button>
          <span className="item-cart__amount">{quantity}</span>
          <button
            className="item-cart__btn item-cart__btn--plus"
            type="button"
            aria-label="Add one item"
            onClick={() => increaseQuantity(book.id)}
          >
            <BookStoreIcon iconName={IconName.Plus} />
          </button>
        </div>
        <span className="item-cart__price">
          &#36;{book.priceDiscount || book.priceRegular}
        </span>
      </div>
    </div>
  );
};
