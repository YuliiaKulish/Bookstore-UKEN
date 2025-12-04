import { useEffect, useState } from 'react';
import type { GeneralBook } from '../types/GeneralBook';

import paperBooks from '../books/paperback.json';
import audioBooks from '../books/audiobook.json';
import kindleBooks from '../books/kindle.json';

type FileName = 'paperback' | 'audiobook' | 'kindle';

const booksMap = {
  paperback: paperBooks,
  audiobook: audioBooks,
  kindle: kindleBooks,
};

export function useFetchBooks(fileName: FileName) {
  const [data, setData] = useState<GeneralBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isActive = true;

    async function load() {
      try {
        setLoading(true);

        const json = booksMap[fileName];

        if (!json) {
          throw new Error(`No books found for ${fileName}`);
        }

        if (isActive) {
          setData(json);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      isActive = false;
    };
  }, [fileName]);

  return { data, loading, error };
}
