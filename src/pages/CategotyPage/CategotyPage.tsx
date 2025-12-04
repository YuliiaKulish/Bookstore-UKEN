import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { GeneralBook } from '../../types/GeneralBook';
import { useFetchBooks } from '../../hooks/useFetchBooks';
import { Catalog } from '../../components/Catalog/Catalog';

export const CategoryPage = () => {
  const {
    data: kindleData,
    loading: loadingKindle,
    error: errorKindle,
  } = useFetchBooks('kindle');
  const {
    data: audiobookData,
    loading: loadingAudiobook,
    error: errorAudiobook,
  } = useFetchBooks('audiobook');
  const {
    data: paperbackData,
    loading: loadingPaperback,
    error: errorPaperback,
  } = useFetchBooks('paperback');

  const allBooks = useMemo<GeneralBook[]>(
    () => [
      ...(kindleData ?? []),
      ...(audiobookData ?? []),
      ...(paperbackData ?? []),
    ],
    [kindleData, audiobookData, paperbackData],
  );

  const loading = loadingKindle || loadingAudiobook || loadingPaperback;
  const error = errorKindle || errorAudiobook || errorPaperback;

  const { category: categoryFromPath } = useParams<{ category: string }>();
  const category = categoryFromPath || 'all';

  const filteredBooks = useMemo(() => {
    if (category === 'all') {
      return allBooks.filter(book => book.lang === 'uk');
    }

    return allBooks
      .filter(book => {
        const firstCategory = book.category?.[0] ?? '';
        const normalizedCategory = firstCategory
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');

        return normalizedCategory === category;
      })
      .filter(book => book.lang === 'uk');
  }, [allBooks, category]);

  return (
    <Catalog
      error={error}
      isLoading={loading}
      catalogBooks={filteredBooks}
      title="Categories"
    />
  );
};
