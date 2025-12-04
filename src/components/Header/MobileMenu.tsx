import { NavLink } from 'react-router-dom';
import { BookStoreIcon, IconName } from '../BookStoreIcon';
import { Input } from '../Input';
import './MobileMenu.scss';
import React, { useRef, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SearchDropdown } from '../SearchDropdown';
import type { BookBase } from '../../types/BookBase';

import logo from '../../assets/logo.svg';

type MobileMenuProps = {
  onClose: () => void;
  allBooks: BookBase[];
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  onClose,
  allBooks,
}) => {
  const { cart, favourites } = useStore();
  const [query, setQuery] = useState('');
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredBooks = allBooks.filter(
    book =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author?.toLowerCase().includes(query.toLowerCase()),
  );

  const shouldShowDropdown = query.length > 2 && filteredBooks.length > 0;

  useClickOutside(searchContainerRef, () => {
    if (shouldShowDropdown) {
      setQuery('');
    }
  });

  const handleDropdownItemClick = () => {
    setQuery('');
    onClose();
  };

  const totalItemsCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__top">
        <div className="mobile-menu__logo">
          <NavLink to="/" className="mobile-menu__logo-link" onClick={onClose}>
            <img
              src={logo}
              alt="Book Store Logo"
              className="mobile-menu__logo-image"
            />
          </NavLink>
        </div>
        <div className="mobile-menu__close" onClick={onClose}>
          <BookStoreIcon iconName={IconName.Close} />
        </div>
      </div>

      <div className="mobile-menu__search" ref={searchContainerRef}>
        <Input
          placeholder="Find a book or author"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        {query.length > 0 && (
          <button
            className="header__input-clear"
            onClick={() => setQuery('')}
            aria-label="Clear input"
          >
            ×
          </button>
        )}

        {shouldShowDropdown && (
          <SearchDropdown
            books={filteredBooks}
            onItemClick={handleDropdownItemClick}
          />
        )}
      </div>

      <nav className="mobile-menu__nav">
        <ul className="mobile-menu__nav-list">
          <li className="mobile-menu__nav-item">
            <NavLink to="/" className="mobile-menu__nav-link" onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li className="mobile-menu__nav-item">
            <NavLink
              to="/paper"
              className="mobile-menu__nav-link"
              onClick={onClose}
            >
              Paper
            </NavLink>
          </li>
          <li className="mobile-menu__nav-item">
            <NavLink
              to="/kindle"
              className="mobile-menu__nav-link"
              onClick={onClose}
            >
              Kindle
            </NavLink>
          </li>
          <li className="mobile-menu__nav-item">
            <NavLink
              to="/audiobook"
              className="mobile-menu__nav-link"
              onClick={onClose}
            >
              AudioBook
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mobile-menu__icons">
        <NavLink
          to="/favourites"
          className="mobile-menu__icon-wrapper mobile-menu__quantity-wrapper"
          id="favorite-icon"
          onClick={onClose}
        >
          {favourites.length !== 0 && (
            <span className="mobile-menu__quantity">{favourites.length}</span>
          )}
          <BookStoreIcon iconName={IconName.Heart} />
        </NavLink>
        <NavLink
          to="/cart"
          className="mobile-menu__icon-wrapper mobile-menu__quantity-wrapper"
          id="cart-icon"
          onClick={onClose}
        >
          {totalItemsCart !== 0 && (
            <span className="mobile-menu__quantity">{totalItemsCart}</span>
          )}
          <BookStoreIcon
            iconName={IconName.Cart}
            // fontSize={32}
          />
        </NavLink>
      </div>
    </div>
  );
};
