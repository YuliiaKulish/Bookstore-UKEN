import { useEffect, type RefObject } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target || !ref.current) {
        return;
      }

      if (ref.current.contains(target)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
};
