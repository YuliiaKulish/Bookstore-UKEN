import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { LanguageProvider } from './context/LanguageContext';

export const Root = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
