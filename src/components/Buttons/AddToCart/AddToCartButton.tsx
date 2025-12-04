import classNames from 'classnames';
import './AddToCartButton.scss';

import React, { useState } from 'react';

export type AddToCartButtonProps = {
  selected: boolean;
  onSelect: () => void;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  selected,
  onSelect,
}) => {
  const [added, setAdded] = useState(selected);

  const handleClick = () => {
    setAdded(true);
    onSelect();
  };

  return (
    <>
      <button
        className={classNames('add-to-cart-button', { added: added })}
        onClick={handleClick}
        disabled={added}
      >
        {added ? 'Added' : 'Add to cart'}
      </button>
    </>
  );
};
