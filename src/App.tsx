import { AppRouter } from './router/AppRouter';
import { StoreProvider } from './context/StoreProvider';

export const App = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
};
