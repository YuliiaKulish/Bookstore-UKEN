import './PaginatorButton.scss';
import classNames from 'classnames';

import React from 'react';

export type PaginatorButtonProps = {
  label: string;
  onPageChange: () => void;
  isActive?: boolean;
};

export const PaginatorButton: React.FC<PaginatorButtonProps> = ({
  label,
  onPageChange,
  isActive,
}) => {
  return (
    <>
      <button
        className={classNames('paginator-button', { 'is-active': isActive })}
        onClick={() => {
          onPageChange();
        }}
      >
        {label}
      </button>
    </>
  );
};
