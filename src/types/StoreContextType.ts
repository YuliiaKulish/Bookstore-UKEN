import type { CartItem } from './CartItem';
import type { GeneralBook } from './GeneralBook';

export type StoreContextType = {
  cart: CartItem[];
  favourites: GeneralBook[];
  addToCart: (book: GeneralBook) => void;
  addToFavourites: (book: GeneralBook) => void;
  removeFromCart: (id: number | string) => void;
  removeFromFavourites: (id: number | string) => void;
  increaseQuantity: (id: number | string) => void;
  decreaseQuantity: (id: number | string) => void;
  clearCart: () => void;
};
