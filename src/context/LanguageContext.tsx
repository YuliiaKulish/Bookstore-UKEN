import { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

type Lang = 'en' | 'uk';

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  formatPrice: (price: number) => string;
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  formatPrice: () => '',
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Lang>('en');

  const exchangeRate = 43;

  const formatPrice = (price: number) => {
    if (lang === 'en') {
      return `$${price}`;
    }

    return `₴${Math.round(price * exchangeRate)}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const useTranslate = () => {
  const { lang } = useLanguage();

  return (key: keyof (typeof translations)['en']) => translations[lang][key];
};
