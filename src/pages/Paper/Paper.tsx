import { Catalog } from '../../components/Catalog/Catalog';
import { useFetchBooks } from '../../hooks/useFetchBooks';

export const Paper = () => {
  const { data, loading, error } = useFetchBooks('paperback');

  return (
    <Catalog
      error={error}
      isLoading={loading}
      catalogBooks={data}
      title="Paper books"
    />
  );
};
