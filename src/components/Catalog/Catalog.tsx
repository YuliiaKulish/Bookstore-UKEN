/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useEffect, useMemo } from 'react';
import { Dropdown } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import './Catalog.scss';
import Paginator from '../Paginator/Paginator';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import type { GeneralBook } from '../../types/GeneralBook';
import { sortLabels, SortOption } from '../../types/catalog';
import { sortedCatalogBooks } from '../../utils/sortedCatalogBooks';

const DEFAULT_ITEM_COUNT = 16;
const DEFAULT_PAGE = 1;
const PAGE_PARAM_NAME = 'page';
const ITEM_COUNT_PARAM_NAME = 'count';
const SORT_PARAM_NAME = 'sort';

export type CatalogProps = {
  error: Error | null;
  isLoading: boolean;
  title: string;
  catalogBooks: GeneralBook[];
};

export const Catalog = ({
  error,
  isLoading,
  title,
  catalogBooks,
}: CatalogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Newest);
  const [itemsCount, setItemsCount] = useState(DEFAULT_ITEM_COUNT);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const sortedBooks = useMemo(
    () => sortedCatalogBooks(catalogBooks, sortBy),
    [catalogBooks, sortBy],
  );

  const totalPages = useMemo(
    () => Math.ceil(sortedBooks.length / itemsCount) || 1,
    [sortedBooks.length, itemsCount],
  );

  const visibleCatalogBooks = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const skip = (safePage - 1) * itemsCount;

    return sortedBooks.slice(skip, skip + itemsCount);
  }, [page, totalPages, itemsCount, sortedBooks]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleNextPageClick = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const handlePrevPageClick = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const handlePageButtonClick = useCallback(
    (pageNumber: number) => {
      const clamped = Math.max(1, Math.min(pageNumber, totalPages));

      setPage(clamped);
    },
    [totalPages],
  );

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    const currentSort = nextParams.get(SORT_PARAM_NAME);
    const currentCount = nextParams.get(ITEM_COUNT_PARAM_NAME);
    const currentPage = nextParams.get(PAGE_PARAM_NAME);

    const sortChanged = currentSort !== sortBy;
    const countChanged = currentCount !== itemsCount.toString();
    const pageChanged = currentPage !== page.toString();

    if (sortChanged) {
      nextParams.set(SORT_PARAM_NAME, sortBy);
    }

    if (countChanged) {
      nextParams.set(ITEM_COUNT_PARAM_NAME, itemsCount.toString());
    }

    if (pageChanged) {
      nextParams.set(PAGE_PARAM_NAME, page.toString());
    }

    if (sortChanged || countChanged || pageChanged) {
      setSearchParams(nextParams);
    }
  }, [itemsCount, page, setSearchParams, sortBy]);

  useEffect(() => {
    const pageParam = Number(searchParams.get(PAGE_PARAM_NAME));
    const sortParam = (searchParams.get(SORT_PARAM_NAME) as SortOption) ?? null;
    const countParam = Number(searchParams.get(ITEM_COUNT_PARAM_NAME));

    if (sortParam) {
      setSortBy(sortParam);
    }

    if (!isNaN(countParam) && countParam > 0) {
      setItemsCount(countParam);
    }

    if (!isNaN(pageParam) && pageParam > 0) {
      setPage(
        Math.min(
          pageParam,
          Math.ceil(sortedBooks.length / (countParam || itemsCount) || 1),
        ),
      );
    }
  }, []);

  const setBooksPerPage = (val: number) => {
    setItemsCount(val);
    setPage(1);
  };

  const setSorting = (option: SortOption) => {
    setSortBy(option);
    setPage(1);
  };

  if (isLoading) {
    return (
      <section>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <ErrorMessage />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h1 className="catalog__title">{title}</h1>
        <span className="catalog__subtitle">{catalogBooks.length} books</span>
        <div className="catalog__categories">
          <Dropdown
            label="Sort by"
            variant="sort"
            options={[
              { label: 'Newest', value: SortOption.Newest },
              { label: 'Cheaper', value: SortOption.Cheaper },
              { label: 'More expensive', value: SortOption.Expensive },
            ]}
            dropdownText={sortLabels[sortBy]}
            onSelect={val => setSorting(val as SortOption)}
          />

          <Dropdown
            label="Items on page"
            variant="number"
            options={[
              { label: '8', value: 8 },
              { label: '16', value: 16 },
              { label: '24', value: 24 },
              { label: '30', value: 30 },
            ]}
            dropdownText={itemsCount.toString()}
            onSelect={val => setBooksPerPage(val as number)}
          />
        </div>

        <ul className="catalog__list">
          {visibleCatalogBooks.map(book => (
            <li key={book.id} className="catalog__item">
              <ProductCard book={book} />
            </li>
          ))}
        </ul>

        <Paginator
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          onPageButtonClick={handlePageButtonClick}
          disable={{
            left: page === 1,
            right: page === totalPages,
          }}
          nav={{
            current: page,
            total: totalPages,
          }}
        />
      </div>
    </section>
  );
};
