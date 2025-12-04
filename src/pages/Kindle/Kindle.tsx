import { Catalog } from '../../components/Catalog/Catalog';
import { useFetchBooks } from '../../hooks/useFetchBooks';

export const Kindle = () => {
  const { data, loading, error } = useFetchBooks('kindle');

  return (
    <Catalog
      error={error}
      isLoading={loading}
      catalogBooks={data}
      title="Kindle books"
    />
  );
};
