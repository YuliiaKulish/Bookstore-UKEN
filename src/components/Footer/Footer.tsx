import { Link } from 'react-router-dom';
import { BookStoreIcon, IconName } from '../BookStoreIcon';
import './Footer.scss';
import classNames from 'classnames';
import { useState } from 'react';

import logo from '../../assets/logo.svg';

export const Footer = () => {
  const scrollToTop = () => {
    if (window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isRightsOpen, setIsRightsOpen] = useState(false);

  const handleContacts = () => {
    setIsContactsOpen(prev => !prev);
  };

  const handleRights = () => {
    setIsRightsOpen(prev => !prev);
  };

  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link to="/" className="footer__logo-link">
          <img
            src={logo}
            alt="Book Store Logo"
            className="footer__logo-image"
          />
        </Link>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a
                href="https://github.com/U-K-E-N/book-store-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__nav-link"
              >
                GITHUB
              </a>
            </li>
            <li
              className={classNames('footer__nav-item', {
                'is-open': isContactsOpen,
              })}
              onClick={handleContacts}
            >
              <Link to="/" className="footer__nav-link">
                CONTACTS
              </Link>

              <span className="footer__nav-link-info">
                <a
                  href="tel:+380999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +38(099)-999-99-99
                </a>
                <a
                  href="mailto:uken@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  uken@gmail.com
                </a>
                <a
                  href="https://maps.app.goo.gl/qFNczgA56jkCP8L68"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ми тут
                </a>
              </span>
            </li>
            <li
              className={classNames('footer__nav-item', {
                'is-open': isRightsOpen,
              })}
              onClick={handleRights}
            >
              <Link to="/about" className="footer__nav-link">
                About us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__back-wrapper">
          <button type="button" className="footer__back" onClick={scrollToTop}>
            Back to top
            <div className="slider-button">
              <BookStoreIcon iconName={IconName.ArrowUp} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
