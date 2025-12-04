import { type ReactNode } from 'react';
import type { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { StoreContext } from './StoreContext';
import type { GeneralBook } from '../types/GeneralBook';

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [favourites, setFavourites] = useLocalStorage<GeneralBook[]>(
    'favourites',
    [],
  );

  const addToFavourites = (book: GeneralBook) => {
    setFavourites(prev => {
      if (!prev.some(item => item.id === book.id)) {
        return [...prev, book];
      }

      return prev;
    });
  };

  const removeFromFavourites = (id: string | number) => {
    setFavourites(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (book: GeneralBook) => {
    setCart(prev => {
      if (!prev.some(item => item.book.id === book.id)) {
        return [...prev, { book, quantity: 1 }];
      }

      return prev;
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart(prev => prev.filter(item => item.book.id !== id));
  };

  const increaseQuantity = (id: string | number) => {
    setCart(prev =>
      prev.map(item =>
        item.book.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string | number) => {
    setCart(prev =>
      prev.map(item =>
        item.book.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // мінімум 1
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    favourites,
    addToFavourites,
    removeFromFavourites,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
