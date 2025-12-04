/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import { Input } from '../Input';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { BookStoreIcon, IconName } from '../BookStoreIcon';
import { Dropdown } from '../Dropdown';
import { MobileMenu } from './MobileMenu';

import { SearchDropdown } from '../SearchDropdown';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../../hooks/useStore';
import { useClickOutside } from '../../hooks/useClickOutside';
import { categoryOptions } from '../../utils/options';
import type { GeneralBook } from '../../types/GeneralBook';

import logo from '../../assets/logo.svg';

interface HeaderProps {
  allBooks: GeneralBook[];
}

export const Header: React.FC<HeaderProps> = ({ allBooks }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    'Category',
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openInput, setOpenInput] = useState(false);
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

  const { cart, favourites } = useStore();
  const totalItemsCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();

  const getCategoryLabel = (val: string | number | null) => {
    if (!val) {
      return 'Category';
    }

    const found = categoryOptions.find(o => o.value === String(val));

    return found ? found.label : String(val);
  };

  const handleSelect = (value: string) => {
    searchParams.set('category', value.toLowerCase());
    setSearchParams(searchParams);
    navigate(`books/${value.toLowerCase()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDropdownItemClick = () => {
    setQuery('');
  };

  const handleChangeInputOpen = () => {
    if (openInput === false) {
      setOpenInput(true);
    } else {
      setOpenInput(false);
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.classList.remove('no-scroll');
    } else {
      setIsMobileMenuOpen(true);
      document.body.classList.add('no-scroll');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__left">
            <NavLink to="/" className="header__logo-link">
              <img
                src={logo}
                alt="Book Store Logo"
                className="header__logo-image"
              />
            </NavLink>

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <NavLink to="/" className="header__nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="/paper" className="header__nav-link">
                    Paper
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="/kindle" className="header__nav-link">
                    Kindle
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="/audiobook" className="header__nav-link">
                    AudioBook
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__search">
            <div className="header__input" ref={searchContainerRef}>
              <Input
                isOpen={openInput}
                value={query}
                onChange={handleChange}
                placeholder="Find a book or author"
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

            <div className="header__categories">
              <Dropdown
                variant="category"
                dropdownText={getCategoryLabel(selectedCategory)}
                options={categoryOptions}
                onSelect={val => {
                  setSelectedCategory(val.toString());
                  handleSelect(val.toString());
                }}
              />
            </div>
            <div className="header__icons">
              <div
                className="header__icon-wrapper search-icon"
                onClick={handleChangeInputOpen}
              >
                <BookStoreIcon iconName={IconName.Search} />
              </div>
              <NavLink
                to="/favourites"
                className="header__icon-wrapper header__quantity-wrapper favorite-icon"
              >
                {favourites.length !== 0 && (
                  <span className="header__quantity">{favourites.length}</span>
                )}
                <BookStoreIcon iconName={IconName.Heart} />
              </NavLink>
              <NavLink
                to="/cart"
                className="header__icon-wrapper header__quantity-wrapper cart-icon"
              >
                {totalItemsCart !== 0 && (
                  <span className="header__quantity">{totalItemsCart}</span>
                )}
                <BookStoreIcon iconName={IconName.Cart} />
              </NavLink>

              <div
                className="header__icon-wrapper menu-icon"
                onClick={toggleMobileMenu}
              >
                <BookStoreIcon iconName={IconName.Menu} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu onClose={toggleMobileMenu} allBooks={allBooks} />
      )}
    </>
  );
};
