import BookStoreIcon from '../../BookStoreIcon/BookStoreIcon';
import { IconName } from '../../BookStoreIcon/types';
import './SliderButton.scss';
import React from 'react';

export type SliderButtonProps = {
  iconName: IconName;
  disabled: boolean;
  onClick?: () => void;
};

export const SliderButton: React.FC<SliderButtonProps> = ({
  iconName,
  disabled,
  onClick,
}) => {
  return (
    <>
      <button className="slider-button" disabled={disabled} onClick={onClick}>
        <BookStoreIcon iconName={iconName} />
      </button>
    </>
  );
};
