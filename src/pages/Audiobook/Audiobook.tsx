import { Catalog } from '../../components/Catalog/Catalog';
import { useFetchBooks } from '../../hooks/useFetchBooks';

export const Audiobook = () => {
  const { data, loading, error } = useFetchBooks('audiobook');

  return (
    <Catalog
      error={error}
      isLoading={loading}
      catalogBooks={data}
      title="Audiobooks"
    />
  );
};
