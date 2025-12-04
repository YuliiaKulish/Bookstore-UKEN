import type React from 'react';
import type { BookStoreIconsProps } from './types';
import './BookStoreIcon.scss';

export const BookStoreIcon: React.FC<BookStoreIconsProps> = ({
  iconName,
  count,
  size = 16,
}) => {
  return (
    <>
      <div className="container-icon">
        <i style={{ fontSize: size }} className={iconName}></i>
        {count && <span className="badge">{count}</span>}
      </div>
    </>
  );
};

export default BookStoreIcon;
