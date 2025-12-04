import { useEffect, useState } from 'react';
import audioData from '../books/audiobook.json';
import kindleData from '../books/kindle.json';
import paperData from '../books/paperback.json';
import { GeneralBook } from '../types/GeneralBook';

export function useFetchAllBooks() {
  const [data, setData] = useState<GeneralBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setData([...audioData, ...kindleData, ...paperData]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}
