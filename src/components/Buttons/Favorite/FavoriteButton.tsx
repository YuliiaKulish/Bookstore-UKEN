import BookStoreIcon from '../../BookStoreIcon/BookStoreIcon';
import { IconName } from '../../BookStoreIcon/types';
import './FavoriteButton.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

export type FavoriteButtonProps = {
  selected: boolean;
  onSelect: () => void;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  selected,
  onSelect,
}) => {
  const [active, setActive] = useState(selected);

  const handleClick = () => {
    setActive(!active);
    onSelect();
  };

  return (
    <>
      <button
        className={classNames('favorite-button', { active: active })}
        onClick={handleClick}
      >
        <BookStoreIcon
          iconName={active ? IconName.HeartFilled : IconName.Heart}
        />
      </button>
    </>
  );
};
