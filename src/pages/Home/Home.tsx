import { ProductList } from '../../components/ProductList';
import { Carousel } from '../../components/Carousel';
import { Categories } from '../../components/Categories';

import { useFetchAllBooks } from '../../hooks/useFetchAllBooks';
import { useMemo } from 'react';
import { shuffle } from '../../utils/shuffle';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Home = () => {
  const { data, loading, error } = useFetchAllBooks();

  const randomBooks = useMemo(() => {
    if (!data.length) {
      return [];
    }

    return shuffle(data).slice(0, 16);
  }, [data]);

  const newBooks = useMemo(
    () =>
      [...data]
        .sort((a, b) => b.publicationYear - a.publicationYear)
        .slice(0, 24),
    [data],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Carousel />
      <ProductList id="new" title="New books" books={newBooks} />
      <Categories />
      <ProductList
        id="recommended"
        title="You might like"
        books={randomBooks}
      />
    </>
  );
};
