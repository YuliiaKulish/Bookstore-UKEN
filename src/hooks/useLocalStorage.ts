import { useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        return parsed;
      } catch {
        localStorage.removeItem(key);
      }
    }

    return initial;
  });

  const setAndStore = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const updated =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(updated));

      return updated;
    });
  };

  return [value, setAndStore] as const;
}
