import React from 'react';
import { PaginatorButton, SliderButton } from '../Buttons';
import { IconName } from '../BookStoreIcon';
import './Paginator.scss';

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onPageButtonClick: (pageNumber: number) => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav: {
    current: number;
    total: number;
  };
};

const Paginator: React.FC<PaginationProps> = ({
  nav,
  disable,
  onNextPageClick,
  onPrevPageClick,
  onPageButtonClick,
}) => {
  const getCurrentPaginatorButtons = (): number[] => {
    if (nav.current - 2 >= 1) {
      return [nav.current - 2, nav.current - 1, nav.current, nav.current + 1];
    } else {
      return [1, 2, 3, 4];
    }
  };

  return (
    <div className="paginator">
      <span className="paginator__slider slider-left">
        <SliderButton
          iconName={IconName.ArrowLeft}
          onClick={onPrevPageClick}
          disabled={disable.left}
        />
      </span>
      {getCurrentPaginatorButtons().map(pageNumber => {
        if (pageNumber <= nav.total) {
          return (
            <span key={pageNumber} className="paginator__button">
              <PaginatorButton
                label={pageNumber.toString()}
                onPageChange={() => onPageButtonClick(pageNumber)}
                isActive={pageNumber === nav.current}
              />
            </span>
          );
        } else {
          return null;
        }
      })}
      <span className="paginator__slider slider-right">
        <SliderButton
          iconName={IconName.ArrowRight}
          onClick={onNextPageClick}
          disabled={disable.right}
        />
      </span>
    </div>
  );
};

export default React.memo(Paginator);
