import { createContext } from 'react';
import type { StoreContextType } from '../types/StoreContextType';

export const StoreContext = createContext<StoreContextType | null>(null);
