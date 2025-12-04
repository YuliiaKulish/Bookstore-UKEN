/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import type { BookBase } from '../../types/BookBase';
import './SearchDropdown.scss';
import { normalizeCategory } from '../../utils/normalizeCategory';

interface SearchDropdownProps {
  books: BookBase[];
  onItemClick?: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  books,
  onItemClick,
}) => {
  return (
    <div className="search-dropdown">
      <div className="search-dropdown-wrapper">
        <p className="search-dropdown__title">Books</p>

        <ul className="search-dropdown__list">
          {books.map(book => (
            <li className="search-dropdown__item" key={book.id}>
              <Link
                to={`/${book.type}/${normalizeCategory(book.category[0])}/${book.slug}`}
                className="search-dropdown__link"
                onClick={onItemClick}
              >
                <img
                  className="search-dropdown__image"
                  src={
                    new URL(`/books/${book.images[0]}`, import.meta.url).href
                  }
                  alt={book.name}
                />
                <div>
                  <div className="search-dropdown__book-title">{book.name}</div>
                  <div className="search-dropdown__book-author">
                    {book.author}
                  </div>
                  <div className="search-dropdown__book-price">
                    {(book.priceDiscount ?? book.priceRegular) + ' $'}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
