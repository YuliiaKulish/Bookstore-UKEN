import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import type { StoreContextType } from '../types/StoreContextType';

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }

  return context;
};
